import * as http from 'node:http';
import * as https from 'node:https';
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux";
import wisp from 'wisp-server-node';
import express from 'express';

const httpServer = http.createServer();
const httpsServer = https.createServer();
const app = express();

app.use('/', express.static(process.cwd() + '/static'));

app.use("/uv/sw.js", (req, res) => res.sendFile(process.cwd() + "/static/uv/sw.js"));
app.use("/uv/uv.config.js", (req, res) => res.sendFile(process.cwd() + "/static/uv/uv.config.js"));


app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

httpServer.on("request", (req, res) => {
    app(req, res);
});
httpServer.on("upgrade", (req, socket, head) => {
    if (req.url.endsWith("/wisp/")) wisp.routeRequest(req, socket, head);
    else socket.end();
});

httpsServer.on("request", (req, res) => {
    app(req, res);
});
httpsServer.on("upgrade", (req, socket, head) => {
    if (req.url.endsWith("/wisp/")) wisp.routeRequest(req, socket, head);
    else socket.end();
});

httpServer.on("listening", () => {
    console.log(`Started on http://127.0.0.1:80`)
});
httpsServer.on("listening", () => {
    console.log(`Started on https://127.0.0.1:443`)
});

httpServer.listen(8080);
httpsServer.listen(8443);
