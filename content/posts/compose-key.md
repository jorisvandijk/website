---
title: "Compose Key"
date: 2025-07-20T14:10:38+02:00
author: "Joris"
draft: false
tags: ["linux", "tutorial"]
---

In many languages there's a need to add decorations, or glyphs to characters, like for example `é` or `č`. These are called [diacritics](https://en.wikipedia.org/wiki/Diacritic). These characters don't exist on a US Standard _qwerty_ keyboard. There is the US International version with _dead keys_, which allow for crafting these special characters by pressing the desired diacritic key followed by the character to apply it to. So for example pressing `~` followed by `n` results in an `ñ`. 

This is a great solution for most people, as it is intuitive and works well. There's a downside you may have spotted, which is that when you actually want to use a tilde, a caret, an apostrophe, or any other special key linked to a diacritic, you'll need to follow it with a `space` in order to generate the special character on its own. For anyone who writes code, this is a huge hassle. Suddenly, typing a single quotation mark requires two keystrokes (the apostrophe key followed by space). This may seem like a small gripe, but it adds up quickly.

Luckily, there's a huge pointless button right on the home row that can be made to do something magical! 

# CapsLock as a compose key
The CapsLock key is, in my opinion, a waste of space. I never need to type anything in ALL CAPS, so locking the keyboard to uppercase is not a function I need. It's also placed on prime real-estate, right where my fingers rest. Now there's a special button that existed on keyboards of old, called the [compose key](https://en.wikipedia.org/wiki/Compose_key). Pressing the compose key begins a key press sequence that involves (usually two) additional key presses, which will then yield a character composed of the two, so like the _dead keys_, but with a leader key. Modern keyboards do not have this key, fortunately you can map any key to function like it on Linux. 

## X11
So replacing the CapsLock key with the Compose key is an ideal solution for being able to use diacritics. This can be done in several ways. For example, on _X11_, you can add the command below to an _autostart.sh_ script you run on boot. Or maybe in your _~/.profile_ or _~/.xinitrc_. On desktop environments you can make the command below into a _.desktop_ file. And window managers like _i3_ offer startup commands like `exec --no-startup-id`, which you can use to issue the command.

```bash
setxkbmap -option compose:caps &
```

## Wayland
On _Wayland_ I personally use _Hyprland_ as my window manager, or well compositor. Within it, the compose key can be set in the _hyprland.conf_ file, like so:

```bash
input {
    kb_options = compose:caps
}
```

It is also possible to set it using _NixOs_'s session variables, which I haven't tried myself, as the Hyprland solution works fine for me. Anyway, in NixOS you could set something like:

```nix
environment.sessionVariables = {
  XKB_DEFAULT_OPTIONS = "compose:caps";
};
```

# Conclusion
Now I am able to add special characters without any fuss and there are loads of possible combinations to create special characters. Some of my favorites:

|Char|Combination|
|---|----|
| ° | oo |
| © | oc |
| ² | ^2 |
| ³ | ^3 |
| é | 'e |
| ë | "e |
| ø | /o |
| ≠ | =/ |

And more can be found [here](https://math.dartmouth.edu/~sarunas/Linux_Compose_Key_Sequences.html).
