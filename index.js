import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { CohereClient } from "cohere-ai";

dotenv.config();

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors({
  origin: 'https://www.viwebsync.com',
  credentials: true,
}));

// Initialize Cohere client
const cohereApiKey = process.env.COHERE_API_KEY;

// Debug print: show first 6 characters only
if (!cohereApiKey) {
    console.error("❌ Cohere API key not loaded. Check your .env file.");
} else {
    console.log(`✅ Cohere API key loaded: ${cohereApiKey.slice(0, 6)}...`);
}

const cohere = new CohereClient({ token: cohereApiKey });

app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;

    const CompanyInfo =
        `VI Web Sync delivers tailored engineering and automation solutions across industries including Aerospace & Defense, Automotive, Biomedical & Pharmaceutical, Semiconductor, Oil, Gas, Chemical & Power, and AI/Deep Learning.

We specialize in LabVIEW-based automation, testing, and data logging systems that ensure precision, reliability, and traceability. Our expertise covers automated test equipment, industrial process control, SCADA integration, predictive maintenance, and AI-driven automation.

Why choose us: proven experience, custom solutions, innovation, and close client collaboration. Our mission is to empower businesses with reliable, high-quality engineering services that drive efficiency and innovation.`

const prompt = `
You are a friendly and professional virtual assistant for VI Web Sync.

Guidelines:
- If the user asks about VI Web Sync, answer using the company info below.
- Company Info: ${CompanyInfo}

Fallback behavior:
- For casual greetings (like "hi", "hello", "how are you"), reply warmly but briefly (e.g., "I’m doing well, thanks! How can I assist you today?").
- If the user asks your name, introduce yourself as "VI Assistant".
- If the question is unrelated to company info and not casual, respond with:
  "I don’t have that information. Please contact us directly for details."

User Question: ${userMessage}
`;

    try {
        // Cohere Chat API
        const response = await cohere.chat({
           model: "command-xlarge-nightly", // updated free-tier model
            message: prompt,
        });

        const aiReply = response.text.trim();
        res.json({ reply: aiReply });
    } catch (error) {
        console.error("Error generating AI response:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
