---
layout: default
title: HTTP to SSH
has_children: false
parent: Git
---

# Switch Git repository from HTTPS to SSH
Sometimes you clone a repository because you just want to use whatever is in there. But you might end up contributing to that repository and you may need to access it over SSH now. You could just delete the entire local folder and grab it again using SSH, but you could also switch your HTTPS repo to an SSH one...

Let's start by checking if the repository you're looking at is indeed HTTP based:
```bash
git remote -v
```

That command should output something like:
```bash
origin https://your_server/your_user_name/your_project_name.git (fetch)
origin https://your_server/your_user_name/your_project_name.git (push)
```

Which clearly shows an HTTPS URL there. So we need to change our remote repository’s URL with:
```bash
git remote set-url origin git@your_server:your_user_name/your_project_name.git
```

Then run git remote -v once more to verify that the remote repository’s URL has changed:
```bash
origin git@your_server:your_user_name/your_project_name.git (fetch)
origin git@your_server:your_user_name/your_project_name.git (push)
```

Great. We're done, Git will use SSH, instead of HTTPS to synchronize that local repository with its remote equivalent.
