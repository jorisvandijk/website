---
title: "Change Directory, List"
date: 2026-06-24T13:50:26+02:00
author: "Joris"
draft: false
tags: ["terminal", "zsh", "bash"] 
---

When moving around in my terminal, I use two commands in sequence all the time. You'll know them, they are `cd` and `ls`. _Change directory_, then _list_ the contents of that directory. I decided this was getting annoying. Why is there not a single command to do this? Why not make one? I first thought an alias might work, but then I realised you cannot call an alias, hand it a variable and have it do something after that variable. `<alias> <user variable> <second action>` is just not possible. 

A function then. A simple one at that. In your `~/.zshrc` or `~/.bashrc` add the following.

```bash
cl() { 
    cd "$@" && ls; 
}
```

Type `cl <directory>` and it changes to that directory, then runs `ls` right after. Exactly what I wanted.
 
A few small details in there are worth pointing out:
 
- The semicolon before the closing brace matters. zsh is happy to accept it without one, but bash reads that trailing `}` as an argument to `ls` and bails out with `syntax error: unexpected end of file`. The semicolon (or a newline) is what actually closes the function, and it does so in both shells.
- `"$@"` forwards everything, including nothing. Passing `"$@"` hands `cd` *all* the arguments. This is important if you use zoxide (see below), as it allows more than one argument.

## Zoxide
I am a [zoxide](https://github.com/ajeetdsouza/zoxide) user. Zoxide is a cd replacement and _"remembers which directories you use most frequently, so you can 'jump' to them in just a few keystrokes"_, according to their git. I have `eval "$(zoxide init zsh --cmd cd)"` set in my `.zshrc`, which means that my normal `cd` command is replaced with zoxide's behavior. My `cl` command works flawlessly with this, without needing adjustments. 

## The zsh-native way
If you're on zsh there's an even cleaner option, which I only found _after_ writing the function above. zsh has a `chpwd` hook that fires every single time the working directory changes. That includes `cd`, `cd ..`, `pushd`/`popd`, and zoxide too. Define it like this:

```zsh
chpwd() ls
```

Now you never type a separate `ls` again, no matter how you got there. The tradeoff is that it is no longer opt-in. It lists on _every_ directory change. I personally do not want this, as I do not want an `ls` after every `cd`, but you might like it. I'll stick to my own function.
 
	
