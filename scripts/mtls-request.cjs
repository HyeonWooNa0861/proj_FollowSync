const https = require("https");
const fs = require("fs");
const { URL } = require("url");

const url = process.env.MTLS_URL;
const certPath = process.env.MTLS_CERT_PATH;
const keyPath = process.env.MTLS_KEY_PATH;
const caPath = process.env.MTLS_CA_PATH;
const method = (process.env.MTLS_METHOD || "GET").toUpperCase();
const body = process.env.MTLS_BODY || "";
const headers = process.env.MTLS_HEADERS
  ? JSON.parse(process.env.MTLS_HEADERS)
  : {};

if (!url || !certPath || !keyPath) {
  console.error(
    [
      "Missing required env vars.",
      "Required: MTLS_URL, MTLS_CERT_PATH, MTLS_KEY_PATH",
      "Optional: MTLS_CA_PATH, MTLS_METHOD, MTLS_BODY, MTLS_HEADERS(JSON)",
    ].join("\n")
  );
  process.exit(1);
}

const target = new URL(url);

const options = {
  protocol: target.protocol,
  hostname: target.hostname,
  port: target.port || 443,
  path: `${target.pathname}${target.search}`,
  method,
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath),
  ca: caPath ? fs.readFileSync(caPath) : undefined,
  rejectUnauthorized: true,
  headers: {
    ...headers,
    ...(body ? { "Content-Length": Buffer.byteLength(body) } : {}),
  },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    console.log("Status:", res.statusCode);
    console.log("Response:", data);
  });
});

req.on("error", (e) => {
  console.error("Request error:", e);
  process.exit(1);
});

if (body) req.write(body);
req.end();
