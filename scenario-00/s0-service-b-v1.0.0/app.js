const express = require("express")
const os = require("os")
const package = require('./package.json');

const app = express()
const port = 8080

const debug = {
  serviceName: package.name,
  serviceVersion: package.version,
  hostname: os.hostname()
}

app.get("/path-zenlo-02", (req, res) => {
  console.log(`[_INFO] 200 | get ${req.url}`)
  res.status(200).json({
    message: "Got Zenlo 01!",
    debug: debug
  })
})

// Capture All 404 errors
app.use(function (req, res, next) {
  console.log(`[ERROR] 404 | get ${req.url}`)
  res.status(404).json({
    message: "Not found :-( ",
    debug: debug
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
