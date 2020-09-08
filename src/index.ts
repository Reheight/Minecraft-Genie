import { token, owners } from "./config";
import BotClient from "./client/client";

const client: BotClient = new BotClient({ token, owners });

client.start();

const express = require('express');
const cors = require('cors');
const csp = require('helmet-csp');
const app = express();

app.use(cors());

app.use(csp({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"]
    }
  }))

const service = app.listen(8443, () => {
    console.log(`API is now active on port: ${service.address().port}`);
});

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    return next();
});

app.set('json spaces', 2);

app.get('/api', (req, res) => {
    let response = {
        online: true
    }

    res.json(response);
});