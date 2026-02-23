---
title: "Upgrading Proxmox VE from 8 to 9"
date: 2026-02-23T12:04:12+01:00
author: "Joris"
draft: false
tags: ["proxmox","server"] 
---

It's about that time. There's a [new]([Proxmox Virtual Environment 9.0 with Debian 13 released](https://www.proxmox.com/en/about/company-details/press-releases/proxmox-virtual-environment-9-0) version of Proxmox VE in town and it has had a couple of months to "stabilize". Now is the time to bump up the version of that homelab. 

I've pulled the trigger and did the upgrade. The following is _my_ experience with doing this update. I've run into some issues, which all got solved and I didn't break my server.

## Prerequisites

- You must be on **PVE 8.4.1 or newer** before upgrading. Check with:
  
  ```bash
  pveversion
  ```

- Make sure all your VMs and containers have **verified backups** in PBS before starting. It'd suck to lose those...

## Step 1: Run the Pre-flight Checker

Proxmox provides an official checker script that identifies issues before you touch anything:

```bash
pve8to9 --full
```

Run this, fix every **FAIL**, then run it again. Don't proceed until you have 0 failures. Warnings are acceptable but worth addressing. 

## Step 2: Fix Issues

I cannot go through all possible issues you might encounter, like I stated above: this is my experience of the process. I'll address the issues I ran into.

### FAIL: systemd-boot meta-package installed

The [wiki](https://pve.proxmox.com/wiki/Upgrade_from_8_to_9#sd-boot-warning) has the solution to this: I first checked whether I'm actually using systemd-boot or if it's just an orphaned package:

```bash
bootctl status
```

The output said `systemd-boot not installed in ESP` and shows GRUB in the EFI variables, so it's safe to remove:

```bash
apt remove systemd-boot
```

### FAIL: Resolved node IP not configured

The checker resolves your hostname and checks whether that IP is active on an interface. I remember messing around with my network and the IP addresses of devices on it, trying to have a standard. I may have forgotten to update the IP here, so I first checked my actual IP:

```bash
ip addr show
```

Then I opened `/etc/hosts` directly in a text editor:

```bash
nano /etc/hosts
```

I found the line with my node's hostname and updated the IP to match what `ip addr show` had reported. I saved with `Ctrl+O` and exited with `Ctrl+X`. 

### WARN: Less than 5 GB free on root

This is a weird one. My drive is absolutely large enough and I have not used all space on it with my Proxmox system. Let's start with a cleanup:

```bash
apt clean
journalctl --vacuum-size=500M
```

That wasn't enough, so I looked for what was eating space:

```bash
du -xsh /* 2>/dev/null | sort -rh | head -20
```

(The `-x` flag is important as it keeps the scan on the root filesystem only and won't cross into other mounts).

This pointed me to `/cctv`, which turned out to be the issue. Frigate had been writing footage there, but the dedicated CCTV SSD wasn't actually mounted. Somehow the mount had gotten lost. Instead of writing to the SSD, everything had been going straight to the root NVMe. I verified this with:

```bash
findmnt
lsblk
```

I remounted the SSD and added it back to `/etc/fstab` to make it persistent:

```bash
mount /dev/sdXY /cctv
echo "UUID=xxxx  /cctv  ext4  defaults  0  2" >> /etc/fstab
```

After that I cleared out the footage that had accumulated on root, which freed up lots of space to continue the upgrade. How did I miss this? Good question. Turns out I am not a professional IT administrator.

### NOTICE: LVM autoactivation

LVM autoactivation means that logical volumes (the virtual disks your VMs and containers use) are automatically made available by the system at boot. In PVE 8 this was the default behaviour, but it can cause problems on shared storage setups where multiple nodes might try to activate the same volume simultaneously. PVE 9 disables autoactivation for all newly created volumes and lets Proxmox handle activation itself when a guest actually needs it. The migration script takes care of bringing the existing volumes in line with this new behaviour.

As noted in the [Proxmox upgrade documentation](https://pve.proxmox.com/wiki/Upgrade_from_8_to_9#LVM/LVM-thin_storage_has_guest_volumes_with_autoactivation_enabled), running the script is optional if your volumes are on local storage only, but still recommended. I ran it anyway:

```bash
/usr/share/pve-manager/migrations/pve-lvm-disable-autoactivation
```

I confirmed with `y` when prompted.

## Step 3: Stop All Guests

Stopping all guests before upgrading reduces the risk of filesystem or database corruption mid-upgrade.

```bash
pct stop 101
pct stop 102
# ... etc 
qm stop 100
# ... etc
```

Verify everything is stopped:

```bash
pct list
qm list
```

## Step 4: Update Repositories and Upgrade

I then replaced `bookworm` with `trixie` in apt sources:

```bash
sed -i 's/bookworm/trixie/g' /etc/apt/sources.list
sed -i 's/bookworm/trixie/g' /etc/apt/sources.list.d/*.list
```

Next I updated and verified the new repos resolve without errors:

```bash
apt update
```

You should see Debian trixie, trixie-security, trixie-updates, and Proxmox trixie all resolving cleanly. Then I ran the upgrade:

```bash
apt dist-upgrade
```

## Step 5: Answer Config File Prompts

You'll be asked about several config files during the upgrade. Here's what I answered for each:

| File                           | Answer           | Reason                                |
| ------------------------------ | ---------------- | ------------------------------------- |
| `/etc/issue`                   | **N**            | Keep your current version             |
| `/etc/lvm/lvm.conf`            | **Y**            | Take the maintainer's updated version |
| `/etc/ssh/sshd_config`         | **Y**            | If unmodified                         |
| `/etc/default/grub`            | **N**            | Keep your current version             |
| `/etc/chrony/chrony.conf`      | **Y**            | Take the maintainer's updated version |
| Keyboard layout                | Pick your layout | Physical keyboard preference          |
| Restart services automatically | **Yes**          | Guests are stopped anyway             |

{{< info >}}
For any config file you've customised heavily, use **D** to diff the versions before deciding.{{< /info >}}

## Step 6: Reboot

```bash
reboot
```

After rebooting, verify the upgrade succeeded:

```bash
pveversion
```

You should see `pve-manager/9.x.x/...`.

---

## Step 7: Start Guests Back Up

```bash
pct start 101
pct start 102
# ... etc
qm start 100
# ... etc
```

Check the web UI to confirm everything looks right.

## Post-Upgrade Cleanup

- Remove any packages you no longer use. I noticed I still had Zabbix on there I was no longer using.
  
  ```bash
  apt purge zabbix-agent2
  apt autoremove
  ```

- Verify all your mounts are correct with `findmnt`

- Check that all storages show as active in the Proxmox web UI under Datacenter → Storage

- Confirm backup jobs are still configured under Datacenter → Backup

- Restart any long-running jobs that were interrupted (e.g. media library scans)

## Conclusion

And that was it. Pretty painless to be honest. Unfortunately I decided to use the second NVMe slot I wasn't using to set up a ZFS pool with the NVMe that was running Proxmox. That way when one fails, I won't lose my Proxmox setup and had some redundancy. Alas it's impossible to switch an LVM to a ZFS pool on a running Proxmox instance. You'll have to do a fresh install... which I did a day after doing this upgrade. At least I can say I've had the experience, I suppose.


