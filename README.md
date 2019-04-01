<h1>Important!</h1>
<ol><li>There are large data files in the project. To work with these files you should download
 Git Large File Storage (https://git-lfs.github.com/) and install it with
 
```
git lfs install
```

To load the files locally, use

```
git lfs pull
```

You can see all the files that are tracked by Git LFS in `.gitattributes` file. If you need to start tracking another files, use

```
git lfs track <fileName pattern>
```

In case you have accidentally committed untracked large file and receive errors while pushing, use

```
git filter-branch --index-filter "git rm --cached --ignore-unmatch PATH_TO_YOUR_FILE" --tag-name-filter cat -- --all
```

to remove the file from commit.

</li>
<li>To name the CSS classes, we use BEM methodology with <code>__</code> separator for element and <code>_</code> separator for modifier:
 <code>.Block__element_modifier</code>
</li>
<li>
We use <a href="https://storybook.js.org/">Storybook</a> for developing the UI components. If you want to see our storybook, run 
```
npm run storybook 
```
in the terminal.
</li>
<li>
Gh-pages link just for testing (from lviv-data branch):
 <a href="https://yarynakorduba.github.io/public-transport-networks/">
 https://yarynakorduba.github.io/public-transport-networks/</a>
</li>
</ol>
