---
layout: default
title: Global playback control
has_children: false
parent: Linux
last_modified_date: 2025-03-30
---

# Global playback control
I love to use [MPRIS](https://wiki.archlinux.org/title/MPRIS) (Media Player Remote Interfacing Specification), which is a standard DBUS interface to manage (among other things) audio playback on your system. I use it through `playerctl`, which is a command line utility which provides a command line interface to media players that support MPRIS.

The Spotify Electron app for one uses MPRIS, which means you can use commands, which you should link to keybindings, to go to the next or previous track, or to play and pause playback. 

## Binding this to a key
So as an SXHKD keybinding that'd be something like:
```bash
super + {Down, Left, Right}
    playerctl {play-pause, previous, next}
```

Or for an i3 binding, maybe:
```bash
bindsym  $mod+Down exec --no-startup-id playerctl play-pause
bindsym  $mod+Left exec --no-startup-id playerctl previous
bindsym  $mod+Right exec --no-startup-id playerctl next
```

This means that, no matter the desktop I am on, I'll be able to stop playback with a keybinding, or at least, for applications that support this.

## MPV
My video player of choice is [MPV](https://mpv.io/), but one downside of it is that it does not support MPRIS. Luckily Ho-Yon Mak decided this was a massive oversight as well and made a plugin named [MPV-MPRIS](https://github.com/hoyon/mpv-mpris). It will, like magic, enable the use of my beloved keybindings for MPV. It is available in [most](https://repology.org/project/mpv-mpris/versions) Linux distributions package managers. For Arch, this is how to install it:

```bash
sudo pacman -S mpv-mpris
```
And it just works out of the box. No need for doing any setup or changing settings. Install and play!
