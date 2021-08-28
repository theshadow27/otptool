# TOTP Tool (otptool)

For those who would rather not use phone-based 2fa. 

Based on [this gist](https://gist.github.com/gboudreau/94bb0c11a6209c82418d01a59d958c93)
and the nice [totp-generator](https://www.npmjs.com/package/totp-generator) node module.

### Configuration

Requires [Authy Desktop](https://electron.authy.com/download?channel=stable&arch=x64&platform=darwin&version=latest&product=authy)
to be configured and logged in. Then close the app, open a terminal, and run 

``` sh
/Applications/Authy\ Desktop.app/Contents/MacOS/Authy\ Desktop --remote-debugging-port=5858
```

Then, open Chrome and go to `http://localhost:5858`

Click the "Twilio Authy" link

in the "Vue Developer" console (SPA within the dev tools webpage, 
do NOT open Chrome developer tools), paste and execute the following JavaScript:

``` js
JSON.stringify(appManager.getModel())
```

copy the printed json into `~/.2fa/otp.json` (you have to click in and highlight the text to copy. 
The model should be an array. Make sure to get the opening `[` and closing `]`.

| This file contains secrets (like `~/.ssh/id_rsa`) and should be kept safe (`chmod 400 ~/.2fa/otp.json`)!

The Authy app can now be closed -- it's not required again (unless you want to add another authenticator)

Finally, either add the project to `$PATH` or copy `otptool` from the source directory to your `~/bin` directory. 

### Using the CLI 

To get a list of authenticators:

`otptool list`

To generate a code for an authenticator:

`otptool code <name>`

