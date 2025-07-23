---
title: "The best function I ever stole"
date: 2025-07-21T10:04:57+02:00
author: "Joris"
draft: false
tags: ["linux", "bash"]
cover:
  image: "/img/archive.png"
  alt: "An actual archive"
---

Extracting archives is a pain on Linux. There are just so many types and so many programs to extract each type. A `.tar.gz` file is extracted using the program [GNU tar](https://www.gnu.org/software/tar/), but for a `.zip` file, you'd need [unzip](https://infozip.sourceforge.net/UnZip.html). What's that? You've got a `.7z` file? Yeah-no, can't use either of the before mentioned extractors, you need [7-zip](https://www.7-zip.org/). Got a `.rar`, you'd need... well, you get the point.

What's more, some of these programs require _flags_ you'll need to use to actually extract an archive. For example, to extract a tar file, you might do something like `tar xvf <filename>`. For a 7z file though, it'd be `7z x <filename>`. Other extraction programs don't require flags at all though, just the name of the extraction program followed by the file to extract. This sounds simple enough, but wait... what was the name of the program to unzip `.bz2` files again? 

Considering I don't actually extract archives _that_ often, I'll never memorize all of this. So what to do? Luckily I, like many others, stumbled across a simple function I could put in my `.bashrc` file. 

```bash
 extract () {
  if [ -f $1 ] ; then
    case $1 in
      *.tar.bz2)   tar xvjf $1    ;;
      *.tar.gz)    tar xvzf $1    ;;
      *.tar.xz)    tar xvJf $1    ;;
      *.bz2)       bunzip2 $1     ;;
      *.rar)       unrar x $1     ;;
      *.gz)        gunzip $1      ;;
      *.tar)       tar xvf $1     ;;
      *.tbz2)      tar xvjf $1    ;;
      *.tgz)       tar xvzf $1    ;;
      *.zip)       unzip $1       ;;
      *.Z)         uncompress $1  ;;
      *.7z)        7z x $1        ;;
      *.xz)        unxz $1        ;;
      *.exe)       cabextract $1  ;;
      *)           echo "$1: unrecognized file compression" ;;
    esac
  else
    echo "$1 is not a valid file"
  fi
}
```

What this function does is simple. In order to extract _any_ archive, in the terminal you just issue `extract <filename>`, and the file gets extracted. Obviously **you'd also need to install the programs listed in the second column** there, for this function to work. I have found this function on the Arch forums by a user named _sausageandeggs_. You can find the original post [here](https://bbs.archlinux.org/viewtopic.php?pid=692072#p692072). 

Considering I didn't need all of those extraction methods and I wanted to shorten the `extract` command even more, I slightly altered it and mine looks like this:

```bash
function ex () {
   if [ -f $1 ] ; then
       case $1 in
           *.tar.bz2)   tar xvjf $1    ;;
           *.tar.gz)    tar xvzf $1    ;;
           *.bz2)       bunzip2 $1     ;;
           *.rar)       unrar x $1     ;;
           *.gz)        gunzip $1      ;;
           *.tar)       tar xvf $1     ;;
           *.tbz2)      tar xvjf $1    ;;
           *.tgz)       tar xvzf $1    ;;
           *.zip)       unzip $1       ;;
           *.7z)        7z x $1        ;;
           *.xz)        tar xvJf $1    ;;
           *)           echo "I don't know how to extract '$1'..." ;;
       esac
   else
       echo "$1 is not a valid file!"
   fi
}
```

So - no more remembering which program name goes with which archive, or which flags are needed to extract a specific type of archive. Just `ex <filename>` and you're done.

📷 _Original cover photo by [ubahnverleih](https://unsplash.com/photos/books-in-shelves-in-room-X_j3b4rqnlk) on [Unsplash](https://unsplash.com)._

📄 _Original code by [sausageandeggs](https://bbs.archlinux.org/viewtopic.php?pid=692072#p692072) on the [Arch Linux Forums](https://bbs.archlinux.org)._
