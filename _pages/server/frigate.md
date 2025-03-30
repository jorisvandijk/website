---
layout: default
title: Frigate on Proxmox
has_children: false
parent: Server
last_modified_date: 2025-03-30
---

# Frigate on Proxmox

1. Install with [helper script](https://community-scripts.github.io/ProxmoxVE/scripts?id=frigate), using default settings.
2. Open console on the Proxmox web interface on the host.
3. Stop the Friate LXC `pct stop <container_id>`.
4. Edit the config file `nano /etc/pve/lxc/<container_id>.conf`.
5. Add `mp0: /<location>/<of>/<mount>,mp=/media/frigate`. Note that the path /media/frigate is mandatory for Frigate to use the external drive.
6. Set the permissions for the drive `chown -R 1000:1000 /mnt/storage/frigate` and `chmod -R 775 /mnt/storage/frigate`.
7. Start the container again `pct start <container_id>`.
 
