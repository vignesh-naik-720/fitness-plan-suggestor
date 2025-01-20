require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const router = express.Router();

router.post("/", async (req, res) => {
    console.log("Inside the controller...");
    const { weight, height, activity } = req.body;

    const prompt = `Suggest a daily calorie intake and workout plan for a person with:
    - Weight: ${weight} kg
    - Height: ${height} cm
    - Activity Level: ${activity}
     not usse a
    Generate output in properly formatted HTML. Use <em>, <table>, <br> and other tags to make the output beautiful. Dony internal or inline css except for table elements and give borders of style dashed.
    `;

    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());

        res.json({ message: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the AI response" });
    }
});

module.exports = router;
