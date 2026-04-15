---
title: "Format on MacOS"
date: 2026-04-12T14:04:50+02:00
author: "Joris"
draft: false
tags: ["macos", "terminal", "quickie" ] 
---

I'm used to formatting disks on Linux with GParted, but unfortunately there's no version for MacOS. They offer some sort of bootable image, but that sounded like a hassle. Luckily it turns out MacOS has a built-in tool. Usage is simple. I wanted to format a drive to ExFat, and all it takes is:

```bash
diskutil list
```

To list the drives on your system and find the name of the one you want to format. Then:

```bash
diskutil eraseDisk ExFAT DRIVENAME diskX
```

Where `ExFAT` is one of the possible formats, `DRIVENAME` is the name you want to give to the drive, say "MyThumbDrive". The X in `diskX` needs to be the number of the drive to be formatted. That's it.

 *Be aware this will nuke your entire drive! All data on it will be lost.*

