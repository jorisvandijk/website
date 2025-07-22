---
title: "Using external drive as data directory in a Proxmox LXC"
date: 2025-07-19T10:55:57+02:00
author: "Joris"
draft: false
tags: ["server", "tutorial"]
cover:
  image: "/img/camera.png"
  alt: "Security camera"
---

I have a _homelab_, or more simply a personal server I run at home. It's a small square black box that sits in my office, humming away. This server runs [Proxmox VE](https://www.proxmox.com/en/products/proxmox-virtual-environment/overview), a _hypervisor_. This controls pretty much everything that goes on, on this server. It has the ability to spin up containers, which it calls _LXC_'s. These are somewhat akin to _Docker containers_. Anyway, the process of spinning one of these up is super simple. Click a few buttons, allocate some space and there's your 'container'.

While this is a super simple process, there's an even simpler process. Enter [Proxmox VE Helper-Scripts](https://community-scripts.github.io/ProxmoxVE/). This is a repository filled with installation scripts which offer a _one-liner_ that can be run in Proxmox's terminal, which pulls in a _Bash_ script and executes it. This script will then proceed to not just create an LXC container, but also installs the program you wanted to run on this LXC. Most scripts can be run either automatically, or will offer you choices on how to set up the container and program. It's like magic.

Anyway, [one](https://community-scripts.github.io/ProxmoxVE/scripts?id=frigate) of these scripts will install [Frigate](https://frigate.video/), which is a bit of software to monitor security cameras - a so-called _NVR_. When I bought my house it came with security cameras and a very clunky dedicated physical NVR, which was plonked into a wall-mounted server rack in the garage. The software to view the cameras with and check recordings was god-aweful, so I decided on swapping it out in favor of Frigate on my server.

Using the script, installation was a breeze, until I hit a snag. I install LXC containers on a dedicated SSD for fast load times. It is meant for running programs and not storing data, like the data a security camera might generate - video, they call it. By default, Frigate will store all camera feeds (and other data, like snapshots of detections and short clips) on the same drive as it is installed on. "No problem", I thought, "I'll just go into the Frigate UI and switch the storage location to a dedicated drive I have already installed on my server." 

Nope. No can do. It is not possible to add another drive to Frigate, which is outside of the LXC from within the UI. Shit. 

This meant having to frantically search online for a solution, which I've found. The following are the steps required to set it up.

1. Note the ID of your container on the Proxmox dashboard.
2. Open your console on the Proxmox web interface **on the host**.
3. Stop the Frigate LXC. 

```bash
pct stop <container_id> 
```
**Again, the container ID can be found on the Proxmox dashboard.**

4. Edit the config file.

```bash
nano /etc/pve/lxc/<container_id>.conf
```

5. Add the following. 

```bash
mp0: /<location>/<of>/<mount>,mp=/media/frigate
```
**Note that the path /media/frigate is mandatory for Frigate to use the external drive!** This is because it's the hard-coded location Frigate uses to store its content to. The _mp0_ stands for _Mount Point 0_, this can be any number, but let's start at the top. 

6. Set the permissions for the drive. 

```bash
chown -R 1000:1000 /<location>/<of>/<mount> &&
chmod -R 775 /<location>/<of>/<mount>
```

7. Restart the container.

```bash
pct start <container_id>
```

And that's it. Without needing to adjust anything else in the UI, Frigate will now store all content on the dedicated external drive. 
 
📷 _Original cover photo by [Samuel Pais](https://unsplash.com/photos/black-and-white-outdoor-lamp-wC4keTn26dY) on [Unsplash](https://unsplash.com)._
