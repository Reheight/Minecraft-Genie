import { token, owners } from "./config";
import BotClient from "./client/client";

const client: BotClient = new BotClient({ token, owners });

client.start();

const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());

const service = app.listen(23224, () => {
    console.log(`API is now active on port: ${service.address().port}`);
});

app.set('json spaces', 2);

app.get('/api', (req, res) => {
    let response = {
        online: true
    }
    
    res.json(response);
});