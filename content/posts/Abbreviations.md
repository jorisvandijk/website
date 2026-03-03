---
title: "Terminal Abbreviations"
date: 2026-03-03T11:11:21+01:00
author: "Joris"
draft: false
tags: ["linux", "terminal", "zsh"] 
---

Typing takes time. Typing without typos is an art. Fixing mistakes in a terminal command is a pain in the neck. Luckily there's such a thing as _aliases_. An alias lets you set a keyword and a command it should expand to. For example, I have set a super simple one, which is widely used: `alias ..='cd ..'`. This allows me to write `..` in terminal and it will act like `cd ..`, saving me typing a _c_, a _d_ and a space. This seems minor, but when you imagine how often I need to go up a directory in terminal, it's a huge timesaver. 

It's not just saving time. Some commands I simply cannot remember. So for using _rsync_ to move a file over to or from my server, the command I use is `rsync -a --no-owner --partial --info=progress2 -e ssh`. There's no way I'll remember that, so I aliased it. There's one snag when it comes to aliases: they can only be used at the start of a line. This _rsync_ command is usually followed by either a local directory or a location on my server. This means typing out the username and IP of the server followed by the remote location. This is a somewhat long string which is always the same. This is a hassle and would be so much easier if it could be replaced by an alias. Enter [zsh-abbr](https://github.com/olets/zsh-abbr).

This nifty program lets you set up "abbreviations", which basically work like aliases, except you can add a flag and they work anywhere on the line! So instead of typing out `joris@192.168.1.5:/` I can now type `srv` and it automatically (and interactively) expands to that! The automatic expansion is also an improvement over aliases, as it shows the actual command or string in history, not the alias used. I moved over the _rsync_ command to an abbreviation, which means I can now type:

```
copy . srv
```

Instead of:

```
rsync -a --no-owner --partial --info=progress2 -e ssh . username@192.168.1.5:/
```

And remember, it's interactive, meaning that after you typed `copy` and pressed space, it visibly changes to the _rsync_ command. Same for the `srv` abbreviation, meaning you see the entire command before you press enter!

## Adding Abbreviations
First [install the program](https://zsh-abbr.olets.dev/installation.html). Then add an abbreviation in terminal:

```
abbr copy="rsync -a --no-owner --partial --info=progress2 -e ssh"
```

Or, when you want to have it work globally (anywhere on the line), add the `-g` flag:

```
abbr -g srv="joris@192.168.1.5:/"
```

For more commands, see the [documentation](https://zsh-abbr.olets.dev/commands.html).

## Caveats
This only works in Zsh. If you use Fish, it's built-in. Bash unfortunately has no support for this as far as I'm aware.
