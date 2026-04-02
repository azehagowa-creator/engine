import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('./private.key'),
  cert: fs.readFileSync('./certificate.pem'),
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end("🔥 Secure server running");
}).listen(8443, () => {
  console.log("HTTPS running on port 8443");
});
