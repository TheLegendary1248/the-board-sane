const React = require('react')

function TEST() {
  return(
    <html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%REACT_APP_SERVER_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <script rel="text/javascript" src={process.env.ROOT_URL + 'scripts/index.js'} defer></script>
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>)
}

module.exports = TEST