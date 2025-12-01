---
title: "Unable to Connect to Indexer"
date: 2025-12-01T12:15:55+01:00
author: "Joris"
draft: false
tags: ["fix", "arr", "nzb"]
---
And suddenly my *Arr suite's services could no longer connect to my indexer's API, even though I could ping it without issue from my own laptop. Heck, even visiting the API in the browser showed me it was up and working. What happened? Well, I am not sure really. I did no updates or made any changes to my Proxmox server manually, I think. I for damned sure did not edit anything in Radarr, Sonarr AND Bazarr. So what's up with this?

The error I got was `Unable to connect to indexer, please check your DNS settings and ensure that IPv6 is working or disabled. Resource temporarily unavailable (api.nzbgeek.info:443).`.

Turns out, for some reason the DNS server for all of these services got set to the IP address of the server itself. It's a simple fix. Within the console of each service simply add a decent DNS server, for example: `echo "nameserver 1.1.1.1" > /etc/resolv.conf` and now it's all working again. Yay.
