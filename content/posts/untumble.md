---
title: "Untumble"
date: 2026-08-31T21:57:11+02:00
author: "Joris"
draft: false
tags: ["babble", "tutorial", "browser", "minimalism"]
---

For a while I have been bitching about YouTube. [Here](https://jorisvandijk.com/posts/youtube), [here](https://jorisvandijk.com/microblog/#2026-06-14-235106), and [here](https://jorisvandijk.com/microblog/#2026-08-02-005856) just on this site alone. I’ve moaned about it on Discord and in real life too. 

My main gripes are it’s all AI slop and there’s nothing worth discovering on the homepage of the site anymore. You could keep scrolling and never hit anything worth watching anymore. Unfortunately this didn’t seem to dissuade me from trying anyway. I found myself mindlessly typing the domain in the address bar only to tumble down this list of pointless video thumbnails never actually clicking anything to watch. I could do this for far longer than I’d care to admit to. And I did often.

Today I decided no more. To be fair, I decided this several times before. Relying on pure willpower didn’t keep me from going back to this site. Blocking the domain with uBlock resulted in me getting that craving and just unblocking again. Another reason blocking does not work, is I have channels I _do_ want to watch content from. Not only that, sometimes you just need some information on a thing, a review, a how-to, a video with actual value. 

Quick side note, I do not use YouTube with an account. Never have. My “Subscriptions” live in a file filled with RSS feed links, which makes NewsBoat (an RSS reader) notify me of new videos from the channels I “follow”.

So this evening, sliding down the homepage of despair it hit me. I don’t need to block the entire site. My issue is with the front page of this hellhole! A little messing around with uBlock and the LibreWolf (Firefox) Inspector later and adding the filters below to **uBlock** → **Settings** → **My Filters** and applying the changes will make the YouTube homepage look like this:

![YouTube Home](/img/youtube.png)

The rest of the site works just like normal. You can search for videos, play them, read comments and get suggestions in the bar on the right of the videos. I left that last part intact, because I figure - if I am watching a video I liked, chances are related videos _might_ be fun too. I’ll decide later if I’ll keep it. At any rate, these are my filters should you want the same experience:  

```
! === Kill homepage feed ===
www.youtube.com##ytd-browse[page-subtype="home"] #contents
www.youtube.com##ytd-browse[page-subtype="home"] ytd-rich-grid-renderer

! === Kill left sidebar ===
www.youtube.com##ytd-guide-renderer
www.youtube.com##tp-yt-app-drawer
www.youtube.com##ytd-mini-guide-renderer

! === Kill sign in ===
www.youtube.com##ytd-button-renderer:has-text(Sign in)

! === Kill voice search ===
www.youtube.com###voice-search-button

! === Kill hamburger menu ===
www.youtube.com###masthead #guide-button

! === Kill right three-dot menu ===
www.youtube.com###masthead #button
```

{{< note >}}
It took less than 24 hours, but I decided to also remove the suggestions on the video pages. These lead to mindless scrolling as well. To remove those add the following.

```
! === Kill video suggestions pane ===
youtube.com##ytd-watch-next-secondary-results-renderer
```
{{< /note >}}
