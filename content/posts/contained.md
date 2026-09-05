---
title: "Contained"
date: 2026-09-05T21:20:27+02:00
author: "Joris"
draft: false
tags: ["homelab", "proxmox", "tutorial"] 
---

On my homelab I had an LXC named "debian". It was a generic Debian install which served a multitude of uses, most of which I forgot over time. I was going through all my LXCs due to my [previous adventure](/posts/resolved/), where I set up a domain name with an SSL certificate for the services on my homelab. I got to this one and wondered what the heck this was for. Turns out a Kali build environment, several defunct scripts, and hosting two different long abandoned personal projects. Lord knows what else this box was subjected to in the past. 

Anyway, I decided it was rather pointless as is, so I nuked the thing. It got me thinking, though: If I need to have a place to run ephemeral projects, perhaps I should set up something lasting and well-documented. I don't want to have to (again) dive into log files, bash history, or whatever breadcrumbs I might have left behind to figure out what I used this place for.

If I have an LXC running Docker and Portainer, I could spin up a new Docker container whenever I need somewhere to play, name it properly, and I'd have a single location and a clear list of what is running and why. 

## Docker LXC

Installing a Docker LXC is quite trivial with a Proxmox Helper Script[^1]. The install is just copy-and-pasting a command and following the prompts. The script also sets up required _features_—specifically `nesting=1` and `keyctl=1`, without which Docker won't work inside an LXC at all. It even offers an install command for Portainer at the end, which should be run *inside* the Docker LXC, not in the Proxmox root shell.

{{< warning >}}
Obligatory warning to not blindly copy and paste commands from the internet. 
{{< /warning >}}

I gave my new LXC a subdomain on my server's domain—let's call it `docker.my-domain.com`—and pointed it to Portainer's port number. This will matter in a bit.

I now had a running instance of Docker with Portainer. To make my life easier, I should set up a system for sharing files between any Docker container I create and my MacBook. Why not a container running Samba?

## Samba

In Portainer click **Stacks** → **Add stack**. Give it a name—I went with *storage* and used the following compose file.

```
services:
  samba:
    image: dperson/samba
    environment:
      - SAMBA_PASS=${PASS}
    command: >
      -u "joris;${PASS};1000"
      -s "docker-storage;/storage;yes;no;no;joris;;joris"
      -g "unix extensions = no"
      -g "force user = joris"
      -g "force group = joris"
    volumes:
      - /opt/docker-storage:/storage
    ports:
      - "139:139"
      - "445:445"
    restart: unless-stopped
```

My username is `joris` across all my devices, but crucially I use ID 1000 everywhere. This means my Mac user is the same as my Proxmox user and the user for this container, which in turn allows for me editing everything everywhere without running into permission problems.

Next I set up the environment variable for `PASS`, which is the password I'll use to connect to the Samba share.

I turned _Access control_ off because I won't need it. I am the only person using this homelab. Then finally **Deploy the stack**. 

## Confusion

While it spins up, let's discuss an issue I ran into first. While trying to connect to the shared storage from my Mac, I tried to connect to the domain I set up for Docker. It would not connect. It took me embarrassingly long to figure out what I had done wrong. 

The `docker.my-domain.com` address doesn't point directly at the Docker LXC. It points at Nginx Proxy Manager. NPM then looks at that same hostname a second time and decides where to actually send the request: an IP and a port, set in NPM. For my Docker container that's Portainer's port—see, I told you it'd matter later on! Samba runs on a different port entirely. One NPM was never told about, and can't route to.

If that was confusing—it was for me too. 

The solution is skipping NPM, setting a domain for samba and not using `docker.my-domain.com`. I made `storage.my-domain.com` in my Pi-Hole interface and instead of linking it to NPM's IP, I routed it directly to the IP of the Docker LXC. This means there's no port set. Connecting to the storage from the Mac can be done by opening Finder, pressing **Command** + **K** and entering `smb://storage.my-domain.com`.

## Conclusion

It took me a while, but I can now access the share I made from my laptop... All of that just to prepare for file transfer I *might* use in the future. This felt wrong, so I set up a small container with Busybox running an HTTP server to host my personal start page. I had a stupid grin on my face while I put the `index.html` there through Finder. Did I need to do that and couldn't the html just live locally on my system and work fine? Shut up.

[^1]: [Docker helper script](https://community-scripts.org/scripts/docker)


