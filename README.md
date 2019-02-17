To store large datafiles use Git Large File Storage (https://git-lfs.github.com/):

1. <a href="https://git-lfs.github.com/">Download</a> from the site

2. Install command line extension >git lfs install

3. Add the file extensions you would like to track, e.g. >git lfs track "*.json"

4. Add .gitattributes >git add .gitattributes

5. Commit and push as you normally would

6. When pulling the project, use >git lfs pull to fetch all the lfs tracked files

