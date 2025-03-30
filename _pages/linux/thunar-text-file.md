---
layout: default
title: Thunar text files
has_children: false
parent: Linux
last_modified_date: 2025-03-30
---

# Open text file in a terminal editor from Thunar
For some reason I like to use [Thunar](https://docs.xfce.org/xfce/thunar/start) as a file manager. It's been my go-to for years now. It has worked a treat for ages, however I used to want to edit text files (like configuration files) in [Code](https://code.visualstudio.com/) (the editor). I don't anymore. I want to be able to edit those files in [Micro](https://micro-editor.github.io/), which runs in the terminal.

This would also work for Vim, but personally, I like Micro.

I use [Kitty](https://sw.kovidgoyal.net/kitty/) as my terminal emulator, so this is assuming you are too. If you use a different emulator, look up what you should alter to make it work for you.

First lets go here:
```bash
cd ~/.local/share/applications
```

Next, we'll need to create a .desktop file here:
```bash
touch microlaunch.desktop
```

And paste the following into that file, then save it.
```bash
[Desktop Entry]
Version=1.0
Type=Application
Name=kitty micro
GenericName=Terminal emulator micro launcher
Comment=Fast, feature-rich, GPU based terminal
TryExec=kitty
Exec=kitty micro %F
Icon=kitty
Categories=System;TerminalEmulator;
```

Now in Thunar, we need to right click a file like say the i3 config file and select "Kitty Micro" and set it as default.

[![Launch with Micro in Kitty](/assets/img/setmicro_thumb.png)](/assets/img/setmicro.png)

Now when ever we select a text file, like a config file, it'll launch Micro in Kitty and display the file you double clicked in Thunar.
