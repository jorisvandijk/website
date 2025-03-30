---
layout: default
title: UserChrome
has_children: false
parent: Firefox
---

# userChrome.css
I use [Firefox](https://www.mozilla.org/en-US/firefox/new/) as my main web browser. I have been for decades. The only thing I really dislike about it is the total amount of space the UI takes up. 

[![Previous website](/assets/img/firefoxUI_thumb.png)](/assets/img/firefoxUI.png)\
*Representation of stock Firefox. Image property of Mozilla*

I don't care much for tabs, so I don't need an entire row for them. Usually I have one or two tabs open at a time, up to a maximum of six in rare occasions. Another bit of lost screen real-estate is the enormous URL/search bar. Mozilla even recognizes this and adds empty space next to both sides of the bar by default to not make it as big.

There is also a refresh button I'll never touch (due to *F5* existing); a Pocket icon, which I don't use and it also features a hamburger menu I never want to navigate (as I can get to settings by either pressing *Alt* to bring up the entire menu bar or by pressing *Ctrl+Shift+A*, and then clicking **Firefox Settings** at the bottom left). 

## Using userChrome.css
I like a clean experience, so for years I used a custom `userChrome.css` file. This file makes it possible to edit, move or remove certain elements of the Firefox UI. For a long while I used a `userChrome.css` file I made myself, which was an assortment of bits of CSS code I found online, which I edited to suit my needs. This worked fine, but not perfectly, so I went and started to search for a better solution.

## My Firefox

[![Previous website](/assets/img/myFirefox_thumb.png)](/assets/img/myFirefox.png)\
*"My" Firefox*


After some searching I found [LR Tech's OnelineProton](https://github.com/lr-tech/OnelineProton/), which offers an easy to customize, one-line Firefox `useChrome.css` file. I copied it and edited it so that it's exactly how I want it.

## Installing 
The process of installing a `userChrome.css` file is quite easy, just follow the steps below (which LR kindly provided) and you'll too have an awesome Firefox experience!

1. In the search bar, type **about:config**. A dialog will be shown to you. Press the *I accept the risk* button.
2. Search for **toolkit.legacyUserProfileCustomizations.stylesheets** and change it to *True*.
3. Go to your Firefox profile:
    In the search bar, type **about:support** and press Enter.
    Search for Profile Directory and click on *Open Directory button*.
4. Create a folder and name it **chrome** (all lowercase).
5. Paste `userChrome.css` file into the folder.
6. Restart Firefox
7. Enjoy your new Firefox!

## My userChrome.css
```css 
/* /* Title bar */ */
.titlebar-buttonbox {
    display: none !important;
}

#alltabs-button {
    display: none !important;
}

.titlebar-spacer {
    display: none !important;
}

/* Tab bar */
#navigator-toolbox {
    border: 0px !important;
    height: 45px !important;
}

#TabsToolbar {
    margin-left: 20vw !important;
    height: 20px !important;
}


/* Nav bar */
#nav-bar {
    background: transparent !important; /* Set your desired color */
    margin-right: 80vw !important;
    margin-top: -44px !important;
    border: none !important;
    padding-left: 0 !important;
}

#urlbar-input {
    height: 40px !important;
    font-size: 16px !important;
}

#tracking-protection-icon-container {
    display: none !important;
}

#urlbar-container {
    width: auto !important;
    margin-left: 0 !important;
    padding-left: 0 !important;
}

#urlbar {
    background: transparent !important; /* Match the nav bar color */
    border: none !important;
    box-shadow: none !important;
    margin-left: 0 !important;
}

#page-action-buttons {
    display: none !important;
}

#PanelUI-button {
    display: none !important;
}

#urlbar-background {
    border: none !important;
    box-shadow: none !important;
    margin-left: 0 !important;
    background: transparent !important; /* Match the nav bar color */
}

/* Hide Back button */
#back-button { 
    display: none !important; 
}

/* Hide Forward button */
#forward-button { 
    display: none !important; 
}

/* Hide the URL bar dropdown */
#urlbar-popup {
    display: none !important;
}

/* Hide the URL bar dropdown suggestions */
#urlbar-results {
    display: none !important;
}

/* Hide Permissions Icon */
#permission-panel {
    display: none !important;
}

/* Hide DRM Icon */
#drm-icon {
    display: none !important;
}

/* Hide Permissions/DRM Notice */
#notification-popup {
    display: none !important;
}
```
Up to date version can be found in my [dotfiles](/#dotfiles).
