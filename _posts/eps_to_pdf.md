---
layout: post
title: Use .eps with tex
published: true
date: 2025-02-06
categories: [Resource]
tags: [tips]
---


On MacOS, it is so difficult to make TexStudio, TeXShop to compile .eps files.

Normally, you just need to add `--shell-escape` to Commands and `\usepackage{epstopdf}` to the preamble.
The package should be able to create separated `.pdf` files from the original `.eps`.
However, this does not work on my machine.

Here is how I did it.

Step 1: Download `ghostscript` (which should include `ps2pdf`)

`brew install ghostscript`

Step 2: Create a shell script that automatically search for all `.eps` files and convert them to `.pdf` 

```
#!/bin/bash
for file in *.eps; do
  base="${file%.eps}"
  ps2pdf -dEPSCrop "$file" "${base}-eps-converted-to.pdf"
done
```

save it as `convert_eps.sh`

Step 3: Copy the script in the root folder (containing all the `.eps` files). Open Terminal, make the script executable and run it.

Right-click the folder, Services > New Terminal at Folder

Run (once)

```
chmod +x convert_eps.sh
```

Then run

```
./convert_eps.sh
```

If you succeed, you should see a bunch of `.pdf` files newly created.

Step 4: Add the following 2 lines to the preamble of the `.tex`  

```
\usepackage{graphicx}
\usepackage{epstopdf}
```

Make sure that `graphicx` is loaded before `epstopdf`.

When you includegraphics the `eps`, do not type the extension `.eps`, for example

```
\begin{figure}[ht]
	\centering
	\includegraphics[width=\linewidth]{figs/model2_IRF_e}
\end{figure}
```

There is no need to add the `--shell-escape` option either.
