import { Listener } from "discord-akairo";

export default class ReadyListener extends Listener {
    public constructor() {
        super("Ready!", {
            emitter: "client",
            event: "ready",
            category: "client"
        })
    }

    public exec(): void {
        console.log(`${this.client.user.tag} is now ready!`);
    }
}