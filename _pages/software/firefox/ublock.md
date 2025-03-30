---
layout: default
title: uBlock
has_children: false
parent: Firefox
last_modified_date: 2025-03-30
---

# uBlock

## Filter lists
### YouTube shorts
[Block YouTube shorts](https://github.com/gijsdev/ublock-hide-yt-shorts)

### YouTube hover-play video preview
```
youtube.com##+js(aeld, mouseenter) 
```

### Google login box (like on Reddit)
```
||accounts.google.com/gsi/iframe
```

### Block YouTube sidebar and top suggestions bar
```
www.youtube.com###guide-wrapper > .ytd-app.style-scope
www.youtube.com###header
```

## Export
I have also exported my filter list. It lives in my `Backup` repository

