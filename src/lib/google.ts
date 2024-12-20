import { google } from "googleapis";

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
      // FIX netlify https://stackoverflow.com/a/67516991/4296747
      private_key: process.env.GOOGLE_PRIVATE_KEY?.split("\\n").join("\n")
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
