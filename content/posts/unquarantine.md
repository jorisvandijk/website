---
title: "Unquarantine"
date: 2026-06-20T12:12:53+02:00
author: "Joris"
draft: false
tags: ["macOS", "terminal", "quickie"] 
---

It's great that your OS tries to protect you from yourself, because let's face it, you don't always make the best decisions. When you download an app macOS slaps a `com.apple.quarantine` extended attribute on it. This is what triggers Gatekeeper's super duper handy popup asking you if you are really, truly sure you want to open a thing you just deliberately downloaded. If you could just click *OK* on this and move on, that'd be fine. It's a little reminder that "hey, you did a thing you might not want to do". And it does this sometimes. Other times it will flat out deny you running it. You'd have to go into settings and click through menus to allow the application in order to actually launch it. This is going too far. Luckily a single terminal command will handle it in one fell swoop.

```bash
xattr -d com.apple.quarantine /path/to/app
```

{{< warning >}}
This is obviously dangerous and if the application contains malicious content, it will be able to infect your machine. 
{{< /warning >}}
