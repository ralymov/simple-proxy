const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 443;
const HOST = "localhost";
const API_SERVICE_URL = "localhost";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service.');
});

// Authorization
// app.use('', (req, res, next) => {
//     if (req.headers.authorization) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// });

// Proxy endpoints
app.use('/rpc/haqq', createProxyMiddleware({
    target: API_SERVICE_URL + ':26657',
    changeOrigin: true,
    pathRewrite: {
        [`^/rpc/haqq`]: '',
    },
}));

app.use('/rest/haqq', createProxyMiddleware({
    target: API_SERVICE_URL + ':1317',
    changeOrigin: true,
    pathRewrite: {
        [`^/rest/haqq`]: '',
    },
}));

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});