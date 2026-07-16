---
title: "Control Fn"
date: 2026-07-17T00:28:17+02:00
author: "Joris"
draft: false
tags: ["macos", "quickie"] 
---

The MacBook keyboard layout is wrong. Control goes in the bottom left corner, but for some reason fn is chilling there. My old ThinkPad also had them in the wrong order. I hate this so, so much, and clearly more people dislike it, as the ThinkPad has an actual dedicated BIOS setting to swap the two. 

![fn and control](/img/fn-control.png#center)

Now the Mac offers the ability to change what the keys do too, at least it seems to. Unfortunately, changing the setting in **Settings** > **Keyboard** > **Keyboard Shortcuts** > **Modifier Keys** does nothing for me. Not a clue if this is a me problem or a macOS one.

![Keyboard setting](/img/keyboard.png#center)

Luckily there’s [Karabiner Elements](https://karabiner-elements.pqrs.org/), which allows for complex modifications, including swapping keys. 
```json
{
    "description": "Swap fn and control keys",
    "manipulators": [
        {
            "from": {
                "key_code": "fn",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "left_control" }],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "left_control",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "fn" }],
            "type": "basic"
        }
    ]
}
```

And to make it all look right: the fn and control keys are the same size, so with great patience, effort, and care, you can physically [pop those out](https://www.youtube.com/watch?v=8dB-vNBXEFQ) and swap them. 

