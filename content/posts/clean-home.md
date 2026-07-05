---
title: "Clean $HOME, Clean Mind"
date: 2026-07-05T17:31:27+02:00
author: "Joris"
draft: false
tags: ["macos", "zsh", "terminal", "tutorial", "linux"] 
---

I don't like a messy home. Home is where all your stuff lives and if you want to find something, it's easier if there's not a bunch of clutter in the way. This is true in your physical home and your digital `$HOME`. Most Linux distributions and macOS populate your $HOME with directories you never asked for. The difference is whether you can rid yourself of them. On Linux they come from `xdg-user-dirs`. You can remove or disable it, delete the directories, and they stay gone. macOS has no such switch: delete its home directories and the system quietly recreates them. So on the Mac you can't remove them... but you can hide them.

## The clutter
Your `$HOME` will have **Desktop**, **Documents**, **Downloads**, **Music**, **Pictures** and **Public** on both Linux and mac. **Videos** on Linux is **Movies** on mac. It's the same folder with a different name. **Templates** is only on Linux, and **Library** (hidden by default) only on mac. Some applications create an **Applications** directory in your mac home as well. Out of these, I personally only use Downloads and Documents. The rest is clutter to me. This means there's about half a dozen extra directories in my way every time I want to find something. This is true both in Finder and in the terminal.

## Linux
Let's quickly tackle the Linux side, as it's not what this post is about, because the fix is easy. One option is to just remove the `xdg-user-dirs` package. This won't work on all distros as some desktop environments depend on it. The second option is to open `~/.config/user-dirs.conf` and set `enabled=False`. Now delete the directories you don't want and they will stay gone, both in your file manager and in the terminal. That's it.

## macOS: Finder
macOS then. Like I said, we're going to have to hide them in two places in two different ways. Let's hide them in Finder first. macOS has a filesystem-level "hidden" flag, `UF_HIDDEN`, that you set with `chflags`. In my case I want to keep just Downloads and Documents, so I'd open a terminal and run the following.

```bash
chflags hidden ~/Desktop ~/Music ~/Movies ~/Pictures ~/Public ~/Library ~/Applications
```

Three quick notes: One, the Library directory is hidden by default. Two, you may not have an Applications directory. And three, to revert the hiding, use `chflags nohidden <directory>`.

If you'd like to check which directories on your system are hidden using the `UF_HIDDEN` flag, you can run the following command to see a list.

```bash
stat -f '%N %Sf' ~/* | grep "hidden"
```

Note that this does not show _dotfiles_, which are files hidden by using a period in front of the file name, but those are out of scope for this post anyway.

At this point the directories you don't want to see in Finder are gone. If for any reason you'd like to see them, just toggling hidden files within the Finder window will show them. You can do so by pressing `command` + `shift` + `.`. Pressing the same key combo hides the hidden files again.

## macOS: Terminal
macOS ships with BSD's `ls` command. If it shipped with GNU coreutils `ls`, you could hide these directories by making a simple alias like `alias ls="ls --hide='Music' --hide='Videos' --hide='Templates' --hide='Public' --hide='Desktop' --hide='Pictures'"`. Unfortunately the BSD `ls` does not support the `--hide=PATTERN` flag, so this is not a viable option for us. Luckily `eza`, an `ls` replacement I've used for ages now (and before that the now-defunct `exa`), is the answer. Besides providing a prettier, cleaner and above all configurable output, it also has the ability to hide certain directories. Find it [here](https://github.com/eza-community/eza). 

After installation, you can use it as an alias. For this post we're only touching on how to set up `eza` to hide the directories, but absolutely dive into the options it offers. The output can be tweaked to your liking in many ways. `eza` has the `--ignore-glob` flag. This allows for a pipe-separated list of _globs_ to ignore, and hence not show. The alias would look something like this.

```bash
alias ls="eza --ignore-glob='Music|Movies|Pictures|Public|Desktop|Library'"
```

Note that the flag requires wrapping the list in quotes, preventing the shell from expanding the pipes or names.

There's a major downside to doing this, though. This will basically hide these directories in _any_ directory, not just in `$HOME`. This means that if you're in a project directory and it comes with a **Library** directory, `ls` won't show it. One way of "fixing" this, is to have a second alias that will show everything, an `ls -la` (show all) replacement. Something like `alias la="eza --all"`, but that's a pretty bad solution. You'd want to see this **Library** directory in your project on a normal `ls` as well. That leaves one solution. Scripting it!

```bash
#!/usr/bin/env bash

SHOW_ALL=0
for arg in "$@"; do
    case "$arg" in
        -a|--all) SHOW_ALL=1 ;;
    esac
done

CLUTTER="Music|Movies|Pictures|Public|Desktop|Library"

IGNORE=()
if [[ "$SHOW_ALL" -eq 0 && "$PWD" == "$HOME" ]]; then
    IGNORE=(--ignore-glob "$CLUTTER")
fi

OPTS=(
    --long                     # one entry per line, with detail
    --group-directories-first  # directories on top
    # --icons                  # file-type icons (needs a Nerd Font)
    # --git                    # per-file git status
    # --header                 # column headers
    # --color=always           # keep colour when piping
    # --time-style=long-iso    # 2026-07-05 14:10 timestamps
)

exec eza "${OPTS[@]}" "${IGNORE[@]}" "$@"
```

Let's break down the script, so you'll know what is happening. 

- Line 1 is the [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)). 
- Line 3 to 8 checks if the script was issued with an additional `-a` or `--all` flag (more on this in a bit). 
- Line 10 is where you'd set the directories to hide. 
- Line 12 to 15 is where the magic happens. Here a check is run to see whether you're in your `$HOME` or not. If you are, the clutter directories are hidden from the output. If you're in another directory which happens to have a directory named the same as one in your `CLUTTER` list, it is shown normally. If `-a` is used, everything including hidden files and directories is shown regardless of where you are.
- And because I hinted that `eza` has more options, I've included a list of optional flags in the script that you can enable at your own discretion. That'd be lines 17 to 25. To do so, remove the `#` in front of the command in the first column. `--long` and `--group-directories-first` are enabled already.
- Line 27 runs the actual command in your terminal.

Save the script as `list` somewhere on your `PATH` and make it executable with `chmod +x list`. We're naming the script `list` as that does not shadow anything important, unlike naming it `ls` would. Next, we're going to set up two aliases for it in your `~/.zshrc`. 

```bash
alias ls="list"
alias la="list -a"
```

And here's where the `-a` from earlier comes back. When you type `ls`, the script sees no `-a`. If you're in `$HOME`, it builds the ignore-glob and the clutter is gone. When you type `la`, that one flag does two jobs. The loop at the top catches it and sets `SHOW_ALL=1`, so the script skips the ignore-glob and stops hiding the clutter. That same `-a` also passes through to `eza` as `--all`, which shows every hidden entry. One flag, two mechanisms. 

Now if you feel the need to dig through the clutter, `la` shows everything. Otherwise `ls` hides the clutter and leaves you a clean `$HOME`.
