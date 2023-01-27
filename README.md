# Post Message Example

This is an example of using `window.postMessage` for secure communication between origins using a popup.

**NOTE: This is not meant to be used in production and has several bad practices, this is only a POC.**

## Setup

Install nodejs dependencies with `npm install`

Start both servers with `npm start`

Navigate to https://localhost:3000 and click the `Request Access` button to show the Token popup.

In the Token popup, click the `Submit` button to send back a token response to the opener.

The developer console should show the token response and the HTML should show a success message `Token response successful!`.
