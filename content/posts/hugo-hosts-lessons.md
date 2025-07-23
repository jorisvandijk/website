---
title: "Hugo, hosts, and hard lessons"
date: 2025-07-22T16:13:47+02:00
author: "Joris"
draft: false
tags: ["hugo", "git", "personal"]
cover:
  image: "/img/datacenter.png"
  alt: "A datacenter"
---

# Hugo
As I wrote in my [Hello World](/posts/hello-world/) post, I have switched to Hugo. And so far, I am loving it. It's fast, it works great and I have not had to hack together solutions for things I wanted the site to do, but that were not included in the platform _(looking at you, Eleventy!)_. I like how the backend of it works and I like the way you make new posts or run the site locally for testing. I like how you can use a pre-built theme, but then override it so you can make it your own, without having to touch the actual theme files - this also makes updating the theme later possible.

Hugo is awesome.

# Hosting
It's also amazingly simple to host on sites that offer a _Pages_ functionality, like _GitHub Pages_, which most people will know. I'll spare you the exact inner workings of this functionality. In short, first the user has to create a git repository on the providers platform. Next the user has to enable the _Pages_ functionality within the provider's online UI and this will work differently depending on the provider. Then when the user pushes changes to their git, the provider will automagically _run some magic_ and the user's repository will be built and hosted - ready to be visited by guests through their browser. That is, if you've set up a _build file_, which is a simple YAML file telling the 'engine' behind the _Pages_ functionality how to build your site. (The term _build file_ is not technically correct and each provider has a different name for this file, but let's just go with it, ok?)

Obviously this is not all that goes into this, but this is not a tutorial on how to set this up. 

At any rate, I decided to use _GitHub Pages_.

## GitHub
Setting this up on GitHub was pretty easy. Their UI is simple and it is clear which actions one has to take in order to set up _Pages_. How to set up a custom domain, however, is not that clear, even though they have documentation on how to do it. I've found it slightly confusing, but got it set up eventually.

At first all was well. The site would build without issue and be served on my domain. Yay. 

Unfortunately, after a couple of days working on the site, I discovered that even a tiny issue, like having one too many backticks in a single post on the blog, would make the site unreachable. It would build just fine, but on visiting the domain, I'd be greeted with a 404 page. A GitHub 404 page rather than one from my own site. The most frustrating thing about this was that there would be no log anywhere explain why the site would not load. The only thing I could do was to go through my latest commit, line by line, and find the problem that way. This was super tedious and considering that I was still playing around with the inner workings of the site, not just posting blogs, I'd run into this issue more times than I'd care to recall. Annoyingly though, when running the site locally during testing _before_ I'd push to GitHub, I'd have no issues. The site would work fine. Push to GitHub and the site wouldn't load.

After so many times, I got sick of this and decided, well - I am already mirroring the repository to GitLab (as well as to Codeberg - you can never have too many backups), I'll just move my hosting away from GitHub and to GitLab.

## GitLab
Gitlab pages offers a four step process for setting up their version of _Pages_, which eventually will result in the generation of a `.gitlab-ci.yml` file, which is their name for the _build file_. I personally didn't go through this and just reused the _build file_ I had written for GitHub, renamed it to `.gitlab-ci.yml` and placed it in the root of my repository. After a push the automatic building of the site started. It failed on the first run though, due to compatibility issues between the way GitHub and GitLab do things. So, I rewrote it to fit with GitLab's way of doing things and the build went through without a hitch.

I've spent a couple of days on GitLab without any issues. I happily played with the inner workings of my site and GitLab accepted my commits and generated the site. I was happy with this, even though the load times were not stellar. At least a simple issue didn't break the entire site now. I decided to stick with GitLab. That is, until this morning.

When I got up, had a coffee and decided to write this post on how I was enjoying the new site, I was greeted by this:

![The connection has timed out](/img/time-out.png)

"Erm, what now?"

This was an odd one. I could visit the site from my mobile phone just fine, but not from my laptop, or my wife's laptop. It took me a couple of hours of research and testing to finally get what was going on. Turns out, my IP address was likely being either throttled or firewalled by GitLab (or by the Google CDN they use). My own website probably thought I was a bot! What's worse, there was nothing I could do about it. I had no control over the backend, and all I could do was wait it out. I guess I had made too many visits to my own site and I got flagged as a bot. This is ridiculous. This could happen again. I don't care for this to happen again. Damn it, I am going to have to move providers again.

## Cloudflare
This time I didn't just go with what I knew, I did actual research into where to host. Cloudflare offers _almost_ the same functionality as a _Pages_ host, but it's even better. Cloudflare won't host your git, but it can pull from an external git provider. Currently they offer GitHub and GitLab. How this works is they will watch for changes in the repository, and when they detect them, it will trigger a rebuild of your site on their systems, hosting an updated version that mirrors the changes in your repository, ready to be visited.

A custom domain can be added as well, and in a superior manner compared to GitHub or GitLab _Pages_, because Cloudflare also functions as a full DNS provider, allowing complete control over DNS records. This meant switching over the DNS for Jorisvandijk.com on my domain name host to the DNS from Cloudflare. Doing so comes with additional perks, like performance optimizations, security features and analytics. I can now also have bot protection that _I_ control. And I can see the visitor numbers, without having to host an external solution like _Umami_ or _Google Analytics_.

{{< info >}}
This site does not track individual visitors, it just creates an overview of which country a visit came from and which pages got visited. No personal data is collected!
{{< /info >}}

One more thing to note is that websites hosted on Cloudflare are fast. Very fast. Load times blow both git providers out of the water. The build process is also really snappy.

So, although time will tell, and I hesitate to say this given past experience, perhaps Cloudflare will work out for me.

# Conclusion
Hugo - great. Pages - bad. Let's all hope Cloudflare will stick, as I really don't want to spend more time on hosting. I just want to play with my site and blog away. I look forward to many happy posts using Hugo.

📷 _Original cover photo by [Taylor Vick](https://unsplash.com/photos/cable-network-M5tzZtFCOfs) on [Unsplash](https://unsplash.com)._
