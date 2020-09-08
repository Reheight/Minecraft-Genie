"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class ReadyListener extends discord_akairo_1.Listener {
    constructor() {
        super("Ready!", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
    }
    exec() {
        console.log(`${this.client.user.tag} is now ready!`);
    }
}
exports.default = ReadyListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhZHlMaXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saXN0ZW5lcnMvY2xpZW50L1JlYWR5TGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBMEM7QUFFMUMsTUFBcUIsYUFBYyxTQUFRLHlCQUFRO0lBQy9DO1FBQ0ksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNaLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLEtBQUssRUFBRSxPQUFPO1lBQ2QsUUFBUSxFQUFFLFFBQVE7U0FDckIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLElBQUk7UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDSjtBQVpELGdDQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlzdGVuZXIgfSBmcm9tIFwiZGlzY29yZC1ha2Fpcm9cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWR5TGlzdGVuZXIgZXh0ZW5kcyBMaXN0ZW5lciB7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJSZWFkeSFcIiwge1xyXG4gICAgICAgICAgICBlbWl0dGVyOiBcImNsaWVudFwiLFxyXG4gICAgICAgICAgICBldmVudDogXCJyZWFkeVwiLFxyXG4gICAgICAgICAgICBjYXRlZ29yeTogXCJjbGllbnRcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4ZWMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5jbGllbnQudXNlci50YWd9IGlzIG5vdyByZWFkeSFgKTtcclxuICAgIH1cclxufSJdfQ==