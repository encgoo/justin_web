Source code for [justin web](https://sites.google.com/view/justinfeng/)

# Development
## javascript
Use index.html and keep the javascript files under `js` folder and css under `css` folder. Need htmlmerge.py file here.
## merge
```
python3 htmlmerge.py index.html out.html
```
Copy the `body` of the out.html and put into google sites page.

Note that htmlmerge.py has trouble to handle img src as href. Need to manually fix the out.html.

## images
Images like [double.png](./double.png) can be pushed to github. Then view the image in github, right click on it and "Copy image address". That is the URL that can be used in google sites pages.