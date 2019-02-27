<h1>Important!</h1>
1. There are large data files in the project. To work with these files you should download
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

2. To name the CSS classes, we use BEM methodology with `__` separator for element and `_` separator for modifier:
 `.Block__element_modifier`
