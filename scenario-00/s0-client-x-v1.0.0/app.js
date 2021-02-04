const http = require('http');

const API_HOST = process.env.API_HOST || "localhost";
const API_PORT = process.env.API_PORT || 8080;

console.log(`[INFO] API_HOST=${API_HOST} & API_PORT=${API_PORT}`);

function poll(urls, nIndex) {
  if (nIndex >= urls.length) { nIndex = 0 }
  const url = new URL(urls[nIndex]);
  http.get(url, (res) => {
    let data = "";
    let message = `[_INFO] get ${url.pathname}`;
    // A chunk of data has been received.
    res.on("data", (chunk) => {
      data += chunk;
    });
    // The whole response has been received.
    res.on("end", () => {
      message += ` | ${res.statusCode}`
      try {
        let json = JSON.parse(data);
        message += ` | ${json.message} | ${json.debug.serviceName} (${json.debug.serviceVersion})`;
        message += ` | ${json.debug.hostname}`;
      } catch (error) {
        message += ` | ${error.message}`;
      };
      console.log(message);
      setTimeout(poll, 1000, urls, ++nIndex);
    });
  }).on("error", (err) => {
    console.log(`[ERROR] ${err.message}`);
    setTimeout(poll, 1000, urls, ++nIndex);
  });
}

poll([
  `http://${API_HOST}:${API_PORT}/path-zenlo-01`,
  `http://${API_HOST}:${API_PORT}/path-zenlo-02`
], 0);
