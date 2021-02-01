// s1-service-a-v1.0.0/app.js
'use strict';
const express = require('express');
const os = require('os');
const HOSTNAME = '0.0.0.0';
const PORT = 3000;
const SERVICE_NAME = "s1-service-a"; // Synced (manually) with package.json
const SERVICE_VERSION = "1.0.0";     // Synced (manually) with package.json
const app = express();
// get /path-alpha-01
app.get('/path-alpha-01', (req, res) => {
  res.json({
    message: "Hello from get /path-alpha-01!",
    internalInfo: {
      serviceName: SERVICE_NAME,
      version: SERVICE_VERSION,
      hostname: {
        configured: HOSTNAME,
        fromOS: os.hostname()
      },
      port: PORT
    }
  });
});
// get /path-alpha-02
app.get('/path-alpha-02', (req, res) => {
  res.json({
    message: "Hello from get /path-alpha-02!",
    internalInfo: {
      serviceName: SERVICE_NAME,
      version: SERVICE_VERSION,
      hostname: {
        configured: HOSTNAME,
        fromOS: os.hostname()
      },
      port: PORT
    }
  });
});
app.listen(PORT, HOSTNAME);
console.log(`Running on http://${HOSTNAME}:${PORT}`);
