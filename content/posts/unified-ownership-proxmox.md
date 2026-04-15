---
title: "Unified Ownership Proxmox Part 1: The Problem"
date: 2026-04-13T02:52:47+02:00
author: "Joris"
draft: true
tags: ["proxmox", "tutorial"] 
---

This series was gonna be called _Unified File Ownership Across Proxmox LXC Containers_, but that's far too long.

## Caveats
This is going to be a series. I am planning on four, maybe five installments of this. Before we dive in, a heads up: **There will be mistakes in here**. I will have misremembered or written it down not exactly right. I may have done things that people who actually _know_ about this subject would frown upon. While I am tagging this as a _tutorial_, please don't blindly copy commands. Think. Read through it and think. Actually, if you do go through this and hit a snag, please feel free to open an issue on whichever git provider I use and you prefer. I'd love to tackle any of the (no doubt many) issues I have missed. This has been a process and it has taken many hours to get to where I am now. Hopefully it's gonna work out for me, and by extension... you.

## The problem
It started as an issue I kept having with Jellyfin. "Playback error". As I came to find out over the course of many weeks, that mostly means there's a permission issue (unless there isn't and something is super messed up, but usually a permission issue). See, all my media is on my Proxmox server on a drive shared between multiple _LXCs_. This makes life for me easy, as all my junk is in one chest. The problem is that every _LXC_ that has to access that chest has the same key, which allows them to open the chest. Once in they can rearrange and relabel everyone else's stuff all they like, until nobody can find their stuff anymore. 

In the end, things get lost for some, things get moved or mislabeled for others. Shit stops working.

I have one set of _ZFS_ shared drives totalling several terabytes of _raidz1_ storage. This means out of the (currently) three drives, one can fail, and I won't lose any data. This is redundancy, safety, peace of mind. My shit is safe. But these drives are expensive enterprise grade drives. I cannot possibly have a set of these for each service that stores data for me. No. This is going to have to be the home for my photos, my files, my music, series, games and yes, my movies. This is the home for all I digitally own and care about. So this means sharing across multiple _LXCs_, each with a different purpose. The chest I spoke of earlier.

So far I have just set up a mount point in each of the _LXCs_ and pointed it to this drive. I called it `data` and it lives as a mount on my Proxmox host's root. This caused chaos. I need a better solution.

## Getting started on a solution
I have fixed permissions issues with many ideas. The most sweeping being a `chown -R 100000:100000 data` followed by a swift `chmod -R 777 data`. While this solves the issue, it's not a proper solution. Heck, it's a hack. I should be ashamed.

My username, surprisingly, is `joris`. Whenever I edit anything on my own system, it's as me. Come to think of it, it's even true on the server. Why not make all the _LXCs_ act as if they were me? 

This, it turns out, is not as simple as it sounds. `joris` in an _LXC_ isn't `joris` on my laptop. Let me explain.

You're a number, not a name. Linux assigns you numbers. The name you decide on is just flair. Proxmox containers take that number and do unspeakable things to it. Well, mainly add large numbers to it because (security) reasons. Basically, if you set `joris` (UID 1000 -  the default for the first real user on any Linux system) inside a container, it'll be 101000 on a host. Not even close to the same! The solution is `lxc.idmap`, which I'll explain in a later post.


