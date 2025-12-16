---
title: "Wireguard on My Server"
date: 2025-12-04T20:14:11+01:00
author: "Joris"
draft: true
tags: ["proxmox","tutorial"] 
---

I use WireGuard to access my server at home from my phone, or from my laptop. This way I'll never go without my important files, music or movies. I've set it up in a way that works for me and while my way of setting it up may not be the best, easiest or ultimate way, I can watch the Barbie movie in the airport waiting for my plane.

# Assumptions
Considering I am going to go through this for my system, I'll be making several assumptions you may want to take into account, namely:
1. You have Proxmox VE 8.x or newer installed.
2. You have know your network, mine uses:
	- Main LAN: 192.168.1.0/24 with router at 192.168.1.1.
    - Proxmox host: 192.168.1.5.
    - Container subnet: 10.10.10.0/24 with gateway 10.10.10.1.
    - Pi-hole is running at 10.10.10.2 for DNS and adblocking (This is an LXC container on my Proxmox server).

# Installing The WireGuard LXC
We're going to be installing WireGuard using a _Helper Script_, which can be found [here](https://community-scripts.github.io/ProxmoxVE/scripts?id=wireguard). We need the install command under **How to installl**. Currently that's `bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/ct/wireguard.sh)"`.

{{< warning >}}
Using these _Helper Scrips_ means running scripts from the internet on your server with root access. Be sure you trust the site, script and/or author.
{{< /warning >}}

To install you open your Proxmox VE web UI in your browser and in the left menu click on **Datacenter** > **Node** (This may be named differently for you, mine's named _pve_. It's the first option below _Datacenter_.) Then in the secondary (middle) menu, click on **Shell**. You'll be greeted by the terminal interface of your Proxmox server. Here we'll paste the install command and press enter.

You'll now get a Terminal User Interface (TUI). Here we will select the option **Advanced Install**. Next we're going to go through several steps. Of these the following are important to us:

1. Container type should be **Unprivileged**.
2. Set the root password to whatever you like. Do remember it though!
3. Container ID can be what you like as well. I'll go with the default here.
4. The hostname we'll leave default as _wireguard_ as well.
5. Disk size default.
6. Number of cores default.
7. Ram default.
8. The network bridge will probably just be a single option for you. I have two, I need to select the one for the 10.10.10.x subnet.
9. IPv4 needs to be static.
10. The IP address I am setting as 10.10.10.118/24, as this is container 118. Just easy to remember. You'll need to set what fits your network.
11. Enter your gateway IP address, mine's 10.10.10.2.
12. IPv6 can be left on auto.
13. Now enter through all the other prompts. These settings do not matter. Keep going until you need to click **Confirm**.
14. The installer has one more question for ya, namely selecting the storage location. This  will most likely be local-lvm (lvmthin). Now click through and the install starts.

The install will take a while. In a previous post I suggested a pee break or a drink refill. This time, why not give your mom a call for no reason. She'd like that.

Now the install script will ask if you wish to add _WGDashboard_. You do! Press **y** followed by **enter**. WGDashboard will provide you with a nice web UI where you can easilly change settings and add, edit or remove peers. 

![Wireguard install done](/img/wireguard.png)

After the installer ends it'll provide you with an IP address and port, which is for the WGDashboard. The default credentials are user `admin` and password `admin`. The UI will make you create a new account and just follow all the steps.

# Set up a DuckDNS Account
If you don't have a static IP address at home (most people do not), then we'll need to set up DuckDNS. This will provide a free dynamic DNS hostname so your phone or laptop can reach your home network even when your public IP changes. You can set this up on your router, but unfortunately mine does not support token based dynamic DNS, so I am going to set it up in the WireGuard container. Let's create an account.

1. Go to https://www.duckdns.org from your home IP address.
2. Sign in with GitHub (or another option if you prefer).
3. Once logged in, you'll see your token at the top of the page - **copy and save this!**
4. In the "sub domain" field, enter the name you want to use. You can pick whatever you like.
5. Click **add domain**.
6. Your hostname will be: `whatever-you-picked`.duckdns.org.

You've set up a DuckDNS account. Let's move on.

# 
