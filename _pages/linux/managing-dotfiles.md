---
layout: default
title: Managing dotfiles
has_children: false
parent: Linux
---

# Managing dotfiles
Everyone handles backing up their dotfiles in their own way. Some people use GNU Stow, some manually back them up, some don't bother and some have a script. I have a script.

First, if you're unaware what dotfiles are, I've explained them before as such:

>Dotfiles are the configuration files used on your Linux system. They are usually denoted with a dot/period in front of them, which makes them invisible. Because of this character these configuration files are known as dotfiles. 

I don't like symlinks and I don't want to have copies of files on my drive. So here's how I manage them.

Create an empty git repository directory on my system and when the time comes to back everything up, just copy all the dotfiles to this folder, run the git commands and delete the copies of these files. Obviously I am not going to do this manually, a script will do this for me as I stated above. This script:

```bash 
#!/usr/bin/env bash

#	Dotfiles 3.1
#	Manage dotfiles with a bash script
#	Dependencies: git
#
#	By Joris van Dijk | Jorisvandijk.com 
#	Licensed under the GNU General Public License v3.0

# Locations
dotfiles_repo=~/.dotfiles
dotfiles_list=~/.bin/Dotfiles-list

# Script
cd $dotfiles_repo

while read -r dotfile; do
  if [[ -f $dotfile ]]; then
    cp --parents $dotfile $dotfiles_repo
  elif [[ -d $dotfile ]]; then
    cp --parents -r $dotfile $dotfiles_repo
  fi
done < $dotfiles_list

git add -A

if [[ -n $(git status -s) ]]; then

  git status
  
  read -p "Enter a commit message: " commit_message

  git commit -m "$commit_message"
  git push origin main
fi

# Cleanup
find $dotfiles_repo -mindepth 1 -maxdepth 1 -not -name ".git" -not -name ".gitignore" -exec rm -rf {} \;

``` 

## Using this script
1. Create a git repository on your favorite git host. 
2. Clone this repository to your system, creating a directory. This directory should be set as `dotfiles_repo` in the script under `# Locations`. I named mine `.dotfiles` and stored it in my home directory.
3. Create a file which will house the locations of the dotfiles you want to back up. One dotfile, or complete directory per line. Mine looks like this:

```bash 
/home/joris/.config/bspwm
/home/joris/.config/dunst
/home/joris/.config/feh
/home/joris/.config/gtk-3.0
/home/joris/.config/kitty
/home/joris/.config/micro
/home/joris/.config/mpv
/home/joris/.config/newsboat
/home/joris/.config/parcellite
/home/joris/.config/picom
/home/joris/.config/sxhkd
/home/joris/.icons
/home/joris/.local/share/applications/microlaunch.desktop
/home/joris/.themes
/home/joris/.bin
/home/joris/.bashrc
/home/joris/.bash_profile
/home/joris/.Xresources
/home/joris/.mozilla/firefox/17yhl6to.default-release/chrome
/etc/pacman.conf
/etc/pacman.d/mirrorlist
/etc/modprobe.d/nobeep.conf
```

As you can see I am not only backing up dotfiles from my home directory, but also files from root. (Granted these are not *technically* dotfiles, but they are configuration files nonetheless.)

4. Save the file somewhere on your system and enter its location in the script after `dotfiles_list` under `# Locations`. Mine is at `~/.bin/Dotfiles-list`.
	
5. Set up a `.gitignore` file to make sure some stuff does not get backed up. For example, Micro keeps a buffer, history and backups in its .config location. And while I do want to back up my Micro settings, I do not want to back up these temporary files. I therefor add a `.gitignore`*file to the repository directory (.dotfiles) with the following content:
	
```bash 
home/joris/.config/micro/buffers
home/joris/.config/micro/history
home/joris/.config/micro/backups
``` 

And that's it. Next time you want to back up your dotfiles, you can just run the script. It will grab a copy of all the files you listed and plonk those into the directory you specified. It will then git add them, ask for a commit message and push the files to git. It will then clean up the directory by deleting all the copied files, this way you don't have duplicates on your system. 

It will also maintain the directory structure, which results in a very organized git repository online, as you can see when looking at [mine](/#dotfiles). You'll also find the most up to date version of the script here. 


