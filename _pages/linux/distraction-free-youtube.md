---
layout: default
title: Distraction free YouTube
has_children: false
parent: Linux
---

# Distraction free YouTube videos
I'm trying to only enjoy content I like. I try not to get involved in social media. Not to get into that trap of watching one thing followed by the next, and then the next thing. I don't do Twitter, I don't do Facebook, I don't do Instagram, I don't do Tiktok. I do like some content on YouTube. This presents me with a problem. If I were to go to the site they offer, I'd watch the video I came for and then I'd watch the next one they offer, and then the following and then... well, you get the idea. This is a rabbit hole I want to not get into. Hence I found a solution to this, by making sure I only watch what I like and nothing more.

**<center>Never open the YouTube website in your browser.</center>**

There are a couple of channels I like a lot and want to see the content of. I do not want to get side-tracked by the "Watch next", or "Content like...", or... well whatever they offer for you to watch next. All I want is to view the thing I care about and then get on with my day. Anyway, what I am trying to offer here is a way, or well, the way I use the tubes of the you. No ads, no rabbit hole, no distractions.

TL;DR: Watch only the content you want from YouTube without distractions.

## Required software
We'll need a couple of programs, namely:

- [Newsboat](https://newsboat.org/)
- [MPV](https://mpv.io/)
- [YT-DLP](https://github.com/yt-dlp/yt-dlp)
- [YT-DLP-drop-in](https://aur.archlinux.org/packages/yt-dlp-drop-in)
- [MPV SponsorBlock](https://github.com/po5/mpv_sponsorblock)

### Installing these on Arch Linux:
```bash
sudo pacman -S newsboat mpv yt-dlp && yay -S yt-dlp-drop-in
```
MPV and the two YT-DLP packages are a matter of installing and forgetting. We will not touch configs for these programs in this post. I do suggest you read about them on their respective websites. As for MPV SponsorBlock, it will have to be manually installed.

## Newsboat
We'll be using [Newsboat](https://newsboat.org/), which is an RSS reader. This program make it possible for us to get notified when one of our YouTube people post a new video and for us to then watch it without having to open a browser. 

Newsboat stores its configs in **$HOME/.config/newsboat**. By default Newsboat doesn't create this directory or its content. To get going we'll create some files and directories.
```bash
mkdir $HOME/.config/newsboat && mkdir $HOME/.config/newsboat/scripts
```

```bash
touch $HOME/.config/newsboat/urls && touch $HOME/.config/newsboat/config
```

### urls
In order to follow a channel, we'll need to add a link to its RSS feed in the urls file. This requires us to get their channel ID's. We'll go to a channel's page in our web browser and open the source for the page by right-clicking on the page and selecting the correct option. We then press `CTRL+f` to search for "`/U`". After a bit of side-to side scrolling we'll find the channel ID.

[![Channel ID](/assets/img/channel_id_thumb.png)](/assets/img/channel_id.png)

This we then copy and paste in Newsboat's URL file in `$HOME/.config/newsboat/urls` in the following manner, where `CHANNEL_ID_HERE` has to be replaced by the actual channel ID and `CHANNEL_NAME_HERE` has to be replaced by the channel's name:

```bash
https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID_HERE CHANNEL_NAME_HERE
```

You can also use [this website](https://commentpicker.com/youtube-channel-id.php) to find a channel ID, if you're not interested in searching for it manually.

As an example, to add [The Linux Cast](https://www.youtube.com/@TheLinuxCast) to your urls file, you'd add the following:
```bash
https://www.youtube.com/feeds/videos.xml?channel_id=UCylGUf9BvQooEFjgdNudoQg The Linux Cast  
```

Add all the channels you'd like to follow to this document and save it.

### config
In the Newsboat config file we'll need to make sure we add the following line:
```bash
browser "mpv %u"
```

This tells Newsboat to open links with MPV and not with a web browser. You can set many more things in this config file, but for the purposes of this post, this is all we need.

## MPV SponsorBlock
We don't want to be bothered by in-video sponsor bits brought to us by the creator of the video itself. You know the things like *"...but first, I'd like to thank the sponsor of this video..."*. We're going to rid ourselves of that by simply automatically skipping those parts of the video. For this we will need some files and we'll need to move those files to the right directories, followed by deleting the temporary directory we made to do this.
```bash
git clone https://github.com/po5/mpv_sponsorblock.git ~/temp
```

```bash
mv $HOME/temp/sponsorblock_shared $HOME/.config/newsboat/scripts/ &&
mv $HOME/temp/sponsorblock.lua $HOME/.config/newsboat/scripts/
```

```bash
rm -rf $HOME/temp
```

## Conclusion
It's now time to enjoy distraction free, ad free, sponsored content free videos from the creators you enjoy. Launch Newsboat, wait for the RSS feeds to load, select what you want to see and watch!

***If you enjoy the content made by content creators on YouTube, please support them in another way, like joining their [Patreon](https://www.patreon.com/).***
