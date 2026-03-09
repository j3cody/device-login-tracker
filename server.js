const express = require("express");
const useragent = require("useragent");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(express.json());

const PORT = process.env.PORT;
let sessions = [];

function getDevice(ua) {

    ua = ua.toLowerCase();

    if (ua.includes("mobile"))
        return "Mobile";

    if (ua.includes("tablet") || ua.includes("ipad"))
        return "Tablet";

    return "Laptop/Desktop";
}

app.post("/login", (req, res) => {

    const ua = req.headers["user-agent"];

    const agent = useragent.parse(ua);

    const session = {
        device: getDevice(ua),
        browser: agent.toAgent(),
        os: agent.os.toString(),
        time: new Date().toLocaleString()
    };

    sessions.push(session);

    res.json(session);
});

app.get("/sessions", (req, res) => {
    res.json(sessions);
});



app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port", PORT);
});