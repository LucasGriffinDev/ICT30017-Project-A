import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const bookingData = req.body;

    const filePath = path.join(process.cwd(), "bookingData.txt");
    const dataToSave = `Service: ${bookingData.service}, Date: ${bookingData.date}, Time: ${bookingData.time}, Duration: ${bookingData.duration}\n`;

    fs.appendFile(filePath, dataToSave, (err) => {
      if (err) {
        res.status(500).json({ error: "Error saving booking" });
      } else {
        res.status(200).json({ message: "Booking saved successfully" });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
