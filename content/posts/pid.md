---
title: "Pi'd"
date: 2026-08-25T13:33:45+02:00
author: "Joris"
draft: false
tags: ["hardware", "babble", "emulation"]
---
It has been a busy weekend. I completed four different projects all to do with entertainment. It started with me rummaging around in my electronics bin and bumping into the Raspberry Pi Zero 2 WH on Friday evening. I hadn’t actually done anything with this Pi before, so I decided on a whim to see what I could do with it. A little surfing later and the idea of playing retro games on my TV in the living room with my Xbox controller seemed like an amazing thing to me. 

## Retro game emulation on TV

I got to work. Downloading RetroPie[^1] and installing it on the Micro SD card was easy with the Raspberry Pi Imager[^2]. Booting into it was no issue either. Then I ran into an issue. No bluetooth on boot. I had to connect my controller with a cable. This won't do! I want to sit on my couch and play, so I grabbed a keyboard, connected that and went through the menus and tried to connect the controller. Best I got was it connecting and disconnecting over and over again. The light on the controller kept blinking and the terminal output in `bluetoothctl` was a scrolling list of connect and disconnect messages. 

Then came many hours of googling, followed by installing a different OS on the Pi named Batocera—only for it to do the exact same with the Xbox controller connection. I sighed deeply. More googling came. Eventually I deduced it was probably the controller’s software. And luckily Microsoft had pushed an update that would fix this. Hooray! 

Updating the controller can only be done with an Xbox—which I don’t own, or on Windows—which I don’t run. Luckily, I thought, I have UTM installed with a Windows VM. I’ll just pass the controller through to it (which worked, it made the *ding* sound and the controller was listed in Device Manager). I downloaded the Xbox Accessories app through the Microsoft Store and launched it. Ignored the account login warning and… no joy. It just would not detect the damn thing. This time it didn’t take me hours to give up. Pretty quickly I said *fuck it* and pulled my wife’s old Windows laptop from the mothballs. Booted into it. Sat through twenty minutes of updates. And finally installed the software and connected the controller. Without any fuss it showed the thing and allowed me to update it. 

Within minutes it was done and I booted the Pi into a fresh copy of RetroPie. Went through the keyboard bluetooth hassle again and this time got the controller connected in one go. Bright non-blinking LED! I connected the Pi to my TV and played roughly ten different games for about an hour before I went to bed.

That night I had a thought: I have an Nvidia Shield I could have used to emulate retro games on the TV instead, that way I’d have the Pi to power streaming shows on the TV in my gym (more on this below). 

## More emulation on TV

Some time Saturday evening I disconnected the Pi and booted into the Shield. I had done some searching online and had a decent plan to get this working. RomM[^3]—the rom manager I have running on my server—has a native Android app called Argosy Launcher[^4]. Unfortunately this app cannot be installed with the Play Store (through which I did install some emulators, like NetherSX2 Classic[^5] and RetroArch[^6], which Argosy will automatically use), but Argosy has to be sideloaded with adb[^7].  I had Developer mode already turned on, so I also turned on USB Debugging and Network Debugging. Then from my laptop I `adb connect`-ed and `adb install`-ed. I then pointed Argosy to my RomM's address and like magic it synced all my games. 

Several retro systems work out of the box, some require external emulators and some need you to upload BIOS files, like NetherSX2 Classic did. No problem, just make a BIOS folder anywhere user writable, I went `/sdcard/bios` and `adb push`-ed the BIOS files to that location from the computer. NetherSX2 was a pain to navigate through, as it is supposed to run on a phone (not a TV), but with trial and error and loads of patience, I got it all to work. 

I played a couple of games for about 20 minutes before I decided to please the wife and get streaming to the gym TV working with the Pi, so she could finally play her shows from the server while working out.

## Entertainment in the gym detour

I’ll spare you the swearing and other abuse I made the poor little Pi endure. Suffice to say, the thing just isn’t powerful enough to properly play media from Jellyfin over a network.

Shit. So I went googling again and compared my options. Apple TV: too expensive; a second Shield: also too expensive; Amazon Fire TV stick: crap product. I eventually landed on a Xiaomi TV Box S (3rd Gen). But I didn’t want to run their native OS on it though. That uses Google TV which is the same shit OS the Shield uses. I found that it has support for CoreELEC[^8], which is basically an OS built around Kodi—the popular media center application. This is perfect as Kodi has an add-on for Jellyfin which manages the media on my server. 

With the Xiaomi in my cart, I wandered around the CoreELEC project’s website, only to stumble across the supported devices page and something caught my eye: HardKernel Odroid N2. I own one of those! It’s been sitting in a box for well over six years. Looking into this a little more, it has several advantages over the Xiaomi even though it’s much older. It has more raw power, it has ethernet, and it carries neither Xiaomi's junk nor Google TV. And most of all, it’s free (as in I already own it). *Empty cart*.

Installing CoreELEC on the N2 is simple. Just `dd` the image on an SD card and plop that into the N2. Run through some screens and you’re up and running. I had a mouse connected to the thing at first, but remembered I had once bought a remote with a keyboard on the back and a USB receiver. I even knew where I left it. So I swapped the mouse for the remote and the experience was great! 

The only slight hurdle was getting the Jellyfin plugin installed. Sure there’s one on the Kodi repositories, but that’s not the one that we need. This one comes from the Jellyfin repo, which needs to be installed manually. Jellyfin has a page explaining how to do all this in detail[^9] and doing it isn’t hard. After connecting to my server and logging in, it did take quite a while to sync everything. Good thing to note is to leave the device alone while it’s doing this. What not to do is move through menus and content and try playing things, because that freezes up the system requiring a reboot. A reboot means the sync has to start from scratch, I learned the hard way. When it eventually finished I found it handled playback perfectly no matter what file I threw at it. 

Happy wife—happy life. 

## Even more emulation, but on Mac now

Sunday morning I sank another hour into playing retro games on the Shield and bumped into Zelda games, which reminded me that *Breath of the Wild* existed. I had wanted to play this game since it came out, but I don’t own a Switch or a Wii U, so I never did. With all this emulation experience under my belt I decided to see if I could run the game on the Shield and *nope*. Not a chance. 

While searching for a way to do this the name of an emulator kept popping up: Cemu[^10]. Though it won't work on Android, my MacBook Air M4 is more than powerful enough to run it. So I installed the emulator and *legally* obtained a copy of Breath of the Wild. A lot of effort later, I found that this copy would just not work with the emulator. 

Back to googling and it turns out, there’s another bit of software called WiiUDownloader[^11] which can be used to get all the bits needed to install and play the game on Cemu. Some time waiting for downloads to finish later and the game launched in the emulator! Unfortunately I had no luck in setting up my Xbox controller though, so after some more googling I found a YouTube video which explained it well. Weirdly though, one day later it seems to be blocked due to "Claimed content by Nintendo". Anyway, basically all you do is set the emulated controller to *Wii U GamePad*, set the controller to *Xbox Series X Controller [SDLController]* and calibrate each button below if needed.

After settling the controller issue and setting some *Graphic Packs*, I launched the game and boy what a game! It looks stunning, plays like a charm and will no doubt suck up a lot of my spare time. 

Later that day I finally got around to cleaning up the mess of cables and other hardware that had collected on the dining table during this weekend. After carrying the TV and its new media box to the garage, and neatly storing away my cables and SD cards, I noticed a lone green board left on the table. Oh yeah—I am still not doing anything with the Pi. Back in the electronics box it went. No regrets. 10/10 weekend.

[^1]: [RetroPie](https://retropie.org.uk/)
[^2]: [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
[^3]: [RomM](https://romm.app/)
[^4]: [Argosy Launcher](https://github.com/rommapp/argosy-launcher)
[^5]: [NetherSX2 Classic](https://github.com/Trixarian/NetherSX2-classic)
[^6]: [RetroArch](https://www.retroarch.com/)
[^7]: [adb](https://developer.android.com/tools/adb)
[^8]: [CoreELEC](https://coreelec.org/)
[^9]: [Jellyfin's Kodi Add-on Repository](https://jellyfin.org/docs/general/clients/kodi/)
[^10]: [Cemu](https://cemu.info/)
[^11]: [WiiUDownloader](https://github.com/Xpl0itU/WiiUDownloader)
