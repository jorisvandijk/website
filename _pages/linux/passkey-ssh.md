---
layout: default
title: SSH keys
has_children: false
parent: Linux
---
# Connect to SSH using keys instead of password

An RSA keypair will be created using the following commands. This will allow for connecting to a server from your machine without using a password.

The following commands need to be run from the client machine, not on the server.

```bash
ssh-keygen
```

Press enter on all questions, though saving SSH keys without a passphrase to encrypt them is bad practice.

Next we'll need to push the newly generated key to the server.

```bash
ssh-copy-id server-user-name@hostname
```

After logging in once more, you can close the connection and when you connect again, no password will be needed.
