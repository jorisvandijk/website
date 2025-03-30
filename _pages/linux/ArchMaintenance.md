---
layout: default
title: Arch maintenance
has_children: false
parent: Linux
last_modified_date: 2025-03-30
---

# Arch Linux Maintenance
It's a good idea to keep your system well maintained. Arch has a [wiki article](https://wiki.archlinux.org/title/system_maintenance) in which they describe best practices on how to maintain your Arch system according to them. 

So I went through the article and found that some of these things I already do, like updating my system and packages, or removing orphaned packages. But other things I rarely do, like checking if systemd services have failed. So I decided to cherry-pick a number of actions I think are great and put those in a little bash script, which I could then run from time to time in order to keep my system running smoothly for years to come.

```bash 
#!/usr/bin/env bash

#	ArchMaintainer 1.4
#	Performs maintenance and removes excess stuff from Arch. 
#	Dependencies: pacman, git, pacman-contrib, rankmirrors
#
#	By Joris van Dijk | Jorisvandijk.com
#	Licensed under the GNU General Public License v3.0

GRN='\033[0;32m'
NC='\033[0m'

# Check for failed systemd services 
printf "\n${GRN}>> Checking failed services:${NC}\n"
systemctl --failed

# Remove orphaned packages
printf "\n${GRN}>> Removing orphaned packages if any.${NC}\n"
sudo pacman -Rs $(pacman -Qqtd) --noconfirm
printf "If 'no targets specified', no orphaned packages were found.\n"

# Delete Pacman cache
printf "\n${GRN}>> Deleting Pacman cache.${NC}"
printf "\nCurrent size: "
sudo du -sh /var/cache/pacman/pkg/
sudo pacman -Scc --noconfirm
printf "\nNew size: "
sudo du -sh /var/cache/pacman/pkg/

# Empty ~/.cache
printf "\n${GRN}>> Emptying ~/.cache.${NC}"
printf "\nCurrent size: "
du -sh $HOME/.cache
rm -rf $HOME/.cache/*
printf "\nNew size: "
du -sh $HOME/.cache

# Updating and ranking mirrors
printf "\n${GRN}>> Updating and ranking mirrors in mirrorlist.${NC}\n"
sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.backup
cd $HOME
curl -s "https://archlinux.org/mirrorlist/?country=NL&country=DE&country=FR&country=BE&protocol=https&use_mirror_status=on" | sed -e 's/^#Server/Server/' -e '/^#/d' | rankmirrors -n 5 - > mirrorlist
sudo mv mirrorlist /etc/pacman.d/mirrorlist

# Done
printf "\n${GRN}>> Done!${NC}\n"

```

An up to date version of this script can be found in my [dotfiles](/#dotfiles).
