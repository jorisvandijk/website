---
title: "Firefox"
date: 2026-05-26T23:13:21+02:00
author: "Joris"
draft: false
tags: ["macOS", "firefox"] 
---

I have been switching browsers a lot these last few months. The new CEO of Mozilla, Anthony Enzor-DeMeo, stated in [his post](https://blog.mozilla.org/en/mozilla/leadership/mozillas-next-chapter-anthony-enzor-demeo-new-ceo/) that _"It [Firefox] will evolve into a modern AI browser"_. This rubbed me the wrong way. Granted, Mozilla has been adding junk to their browser for a while now and none of it is good. He floated the idea of blocking ad-blockers in an interview. [The Verge](https://archive.is/75FjT) wrote: _"He says he could begin to block ad blockers in Firefox and estimates that’d bring in another $150 million, but he doesn’t want to do that. It feels off-mission"_.

This prompted me to find a new browser after more than 20 years of using Firefox. I tried many different ones, all with the same end result. I hate them all. 

I was going to do a full writeup of all of the ones I tried and exactly what it was that rubbed me the wrong way, but really- who cares? They're just worse than Firefox in some way or another **to me**. So where does that leave me? Back on Firefox... well, a port of it. I've landed on [LibreWolf](https://librewolf.net/), _"A custom version of Firefox, focused on privacy, security and freedom"_. It's basically Firefox with the shit ripped out. So far I'm really enjoying it. It's Firefox from before Pocket and the deluge of crap that followed. 

There are a few things I did want to write down though, in case I have to reinstall.

## Dark mode
By default "Enable ResistFingerprinting" is on (in **Settings** > **LibreWolf** > _Fingerprinting_). This breaks websites' ability to detect that I like dark mode by default. Most users use the DarkReader extension to fix this. I hate the way that extension colors things, so I disable this option. And I know, I know, this is not a good idea and against the idea behind this browser, but their core values are not the reason I use their browser. 

## Backspace
I like to be able to press backspace to go back a page. Firefox disabled this behavior years ago, so users didn't lose their filled in forms by accident. I like to live dangerously, so I reenable it. In `about:config` search for `browser.backspace_action` and set that to `0`.

## Extensions
I have a small list of must have extensions I use:
1. [uBlock Origin](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/). This is the non-negotiable one. It's the best ad blocker out there. Period.
2. [SponsorBlock](https://addons.mozilla.org/en-US/firefox/addon/sponsorblock/). I am trying to curb my YouTube addiction. Meanwhile though, blocking in-video sponsor segments is a huge quality of life improvement. If you get this one, make sure you go into the settings and also check skipping of intros, outros and self-promotion segments.
3. [I Still Don't Care About Cookies](https://addons.mozilla.org/en-US/firefox/addon/istilldontcareaboutcookies/). Clicking agree on all those GDPR consent things is a pain in the rear, especially as on browser close those cookies get nuked anyway. This extension auto accepts all of them. 

## Install
As I am on a Mac now, I needed to pick how to install this. Homebrew has an annoying issue with LibreWolf: _"Warning: librewolf has been deprecated because it does not pass the macOS Gatekeeper check! It will be disabled on 2026-09-01."_. Apparently this is due to the developers not wanting to shell out 99 bucks a year for an Apple Developer certificate, which I agree- they shouldn't. So best bet is installing straight from their website. Do note that this means you'll have to manually update the browser. 
