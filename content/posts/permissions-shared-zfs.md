---
title: "Permissions on shared ZFS dataset"
date: 2026-02-24T17:30:41+01:00
author: "Joris"
draft: false
tags: ["proxmox", "server"] 
---

I have a ZFS dataset named _data_, mounted at _/data_, which I bind-mount into my LXC containers. The dataset is a three drive set with a lot of storage space. Basically, this huge pool of gigabytes is shared by all LXC containers that need to store serious amounts of data. Think _Immich_, for photo storage, or _Jellyfin_ and all the movies, series and music it has to be able to play. As you may imagine, having several different LXCs write to the same "drive" may cause permission issues. 

What I want is that all files and directories created on this dataset are readable, editable and executable to all users of the space. So far I've mainly _chown_-ed whenever I ran into an issue, but a more sustainable long term solution was needed.

## ACL

Access Control Lists, or ACLs, extend Linux's basic permission system. Normally you have three categories to work with: owner, group, and others. That's fine for simple setups, but falls apart when multiple services need access to the same files. ACLs let you set permissions for any number of users or groups. More importantly, they support *default ACLs* which are rules new files and directories automatically inherit when created inside a given directory. Set it once, forget about it. On ZFS you do need to explicitly enable ACL support on the dataset first, since ZFS does its own thing under the hood.

## Install and setup

The process is pretty straight forward. First install the program:

```bash
apt install acl
```

Next, as this is a ZFS dataset, we'll enable support for ACL:

```bash
zfs set acltype=posixacl data && zfs set xattr=sa data
```

We'll now set the defaults we want to _/data_'s existing files. Depending on how large the amount of data is, this might take some time. Be patient, grab a cup of coffee.

```bash
setfacl -Rm u::rwx,g::rwx,o::rwx /data
```

And we'll make sure any future files will also inherit these defaults:

```bash
setfacl -Rm u::rwx,g::rwx,o::rwx /data.
```



## Validating

To make sure all is well, we'll also check it's set up right now:

```bash
getfacl /data
```

We're looking for an output like this:

```bash
root@pve:~# getfacl /data
getfacl: Removing leading '/' from absolute path names
# file: data
# owner: root
# group: root
user::rwx
group::rwx
other::rwx
default:user::rwx
default:group::rwx
default:other::rwx
```

Where  `default:user::rwx`, `default:group::rwx`, and `default:other::rwx` are what we're looking to see.

It's also a good idea to test if new files and directories will get the right permissions as well:

```bash
mkdir /data/acl-test && getfacl /data/acl-test
```

The new directory should show the same `default:` entries without having set anything manually.

If this checks out, remove the test file and we're done!

```bash
rmdir /data/acl-test
```
