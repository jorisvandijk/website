---
layout: default
title: Arr
has_children: false
parent: Server
last_modified_date: 2025-03-30
---

# Arr
Usenet is interesting and useful. Let's not get into it too much. For now, focus is on the particularly useful `arr suite`. 

## Services
The following run on the server:
- **Sonarr** for series;
- **Radarr** for movies;
- **Lidarr** for music;
- **Bazarr** for subtitles.

**Price:** _Free_

## Download client
In order to actually get content, one needs a download client. This is what connects to usenet and grabs the content. `SABnzbd` is a terrible name, but it is the one used on the server.

**Price:** _Free_

## Indexer
Unfortunately, in order for the `services` to actually search usenet, they need an _indexer_. This is a bit of paid software that will search usenet for the service looking. This server uses `NZBGeek`.

**Price:** _About 12 bucks a year_

## Usenet
So this is the main thing needed. A way to connect to the usenet. There are several providers, but this server uses `Eweka`. It should be noted, the price is based on purchasing a deal at the end of the year. They do have several other deals and there are a lot more providers out there. Another good one is `Newshosting`.

**Price:** _About 50 bucks a year_

## Subtitles
This is a requirement for me, as without subtitles, I am not allowed to ditch Netflix. Unfortunately, getting subtitles automatically will cost you as well. You could grab and add them by hand for free, but I am way too lazy for that, so an `Open Subtitles` VIP account is needed.

**Price:** _About 20 bucks a year_

## Jellyfin
I want to be able to enjoy the content on my TV, obviously. For this `Jellyfin` is the solution.

**Price:** _Free_

## Total cost
82 bucks a year. That's 7-ish bucks a month. Netflix is costing about 15 a month over here at the time of writing. So doing it yourself, while more work, does mean it's half the cost. Sure, you need to have a server and storage space, but you also own the content and it won't vanish on someone else's whim. This would have been cheaper still if the 20 for subtitles could be dropped. You're looking at a little over 5 a month then.

## Docker Compose
These services get run on the server using Docker Compose. The following is the Docker Compose file, named `docker-compose.yml`, used on the server:

```yaml
version: '3.8'

services:
  sabnzbd:
    image: linuxserver/sabnzbd
    container_name: sabnzbd
    restart: always
    user: "1000:1000"
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Amsterdam
    volumes:
      - /home/joris/sabnzbd:/config
      - /data/downloads:/downloads
      - /data/incomplete:/incomplete
      - /data/series:/series
      - /data/movies:/movies
    ports:
      - 6789:8080

  sonarr:
    image: linuxserver/sonarr
    container_name: sonarr
    restart: always
    # user: "1000:1000"
    privileged: true
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Amsterdam
    volumes:
      - /home/joris/sonarr:/config
      - /data/series:/series
      - /data/downloads:/downloads
    ports:
      - 8989:8989
    depends_on:
      - sabnzbd

  radarr:
    image: linuxserver/radarr
    container_name: radarr
    restart: always
    user: "1000:1000"
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Amsterdam
    volumes:
      - /home/joris/radarr:/config
      - /data/movies:/movies
      - /data/downloads:/downloads
    ports:
      - 7878:7878 
    depends_on:
      - sabnzbd

  bazarr:
    image: linuxserver/bazarr
    container_name: bazarr
    restart: always
    user: "1000:1000"
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Amsterdam
    volumes:
      - /home/joris/bazarr:/config
      - /data/series:/series
      - /data/movies:/movies
    ports:
      - 6767:6767 
    depends_on:
      - sonarr
      - radarr

  lidarr:
    image: linuxserver/lidarr
    container_name: lidarr
    restart: always
    #user: "1000:1000"
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Amsterdam
    volumes:
      - /home/joris/lidarr:/config
      - /data/music:/music
    ports:
      - 8686:8686
    depends_on:
      - sabnzbd
    
  jellyfin:
    image: linuxserver/jellyfin
    container_name: jellyfin
    restart: always
    #user: "1000:1000"
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Amsterdam
    volumes:
      - /home/joris/jellyfin:/config
      - /data/movies:/movies
      - /data/series:/series
      - /data/music:/music 
    ports:
      - 8096:8096  
```
Obviously timezones, volumes and user PUID/PGIS might need changing.



