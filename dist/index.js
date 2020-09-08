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
    };
    res.json(response);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBeUM7QUFDekMsNkRBQXdDO0FBRXhDLE1BQU0sTUFBTSxHQUFjLElBQUksZ0JBQVMsQ0FBQyxFQUFFLEtBQUssRUFBTCxjQUFLLEVBQUUsTUFBTSxFQUFOLGVBQU0sRUFBRSxDQUFDLENBQUM7QUFFM0QsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBRWYsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixNQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFFaEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO0lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hFLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDekIsSUFBSSxRQUFRLEdBQUc7UUFDWCxNQUFNLEVBQUUsSUFBSTtLQUNmLENBQUE7SUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdG9rZW4sIG93bmVycyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQgQm90Q2xpZW50IGZyb20gXCIuL2NsaWVudC9jbGllbnRcIjtcclxuXHJcbmNvbnN0IGNsaWVudDogQm90Q2xpZW50ID0gbmV3IEJvdENsaWVudCh7IHRva2VuLCBvd25lcnMgfSk7XHJcblxyXG5jbGllbnQuc3RhcnQoKTtcclxuXHJcbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbnZhciBjb3JzID0gcmVxdWlyZSgnY29ycycpO1xyXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XHJcblxyXG5hcHAudXNlKGNvcnMoKSk7XHJcblxyXG5jb25zdCBzZXJ2aWNlID0gYXBwLmxpc3RlbigyMzIyNCwgKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coYEFQSSBpcyBub3cgYWN0aXZlIG9uIHBvcnQ6ICR7c2VydmljZS5hZGRyZXNzKCkucG9ydH1gKTtcclxufSk7XHJcblxyXG5hcHAuc2V0KCdqc29uIHNwYWNlcycsIDIpO1xyXG5cclxuYXBwLmdldCgnL2FwaScsIChyZXEsIHJlcykgPT4ge1xyXG4gICAgbGV0IHJlc3BvbnNlID0ge1xyXG4gICAgICAgIG9ubGluZTogdHJ1ZVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXMuanNvbihyZXNwb25zZSk7XHJcbn0pOyJdfQ==