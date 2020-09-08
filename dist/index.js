"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const client_1 = __importDefault(require("./client/client"));
const client = new client_1.default({ token: config_1.token, owners: config_1.owners });
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
}));
const service = app.listen(8443, () => {
    console.log(`API is now active on port: ${service.address().port}`);
});
app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    return next();
});
app.set('json spaces', 2);
app.get('/api', (req, res) => {
    let response = {
        online: true
    };
    res.json(response);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBeUM7QUFDekMsNkRBQXdDO0FBRXhDLE1BQU0sTUFBTSxHQUFjLElBQUksZ0JBQVMsQ0FBQyxFQUFFLEtBQUssRUFBTCxjQUFLLEVBQUUsTUFBTSxFQUFOLGVBQU0sRUFBRSxDQUFDLENBQUM7QUFFM0QsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBRWYsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbEMsTUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRWhCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0lBQ1IsVUFBVSxFQUFFO1FBQ1YsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ3RCLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQztLQUNyQjtDQUNGLENBQUMsQ0FBQyxDQUFBO0FBRUwsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hFLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUMzQixHQUFHLENBQUMsU0FBUyxDQUFDLHlCQUF5QixFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDL0QsT0FBTyxJQUFJLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRTFCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQ3pCLElBQUksUUFBUSxHQUFHO1FBQ1gsTUFBTSxFQUFFLElBQUk7S0FDZixDQUFBO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRva2VuLCBvd25lcnMgfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IEJvdENsaWVudCBmcm9tIFwiLi9jbGllbnQvY2xpZW50XCI7XHJcblxyXG5jb25zdCBjbGllbnQ6IEJvdENsaWVudCA9IG5ldyBCb3RDbGllbnQoeyB0b2tlbiwgb3duZXJzIH0pO1xyXG5cclxuY2xpZW50LnN0YXJ0KCk7XHJcblxyXG5jb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xyXG5jb25zdCBjb3JzID0gcmVxdWlyZSgnY29ycycpO1xyXG5jb25zdCBjc3AgPSByZXF1aXJlKCdoZWxtZXQtY3NwJyk7XHJcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcclxuXHJcbmFwcC51c2UoY29ycygpKTtcclxuXHJcbmFwcC51c2UoY3NwKHtcclxuICAgIGRpcmVjdGl2ZXM6IHtcclxuICAgICAgZGVmYXVsdFNyYzogW1wiJ3NlbGYnXCJdLFxyXG4gICAgICBzdHlsZVNyYzogW1wiJ3NlbGYnXCJdXHJcbiAgICB9XHJcbiAgfSkpXHJcblxyXG5jb25zdCBzZXJ2aWNlID0gYXBwLmxpc3Rlbig4NDQzLCAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhgQVBJIGlzIG5vdyBhY3RpdmUgb24gcG9ydDogJHtzZXJ2aWNlLmFkZHJlc3MoKS5wb3J0fWApO1xyXG59KTtcclxuXHJcbmFwcC51c2UoZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVNlY3VyaXR5LVBvbGljeVwiLCBcImRlZmF1bHQtc3JjICdzZWxmJ1wiKTtcclxuICAgIHJldHVybiBuZXh0KCk7XHJcbn0pO1xyXG5cclxuYXBwLnNldCgnanNvbiBzcGFjZXMnLCAyKTtcclxuXHJcbmFwcC5nZXQoJy9hcGknLCAocmVxLCByZXMpID0+IHtcclxuICAgIGxldCByZXNwb25zZSA9IHtcclxuICAgICAgICBvbmxpbmU6IHRydWVcclxuICAgIH1cclxuXHJcbiAgICByZXMuanNvbihyZXNwb25zZSk7XHJcbn0pOyJdfQ==