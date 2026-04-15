---
title: "LUKS"
date: 2026-04-15T14:28:45+02:00
author: "Joris"
draft: false
tags: ["linux", "tutorial", "security"] 
---

LUKS, _Linux Unified Key Setup_, is a way to encrypt partitions on Linux. It's a good way to store sensitive data on a flash drive or on your main system. Usage is super simple. You issue a command to unlock it and it will prompt you for your passphrase. After entering the right one, you can mount the partition and use it as normal. When you're done with it, you umount the partition and lock it with another command. Without the right passphrase the data on the partition is just noise.

## Setup
{{< warning >}}
THIS IS A DESTRUCTIVE ACT! IT WILL ERASE EVERYTHING ON THE PARTITION!
{{< /warning >}}

Find the partition you want to encrypt with `lsblk` then format it as LUKS. 

```bash
sudo cryptsetup luksFormat /dev/sdXN
```

Where `X` is the drive letter and `N` the partition number. You'll be prompted to type `YES` in all capitals to confirm you're ok with your data being overwritten. Then you'll set a passphrase and confirm it. Next, unlock the LUKS partition.


```bash
sudo cryptsetup luksOpen /dev/sdXN vault
```

I am naming mine `vault` here, but you can use whatever you like. Just be sure to use the same name in all other commands. Now you get to pick which filesystem you want to use on the drive. LUKS doesn't care what you pick, it supports pretty much all of them. In this post I'll use _ext4_.

```bash
sudo mkfs.ext4 /dev/mapper/vault
```

That's basically it. You've set up the partition as a LUKS partition. The partition is now unlocked and has a filesystem on it.

## Mounting
{{< note >}}
This post assumes you're following along from start to finish, which means at this point your partition is unlocked. Remember that if you're not, you'll need to have unlocked the partition before you can mount it. Unlocking is covered further down.
{{< /note >}}

Now would be a good time to store your `super-secret-document.md` on the partition. In order to do so, you'll need to mount it. First create the mount point. You'll only need to do this once.

```bash
sudo mkdir /mnt/vault
```

You can use any name and location, I'll just use `vault` again and have it in `/mnt/`. And now mount the unlocked partition. 

```bash
sudo mount /dev/mapper/vault /mnt/vault
```

You can now use the partition like you'd use any other. 

## Unmounting
So after storing that `super-secret-document.md`, you're done with the partition. We're going to lock it, but before we can, we need to unmount it.

```bash
sudo umount /mnt/vault
```

## Locking
And now in order to lock the partition, you issue the following:

```bash
sudo cryptsetup luksClose vault
```

The partition is now locked. 

## Unlocking
In order to unlock it, you'll need to issue a command we already covered in the setup. But from here on in, this is how you open the partition.

```bash
sudo cryptsetup luksOpen /dev/sdXN vault
```
Obviously, to use it you'll need to mount it. See the mounting section.

## Workflow
So the workflow for using your new LUKS partition is going to be:

1. Unlock the partition
2. Mount the partition
3. Do your work in the partition
4. Unmount the partition
5. Lock the partition

