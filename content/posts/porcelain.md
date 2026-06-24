---
title: "Porcelain"
date: 2026-06-25T00:39:30+02:00
author: "Joris"
draft: false
tags: ["zsh", "git", "terminal"]
showtoc: false 
---

A little indicator on my prompt tells me the state of the git repo I'm in, if I'm in one. It's quite minimal. Green tick: repo is clean; yellow cross: there are changes; red dot: there are merge conflicts. It's a nice visual cue and for the longest time and the following code in my _~/.zshrc_ file made it possible.

```zsh
git_status_prompt() {
  git rev-parse --git-dir >/dev/null 2>&1 || return
  if git diff --name-only --diff-filter=U 2>/dev/null | grep -q .; then
    echo " %F{red}●%f"
  elif git status --porcelain 2>/dev/null | grep -q .; then
    echo " %F{yellow}✘%f"
  else
    echo " %F{green}✓%f"
  fi
}
```

This works fine. It does what it's supposed to... It's ugly though. 

Time to take a long hard look at this function. There's an if-else with three branches and I don't much like an if-else past two. A `case` is better for that. I'm also grepping twice there. That's two calls to an outside program, which `case` can do itself - and it's even a shell built-in. Then I realised the worst part... Am I really calling git three times in here? Hang on. Three times for every prompt inside a git repo? That's bonkers!

There must be a better way to tackle this. Isn't there a way to call git once and derive the information I need from that one call? There is. It's even _in_ the function already! The `git status --porcelain` on its own basically has all the information I need. It returns line-separated file with a two-letter code in front of them, denoting the status of that one file. There's no output if there are no changes. That solves the green tick. The red dot could be gotten from the letter code. A little google later and `DD`, `AU`, `UD`, `UA`, `DU`, `AA`, and `UU` are the codes that denote merge conflicts. That means that the yellow cross is also checked, as that's all other possible outputs. That makes the following my new git function. 

```zsh
git_status_prompt() {
  local st
  st=$(git status --porcelain 2>/dev/null) || return
  case $st in
    ('')                                echo " %F{green}✓%f" ;;
    ((|*$'\n')(DD|AU|UD|UA|DU|AA|UU)*)  echo " %F{red}●%f" ;;
    (*)                                 echo " %F{yellow}✘%f" ;;
  esac
}
```

A few things worth pointing out:

- `git status --porcelain` is git’s machine-readable output. The format is fixed and won’t change between git versions, so it’s safe to match against.
- `|| return` covers being outside a repo. There `git status` fails, the function returns nothing, and the indicator isn’t printed. That alone replaces the old `rev-parse` guard from the top of the function.
- The `case` checks three things in order. Empty output is a clean repo, green tick. A conflict code means a merge is in progress, red dot. Anything else means there are changes, yellow cross.
- The check that looks the most impressive, `((|*$'\n')(DD|AU|UD|UA|DU|AA|UU)*)`, is not as hard as it appears. `(|*$'\n')` matches the start of a line: either the very beginning of the output, or anything ending in a newline. `(DD|AU|UD|UA|DU|AA|UU)` are the codes I found and `*` matches the rest. `case` compares against the whole string, so without it the pattern would only match if the entire output were exactly two characters long.

## Adding to prompt

The function hands back a string, so it slots into a prompt with `PROMPT_SUBST` turned on:

```zsh
setopt PROMPT_SUBST
PROMPT='
%F{green}┌──(%f%F{135}%~%F{green})%f$(git_status_prompt)
%F{green}└─%f%(?,%F{135}λ%f,%F{red}✘%f) '
```

The box-drawing and the colors are mine, swap those for whatever you like. The part that matters is the `$(git_status_prompt)` in the middle. 

![Prompt](/img/prompt.png#center)

And that's what it looks like on my system. You'll have to try the function to see the other two indicators.
