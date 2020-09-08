import { token, owners } from "./config";
import BotClient from "./client/client";

const client: BotClient = new BotClient({ token, owners });

client.start();