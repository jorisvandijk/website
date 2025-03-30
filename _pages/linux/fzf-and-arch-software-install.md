---
layout: default
title: Install software with FZF
has_children: false
parent: Linux
last_modified_date: 2025-03-30
---

# Installing software on Arch Linux with fzf
Fuzzy file finding is amazing. It really is. You can search a query containing at least part of what you're looking for and it'll find it. It's like magic. My fuzzy file finder of choice is called [fzf](https://github.com/junegunn/fzf).

Fzf on its own is nothing special. Type `fzf` in your terminal after installing it and it'll list all files on our system but it also provides you with an input prompt. Say you type `.bashrc` in that prompt and hit enter, it will just spit out only the path to that file. Nothing more. Basically fzf will launch an interactive finder, read the list from STDIN, and write the selected item to STDOUT. This can be used in many interesting and very useful ways. Like using it to find an application and install it.

So for my AUR helper I use Yay. Yay is not only capable of installing from the AUR, it also is able to install from the "normal" repositories as well as search all of 'em. This means that you don't need to use Pacman at all, but you can just use Yay to install anything on Arch. 

I have the following lines in my `.bashrc` file:
```bash
function i() {
    selected_packages=$(yay -Slq | fzf --multi --preview "yay -Si {1}" --preview-window=right:70% | tr '\n' ' ')
    [[ -n "$selected_packages" ]] && yay -S $selected_packages
}
```

The command above makes it so that when I press `i` and hit enter in my terminal I get a search prompt powered by fzf, which allows me to search for any bit of software available on either the standard repos, or in the AUR and select it to install it. 

Remember to refresh your terminal emulator (by typing `source ~/.bashrc`, or `bash` in your terminal) after adding the alias to your `.bashrc` file. If you don't do this, the alias will not be available until you restart your terminal emulator.

It can even install several things at once by selecting the thing you want to install with tab, and then entering another search query and selecting the next thing to install. Also great to know is that searching with fzf is blazing fast.

[![FZF Yay searching](/assets/img/fzf_thumb.png)](/assets/img/fzf.png)\
*Fzf searching the repositories.*

## Bonus
You can also use this to remove applications from your system. To do so, add the following to your `.bashrc` file and press `r` in your terminal followed by `enter` to search for an application to remove.

```bash
function r() {
    selected_packages=$(pacman -Qq | fzf --multi --preview "pacman -Qi {1}" --preview-window=right:70% | tr '\n' ' ')
    [[ -n "$selected_packages" ]] && sudo pacman -Rns $selected_packages
}
```
