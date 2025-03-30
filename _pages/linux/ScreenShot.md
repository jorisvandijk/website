---
layout: default
title: Screenshot
has_children: false
parent: Linux
---

# ScreenShot 
So I have been using `scrot` to take screenshots for ages. The only downside has been the inability to grab just a portion of the screen. There are newer applications that do this out of the box. Applications like `Flameshot`. The downside of that application is that it pulls the entire Qt5-base and several other Qt applications down with it. I do not use any Qt applications, so having to pull down all of those just to take a partial screenshot is insane to me.

So I have been taking full screen screenshots and cropping them in `Gimp` for ages now. Recently though I came across a Reddit post with an amazingly simple solution to my problem. It uses `xclip`'s selection flag with `scrot` to get this functionality, which I find brilliant. I have adapted this into a bash script, which can be used with any window manager.

```bash 
#!/usr/bin/env bash

#	ScreenShot 2.0
#	Take a screenshot, save to directory and copy to clipboard.
#	Dependencies: scrot, xclip
#
#	By Joris van Dijk | Jorisvandijk.com 
#	Licensed under the GNU General Public License v3.0	

if [[ $1 == "s" ]]; then
	scrot ~/Pictures/%d-%m-%Y-%T.png -e 'xclip -selection c -t image/png < $f'
elif [[ $1 == "p" ]]; then
	scrot ~/Pictures/%d-%m-%Y-%T.png -s -e 'xclip -selection c -t image/png < $f'
else
	echo "Wrong flag!"
fi
```

This script will save the screenshot to your `~/Pictures` directory. If you do not have this directory, you will have to create it before running the script!

Save the script as `ScreenShot`, make it executable and use it like so:

Take a fullscreen screenshot:
```bash
./ScreenShot s
```

Take a partial screenshot:
```bash
./ScreenShot p
```

Obviously it's best to use this script in a key binding. To see how I use it, check out my [dotfiles](https://joris.codes/#dotfiles). 
