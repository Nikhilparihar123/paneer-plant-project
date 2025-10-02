// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ===== Twilio Credentials =====
const accountSid = "TWILIO_ACCOUNT_SID";       // Twilio Console se
const authToken = "TWILIO_AUTH_TOKEN";         // Twilio Console se
const client = twilio(accountSid, authToken);

const whatsappFrom = "whatsapp:+14155238886";  // Twilio Sandbox WhatsApp number
const whatsappTo = "whatsapp:+91OWNER_NUMBER"; // Owner WhatsApp number

// ===== Order Endpoint =====
app.post("/order", (req, res) => {
    const { name, phone, product, quantity, address } = req.body;

    if (!name || !product || !quantity || !address) {
        return res.status(400).send("❌ Please fill all required fields.");
    }

    const message = `🧾 New Order Received!\nCustomer: ${name}\nPhone: ${phone}\nProduct: ${product}\nQuantity: ${quantity}\nAddress: ${address}`;

    client.messages
        .create({
            from: whatsappFrom,
            to: whatsappTo,
            body: message
        })
        .then(msg => {
            console.log("WhatsApp Message SID:", msg.sid);
            res.send("✅ Order successfully sent to WhatsApp!");
        })
        .catch(err => {
            console.error("Error sending WhatsApp message:", err);
            res.status(500).send("❌ Failed to send WhatsApp message.");
        });
});

// ===== Start Server =====
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
