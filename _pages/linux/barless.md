---
layout: default
title: Barless
has_children: false
parent: Linux
---

# Barless

![[Info](/assets/img/bar_thumb.png)](/assets/img/bar.png)

A bar is used on a Linux Window Manager to display information like the date, time, volume information and maybe most importantly, on which desktop you are. Most people add way more to their bar, like CPU usage, memory usage, system temperature, hard drive space usage, connection state and many many more. It's also a part of the look of your desktop which you're supposed to **rice**, screenshot and put on [/r/unixporn](https://www.reddit.com/r/unixporn/). 

I don't use a bar. I used to, as that was the thing people did, but it annoyed me to lose a line of screen real estate which is just sitting there, hardly getting looked at. Only when I wanted to know the time, I'd look at my bar. Hence the bar went the way of the Dodo and I used my wristwatch for the time... for a while at least. I have to admit, being able to display the time on-screen is worth something, but having it always there is pointless. So I wrote a script. A simple script which took the time from the "date" command and displayed that on the screen through a notification. Pressing a keybinding showed the time.

As with bar-people I ended up adding more and more information to my notification, mainly because I could. I now have a pretty extensive script that will show all sorts of information on key press. The way it looks on my system can be seen in the top right of the screenshot above. 

Adding and removing things to be displayed is easy by commenting out lines in the script. I figured others might like to try switching away from the bar and this could be useful.

## Note
The script in this state is a little messy, due to the fact that I have written it for a laptop with a single battery, but found I also needed it for a laptop with two batteries. It serves as an example, not a copy-paste solution.


```bash
#!/usr/bin/env bash

#	Info 2.4
#	Shows time, date and battery information in a notification.
#	Dependencies: acpi, libnotify, jq, BSPWM, font-awesome, pamixer
#
#	By Joris van Dijk | Jorisvandijk.com 
#	Licensed under the GNU General Public License v3.0

# For single battery laptops
# battery() {
# 	batstat="$(cat /sys/class/power_supply/BAT1/status)"
# 	battery="$(cat /sys/class/power_supply/BAT1/capacity)"
# 	
#     if [[ $batstat = 'Unknown' ]] || [[ $batstat = 'Charging' ]]; then
#     	icon=""
#     elif [[ $battery -ge 5 ]] && [[ $battery -le 19 ]]; then
#     	icon=""
#     elif [[ $battery -ge 20 ]] && [[ $battery -le 39 ]]; then
#     	icon=""
#     elif [[ $battery -ge 40 ]] && [[ $battery -le 59 ]]; then
#     	icon=""
#     elif [[ $battery -ge 60 ]] && [[ $battery -le 79 ]]; then
#     	icon=""
#     elif [[ $battery -ge 80 ]] && [[ $battery -le 95 ]]; then
#     	icon=""
#     elif [[ $battery -ge 96 ]] && [[ $battery -le 100 ]]; then
#     	icon=""
#     fi
# 
# 	echo $icon $battery"%"
# }

# For dual battery laptops
battery() {
    # Get the status and capacity of both batteries
    batstat0="$(cat /sys/class/power_supply/BAT0/status)"
    batstat1="$(cat /sys/class/power_supply/BAT1/status)"
    
    battery0="$(cat /sys/class/power_supply/BAT0/capacity)"
    battery1="$(cat /sys/class/power_supply/BAT1/capacity)"
    
    capacity0=1644  # Last full capacity of BAT0 (mAh)
    capacity1=1623  # Last full capacity of BAT1 (mAh)

    # Calculate remaining mAh for each battery
    remaining0=$(( (battery0 * capacity0) / 100 ))
    remaining1=$(( (battery1 * capacity1) / 100 ))

    # Calculate total remaining energy and total capacity
    total_remaining=$((remaining0 + remaining1))
    total_capacity=$((capacity0 + capacity1))

    # Calculate combined battery percentage
    combined_percentage=$(( 100 * total_remaining / total_capacity ))

    # Determine the charging status
    if [[ $batstat0 == 'Unknown' ]] || [[ $batstat0 == 'Charging' ]] || \
       [[ $batstat1 == 'Unknown' ]] || [[ $batstat1 == 'Charging' ]]; then
        icon=""
    elif [[ $combined_percentage -ge 5 ]] && [[ $combined_percentage -le 19 ]]; then
        icon=""
    elif [[ $combined_percentage -ge 20 ]] && [[ $combined_percentage -le 39 ]]; then
        icon=""
    elif [[ $combined_percentage -ge 40 ]] && [[ $combined_percentage -le 59 ]]; then
        icon=""
    elif [[ $combined_percentage -ge 60 ]] && [[ $combined_percentage -le 79 ]]; then
        icon=""
    elif [[ $combined_percentage -ge 80 ]] && [[ $combined_percentage -le 95 ]]; then
        icon=""
    elif [[ $combined_percentage -ge 96 ]] && [[ $combined_percentage -le 100 ]]; then
        icon=""
    fi

    echo $icon $combined_percentage"%"
}

datetime() {
	if [[ $1 = 'd' ]]; then
		icon=""
		info="$(date "+%A %-d/%-m/%Y")"
	elif [[ $1 = 't' ]]; then
		icon=""
		info="$(date "+%H:%M")"
	else
		icon=""
		info="Incorrect or missing flag"
	fi

	echo $icon $info	
}

volume () {
	vol="$(pamixer --get-volume)"
	
	if [[ $(pamixer --get-mute) == "true" ]]; then
		icon=""
	elif [[ $vol -ge 0 ]] && [[ $vol -le 33 ]]; then
	    # icon=""
	elif [[ $vol -ge 34 ]] && [[ $vol -le 66 ]]; then
	    # icon=""
	else
		icon=""
	fi

	echo $icon $vol
}

workspace() {
	icon=" "
	ws=$(bspc query -D -d focused --names)

	echo $icon $ws
}

vpn() {
	pid=$(pidof openconnect)
	if [[ $pid ]]; then 
		icon=""
		VPN="VPN connected"

		echo $icon $VPN
	else 
		echo " "
	fi	
}

bluetooth_battery() {

	mac="1C:52:16:3C:35:AC"
	
	icon=''
	
	name=$(bluetoothctl info $mac| grep 'Name:' | cut -d\   -f2)
	bat=$(bluetoothctl info $mac| grep Battery | grep -oP '\(\K[^\)]+')

	if [[ $bat == '' ]]; then
		echo ""
	else	
		echo $icon $name $bat%
	fi
}

brightness() {
    current_brightness=$(brightnessctl g)
    max_brightness=$(brightnessctl m)
    brightness_percentage=$((current_brightness * 100 / max_brightness))

    if [[ $brightness_percentage -le 20 ]]; then
        icon="" # Low brightness icon
    elif [[ $brightness_percentage -le 60 ]]; then
        icon="" # Medium brightness icon
    else
        icon="" # High brightness icon
    fi

    echo "$icon $brightness_percentage%"
}

options=( "datetime t" "datetime d" "battery" "volume" "brightness" "bluetooth_battery" "workspace")

for i in "${options[@]}"
do
   notify-send -u normal -t 5000 "$($i)"
done

```

As always, an up to date version of this script can be found in my [dotfiles](/#dotfiles). Also, any suggestions regarding the script are welcomed.
