import { google } from "googleapis";
import { calendar_v3 as googleCalendar } from "@googleapis/calendar";

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
];

export const initGoogleCalendar = async () => {
  try {
    const credentials = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY      
    }
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: SCOPES,
    });

    const calendar = google.calendar({ version: "v3", auth });

    return calendar;
  } catch (error) {
    console.error("Error initializing Google Calendar API:", error);
  }
};
