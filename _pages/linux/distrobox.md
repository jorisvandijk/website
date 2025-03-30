---
layout: default
title: Distrobox
has_children: false
parent: Linux
last_modified_date: 2025-03-30
---

# Distrobox

- sudo pacman -S podman distrobox
- sudo systemctl enable podman
- sudo systemctl start podman
- sysctl kernel.unprivileged_userns_clone
- sudo usermod --add-subuids 100000-165535 --add-subgids 100000-165535 $USER
- podman info | grep -i overlay
- sudo pacman -S slirp4netns
- podman info --debug
- podman pull docker.io/kalilinux/kali-rolling:latest
- distrobox-create --name kali --image docker.io/kalilinux/kali-rolling:latest --root
- distrobox enter --root kali
- sudo apt -y install kali-linux-headless kali-linux-large
