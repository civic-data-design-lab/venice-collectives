# collectives

Due to security reasons, websites are not allowed to access files (the json/csv files we are trying to get) from local path, so we have to setup a local server to access the files. Sounds conplex, but its just a couple of steps to get the website working properly:

There are two ways:

First method (Python):
1. Download and install the latest version of python if it's not already installed on the device.
2. Open command/terminal in the folder with `index.html` file.
3. Run `python3 -m http.server`. (if that doesn't work, try `python -m http.server`).
4. Go to localhost:8000 in the browser.

Second method (WAMP):
1. Download and install WAMP (or XAMPP or MAMP or LAMP) if it's not already installed.
2. Copy the collectives folder and paste it inside `www` folder inside WAMP's directory.
3. Run WAMPserver. 
4. Go to `localhost/collectives(or whatever the folder is named)` in the browser.