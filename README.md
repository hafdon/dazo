# README

Javascript/HTML/CSS integration with Anki spaced repetition program for Irish language (Gaelic) learning

## running the project

All information below is for a macOS 12.6.8 (Monterey). Commands have been run from the iTerm2 Terminal replacement program.

### enable Chromium browser debugging

Anki uses the environmental variable `QTWEBENGINE_REMOTE_DEBUGGING` to store the port on which the program exposes a debugging UI which allows you to debug with Chromium dev tools.

Before you start Anki, set that environmental variable to the port you wish. The recommended default is `8080`.

```sh
% export QTWEBENGINE_REMOTE_DEBUGGING=8080
```

This command is specific to your terminal session, so if you close the terminal and open another one you will have to set the variable again.

You can check that it has been set properly by listing all the environmental variables and searching for the string `8080`:

```sh
% env | grep 8080
QTWEBENGINE_REMOTE_DEBUGGING=8080
```

### console log

Run Anki directly from the terminal/command line. On a Mac, the file can be found in `Anki.app/Contents/MacOS/`.

Your terminal will resemble the following:

```sh
% pwd
/.../Anki.app/Contents/MacOS/
% ./anki
Anki starting...
Initial setup...
Running with temporary Qt5 compatibility shims.
Run with DISABLE_QT5_COMPAT=1 to confirm compatibility with Qt6.
Preparing to run...


DevTools listening on ws://127.0.0.1:8080/devtools/browser/f5e0b09c-9830-4302-8f7b-675e419c39ce
Starting main loop...
Qt warning: Remote debugging server started successfully. Try pointing a Chromium-based browser to http://127.0.0.1:8080
```

### start json server

From the root of the `dazo` repository, run:

```sh
% npm start

 \{^_^}/ hi!

  Loading db.json
  Done

  Resources
# ...
```

This starts the json server using the npm script `json-server --watch db.json --port 3001`. You can set your preferred port.

Please see the documentation on the npm package page: <https://www.npmjs.com/package/json-server>

### start Rollup

If you plan on doing any programming, you can run the Rollup bundler and set it to watch files for any changes.

From the root of the `dazo` repository, run:

```sh
% npm run build
```

This starts the Rollup bundler using the npm script `rollup --config --watch`.
