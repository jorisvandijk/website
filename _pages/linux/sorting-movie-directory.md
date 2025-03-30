---
layout: default
title: Sorting movie directory
has_children: false
parent: Linux
last_modified_date: 2025-03-30
---

# Sorting your movie directory

![Movie](/assets/img/movie.png)\
[Image by iconixar - Flaticon](https://www.flaticon.com/free-icons/google-play-movie)


So say you have this directory filled with directories containing movies you legally ripped from your own collection of DVDs and BluRays. Each directory has a movie in it, along with other unnecessary files you may have accidentally added.This will not do. Let's clean up this mess.

Make a new directory (outside of the directory containing the mess) to store the stuff to keep in.

`mkdir ~/Movies`

Go to the directory holding the mess.

`cd <directory>`

Run the following command that will go through all the directories in the current directory and it'll move all the files ending with .mkv, .mp4 and .avi to the newly made *Movies* directory.

`find . -type f -regex '.*\.\(mkv\|mp4\|avi\)' -exec mv {} ~/Movies \;` 

At this point I'd remove all stuff that tends to show up in these kinds of directories and remove them.

`find . -type f -iregex '.*\.\(jpg\|png\|nfo\|sub\|srt\|idx\|exe\|txt\|rar\|smi\)' -exec rm {} \;`

Next I'd check to see if anything got left behind by deleting all empty directories.

`find . -empty -type d -delete`

And finally I'd manually go through the leftover directories (if any) and see if there's something that needs to be saved that the commands above did not find.

