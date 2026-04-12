---
title: "Rsync"
date: 2026-04-12T17:04:44+02:00
author: "Joris"
draft: false
tags: ["terminal", "quickie"] 
---
Rsync is an amazing utility to copy (or sync) _stuff_ from one place to another without having to worry about the command getting cut. With a plain _cp_, an interrupted transfer means starting over from scratch. Rsync compares source and destination, skipping files that are already there, and with `--partial` it can even resume a file that was only halfway through. It can also remember ownership and permissions, and even copy over _ssh_. That is, with the right flags, which I can never remember. Hence this post.

## My favorite 
For local copying I like to use:

```bash
rsync -avh --info=progress2 --partial [source] [destination]
```

Flags used are:
- `a`: Archive mode (recursive, preserves permissions, timestamps, symlinks, etc.)
- `v`: Verbose (gimme all the output)
- `h`: Human-readable sizes (because 1,073,741,824 bytes is not helpful)
- `--info=progress2`: Shows overall progress (including number of files, percentage done, etc.)
- `--partial`: resumes interrupted transfers

## To server
Copying files to my server, I'd use:

```bash
rsync -avh --info=progress2 --partial ~/Photos/ joris@192.168.1.5:/data/photos/ 
```

So basically the same flags, but this time I am moving my photos to my server over _ssh_. Good to note is the trailing slash. `Photos/` copies the contents, `Photos` copies the directory itself.

## From server
And grabbing files from my server is pretty much the same, but reversed:

```bash
rsync -avh --info=progress2 --partial joris@192.168.1.5:/logs/ ~/Server_logs/
```

And now my server logs are saved locally.

## Other interesting options
- `--delete`: Mirror mode, which removes files at the destination that no longer exist at the source
- `-e "ssh -p 2222"`: Use a custom SSH port
- `--remove-source-files`: Move instead of copy so it removes source files after successful transfer (this does leave empty directories behind)
- `-n`/`--dry-run`: Simulate the transfer without touching anything (especially when running `--delete`)
