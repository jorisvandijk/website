---
layout: default
title: WireGuard on Proxmox
has_children: false
parent: Server
last_modified_date: 2025-03-30
---

# Wireguard

## Setting up on Proxmox
Use [helper](https://community-scripts.github.io/ProxmoxVE/scripts?id=wireguard) script to set up the box.

## Ports
Default port used: `51820`, but can be set in the UI

## IP
Get the IP for the container in the router's settings
router url: 192.168.1.1 (For my Proxmox router)

My Wireguard IP: 192.168.1.53

## Open port on router
1. Go to Port Mapping under _Access Control_
2. set:
	- Service: None
	- Protocol: UDP
	- External Port Start: 51820
	- External Port End: 51821
	- Internat host: 192.168.1.53 (IP of the Wireguard LXC)
	- Remote host: empty/any
	- Description: Wireguard
3. Press OK

## Wireguard connection (App)
In the Wireguard app go to the settings of the Wireguard connection and change the `Endpoint` to your public IP:port

Set the allowed IP addresses so connections over wifi work as well: `AllowedIPs = 0.0.0.0/0, ::/0`

### Getting IP
Go to [icanhazip](https://icanhazip.com/) or `curl https://icanhazip.com/`

This will yield your public IP. You can check if it is static by running `traceroute <PublicIP>`

Set Endpoint to: xxx.xxx.xxx.xxx:51820

## Wireguard Arch Linux

### Instal
`sudo pacman -S wireguard-tools`

### Get config
Create a new peer on wireguards UI. Name it and save. Then download the .conf file. We need to edit this file by replacing the endpoint with the public ip Endpoint = xxx.xxx.xxx.xxx:51820

### Install config
`nmcli connection import type wireguard file "/home/joris/downloads/Thinkpad_wg0.conf"`

It should state importing went successful.

### Renaming and always on
Open nm-connection-editor and rename the connection to something useful "Home" perhaps. Then click "Connect automatically with priority" under General and save.

```
[Interface]
PrivateKey = <redacted>
Address = 10.0.0.3/32
MTU = 1420
DNS = 1.1.1.1

[Peer]
PublicKey = <redacted>
AllowedIPs = 192.168.1.0/24, 10.0.0.1/32
Endpoint = xxx.xxx.xxx.xxx:51820
PersistentKeepalive = 21
```
