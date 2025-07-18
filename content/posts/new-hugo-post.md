---
title: "Making a new post in Hugo"
date: 2025-07-18T15:41:03+02:00
author: "Joris"
draft: false
tags: ["hugo", "tutorial"]
cover:
  image: "/img/new-post.png"
  alt: ""
---

According to the [Hugo Quick Start](https://gohugo.io/getting-started/quick-start/) documentation, the right way to start a new post is by issuing the following command in a terminal: `hugo new content content/posts/my-post-name.md`. This works fine and yields a new Hugo post with basic _frontmatter_. I've found issuing `hugo new posts/my-new-post.md` works fine as well. It's shorter, so I prefer it. This is not the point however. The point is the _frontmatter_. This is a few lines of text above the content of the Markdown file you've created by a `hugo new` command. The Quick Start shows the following as an example of front matter that it generates:

```yaml
+++
title = 'My First Post'
date = 2024-01-14T07:07:07+01:00
draft = true
+++
```

As can be seen, three fields are created, namely: `title`, `date` and `draft`. The first two speak for themselves. The latter is set to `false` when it is time to post this post. This is all the front matter you get by default. So where's the author's name? Or how about some tags? I'd also like to add some cover image, maybe even toggle the table of contents on or off. So what is a blogger to do? Just type that stuff by hand each and every time?

Hell no. It is time to set up [Archetypes](https://gohugo.io/content-management/archetypes/). The idea is simple - a new default _template_ for a post will be made and all the front matter deemed needed is added there.

First a new directory is to be added to the root of the project directory.
 
```bash
mkdir -p archetypes
```

Next a file named `default.md` should be added in this directory.

```bash
touch archetypes/default.md
```

Then in this file the front matter can be set for any _post_.  The example front matter as shown in the Quick Start is in _toml_, I prefer _yaml_ so the following example is in _yaml_. This is just a personal preference. Feel free to use _toml_ if you'd like. Anyway, this is what my `default.md` currently looks like.

```yaml
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
author: "Joris"
draft: true
tags: []
cover:
  image: "/img/add-image-name-here.png"
  alt: "This is the image's alt text"
---
```

The `title` and `date` will be autofilled if left like this, that is probably what you'd want. Added are the `tags` and `cover` options. Many more options are available to you as can be found in the Hugo Quick Start, under [Frontmatter](https://gohugo.io/content-management/front-matter/). After the `default.md` file is saved, starting a new post with `hugo new posts/my-new-post.md` will give you a brand new post, which includes all the frontmatter you added.

_Cover photo by [Kelly Sikkema](https://unsplash.com/photos/a-woman-holding-a-cup-of-coffee-next-to-a-notepad--YP-I0r2mk0)._
