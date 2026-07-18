---
title: "Barless"
date: 2026-07-17T23:53:12+02:00
author: "Joris"
draft: false
tags: ["linux", "script"] 
---

A bar is used on a Linux Window Manager to display information like the date, time, volume information and maybe most importantly, on which desktop you are. Most people add way more to their bar, like CPU usage, memory usage, system temperature, hard drive space usage, connection state and many many more. It's also a part of the look of your desktop which you're supposed to rice, screenshot and put on [/r/unixporn](https://www.reddit.com/r/unixporn/).

I don't use a bar. I used to, as that was the thing people did, but it annoyed me to lose a line of screen real estate which is just sitting there, hardly getting looked at. Only when I wanted to know the time, I'd look at my bar. Hence the bar went the way of the Dodo and I used my wristwatch for the time... for a while at least. I have to admit, being able to display the time on-screen is worth something, but having it always there is pointless. So I wrote a script. A simple script which took the time from the "date" command and displayed that on the screen through a notification. Pressing a keybinding showed the time.

As with bar-people I ended up adding more and more information to my notification, mainly because I could. I now have a pretty extensive script that will show all sorts of information on key press. 

```bash
#!/usr/bin/env bash
#	Info 3.0
#	Shows time, date, workspace, battery and volume in a notification.
#	Dependencies: libnotify, jq, i3, pamixer, nerdfonts
#
#	By Joris van Dijk | Jorisvandijk.com
#	Licensed under the MIT license

NOTIFY_TITLE='System Info'
NOTIFY_TIMEOUT=5000
BATTERY='/sys/class/power_supply/BAT0'

ICON_CLOCK=''
ICON_CALENDAR=''
ICON_WORKSPACE=''
ICON_BATTERY_CHARGING='󰂄'
ICON_VOLUME_MUTED='󰝟'

BATTERY_ICONS=(
    "96:󰁹"
    "80:󰂂"
    "60:󰂀"
    "40:󰁾"
    "20:󰁼"
    "0:󰁺"
)

VOLUME_ICONS=(
    "67:󰕾"
    "34:󰖀"
    "0:󰕿"
)

icon_for_level() {
    local level="$1"; shift
    local entry

    for entry in "$@"; do
        if (( level >= ${entry%%:*} )); then
            printf '%s' "${entry#*:}"
            return
        fi
    done
}

clock() {
    printf '%s %s' "$ICON_CLOCK" "$(date '+%H:%M')"
}

today() {
    printf '%s %s' "$ICON_CALENDAR" "$(date '+%A %-d/%-m/%Y')"
}

workspace() {
    local name="$(i3-msg -t get_workspaces | jq --raw-output '.[] | select(.focused).name')"

    printf '%s %s' "$ICON_WORKSPACE" "$name"
}

battery() {
    local status="$(<"$BATTERY/status")"
    local capacity="$(<"$BATTERY/capacity")"
    local icon="$(icon_for_level "$capacity" "${BATTERY_ICONS[@]}")"

    if [[ $status == 'Charging' || $status == 'Unknown' ]]; then
        icon="$ICON_BATTERY_CHARGING"
    fi

    printf '%s %s%%' "$icon" "$capacity"
}

volume() {
    local level="$(pamixer --get-volume)"
    local icon="$(icon_for_level "$level" "${VOLUME_ICONS[@]}")"

    if [[ $(pamixer --get-mute) == 'true' || $level -eq 0 ]]; then
        icon="$ICON_VOLUME_MUTED"
    fi

    printf '%s %s%%' "$icon" "$level"
}

main() {
    local modules=(
        clock
        today
        workspace
        battery
        volume
    )
    local module
    local lines=()

    for module in "${modules[@]}"; do
        lines+=("$("$module")")
    done

    notify-send --urgency=normal --expire-time="$NOTIFY_TIMEOUT" \
        "$NOTIFY_TITLE" "$(printf '%s\n' "${lines[@]}")"
}

main "$@"
```

{{< note >}}
This post was made on the previous iteration of this website on the 19th of October 2022 when I ran the i3 window manager. The script is a rewrite of the original.
{{< /note >}}
