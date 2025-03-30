---
layout: default
title: Compose key
has_children: false
parent: Linux
last_modified_date: 2025-03-30
---

# Compose key
For the longest time I have disabled my CapsLock key. I used to hit it from time to time and get annoyed by having to redo the bit I was typing, but this time not in all caps. For a little while I also used it in a keybinding, but found that using `VoidSymbol` (the key it will register as when disabled) is flakey. So this left me with a big button, right on the home row of my keyboard that does nothing at all, which is a waste.

In Dutch we use some special characters in writing, characters like é, è or ë. To be able to type these, I've always just relied on spell checking. It would underline a word like "Belgie", which is supposed to be "België" in Dutch (meaning Belgium) and I'd press `F7` and it'd fix it for me. This works ok, but isn't great when you are in an application without spell checking. I've written a script in the past which would use [Rofi](https://github.com/davatorium/rofi) and [FZF](https://github.com/junegunn/fzf) to display a list of special characters, which I could then arrow through to select a character. On pressing enter it'd copy the character to my clipboard and I could paste it anywhere.

![Compose key](/assets/img/compose.jpg)

This was not great. Way too convoluted for just placing a special character in a text. This should be easier. Enter the [Compose Key](https://en.wikipedia.org/wiki/Compose_key). Pressing the compose key begins a key press sequence that involves (usually two) additional key presses, which will then yield a character composed of the two. So for example pressing `e` followed by `'` (apostrophe/acute accent), will create `é`.

The compose key is not a physical key on the keyboard, but you can map any key to act as the compose key in Linux. And suddenly a useless key is useful!

I've added the following to my `bspwmrc` file, which will remap CapsLock to the compose key:
```bash
setxkbmap -option compose:caps &
```
:::note
I used my `bspwmrc` file to set this up, but you can do this in your `.bashrc` or `.zshrc` file as well.
:::

Now I am able to add special characters without any hassle! And it's not just the e key with markings, there are loads of possible combinations to create a special character. Some of my favorites:

| Char | Combination |
| ---- | ----------- |
| °    | oo          |
| ©    | oc          |
| ²    | ^2          |
| ³    | ^3          |
| è    | `e          |
| é    | 'e          |
| ë    | "e          |
| ø    | /o          |
| ≠    | =/          |

And more can be found [here](https://math.dartmouth.edu/~sarunas/Linux_Compose_Key_Sequences.html).
