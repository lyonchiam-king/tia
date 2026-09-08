import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const CSV_FILE = path.join(process.cwd(), "enquiries.csv");
const JSON_FILE = path.join(process.cwd(), "enquiries.json");

// Ensure CSV file exists with header
if (!fs.existsSync(CSV_FILE)) {
  const header = "Timestamp,Name,Email,Phone,Year Group,Struggle Area,Mode Preference,Message\n";
  fs.writeFileSync(CSV_FILE, header, "utf8");
}

if (!fs.existsSync(JSON_FILE)) {
  fs.writeFileSync(JSON_FILE, "[]", "utf8");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/enquiry", (req, res) => {
    try {
      const { name, email, phone, yearGroup, struggleArea, mode, message } = req.body;

      if (!name || (!email && !phone)) {
        return res.status(400).json({ error: "Name and contact info (email or phone) are required." });
      }

      const timestamp = new Date().toISOString();
      const cleanField = (val: string) => `"${(val || "").replace(/"/g, '""')}"`;

      const csvLine = [
        cleanField(timestamp),
        cleanField(name),
        cleanField(email),
        cleanField(phone),
        cleanField(yearGroup),
        cleanField(struggleArea),
        cleanField(mode),
        cleanField(message)
      ].join(",") + "\n";

      fs.appendFileSync(CSV_FILE, csvLine, "utf8");

      // Save to JSON too
      const existing = JSON.parse(fs.readFileSync(JSON_FILE, "utf8") || "[]");
      existing.unshift({
        timestamp,
        name,
        email,
        phone,
        yearGroup,
        struggleArea,
        mode,
        message
      });
      fs.writeFileSync(JSON_FILE, JSON.stringify(existing, null, 2), "utf8");

      return res.json({
        success: true,
        message: "Your enquiry has been received and logged to Tia's spreadsheet!",
        timestamp
      });
    } catch (err: any) {
      console.error("Error logging enquiry:", err);
      return res.status(500).json({ error: "Failed to submit enquiry. Please try WhatsApp or calling." });
    }
  });

  app.get("/api/enquiries/csv", (_req, res) => {
    if (fs.existsSync(CSV_FILE)) {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", 'attachment; filename="tias_maths_enquiries.csv"');
      return res.sendFile(CSV_FILE);
    }
    return res.status(404).send("No enquiries file found.");
  });

  app.get("/api/enquiries", (_req, res) => {
    if (fs.existsSync(JSON_FILE)) {
      const data = JSON.parse(fs.readFileSync(JSON_FILE, "utf8") || "[]");
      return res.json(data);
    }
    return res.json([]);
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
