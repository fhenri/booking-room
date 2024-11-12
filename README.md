# Booking Meeting Room web application

<figure>
  <img width="1429" alt="image" src="https://github.com/user-attachments/assets/b31c219f-7206-4119-a441-0ab969fbd5f3" alt="admin screenshot">
  <figcaption>Screenshot from Admin screen</figcaption>
</figure>


# Features
As a user I can:
- select date, time and capactity required to book a meeting room
- select the free meeting room from the list
- schedule a meeting and book the room

As an admin I can:
- list all rooms (filter, sort)
- see the detailed planning of a given room
- create a new room
- delete an existing room

# Technical Corner

The development of the page is explained in a series of medium article:
- [part I](https://medium.com/@frederic.henri/building-a-fullstack-booking-meeting-room-app-with-nextjs-part-i-2393a80a70d0) discuss the API and admin page component, setting up Redis
- [part II](https://medium.com/@frederic.henri/building-a-fullstack-booking-meeting-room-app-with-nextjs-part-ii-4b536845cd2f) discuss the integration with Google Calendar, the end user form and improvement of admin page.
- [part II]() discuss how to setup authentication using [Auth.js](https://authjs.dev) and a [Google OAuth provider](https://authjs.dev/getting-started/providers/google).

## Stack

- NextJS 
- App router and API routes, since we plan to have multiple clients, we will create API to interact with our backend
- Google Calendar, we will use to store all meeting detail (date, time, participant …)
- Redis, we will store the list of available rooms in redis along with their capacity and the google calendar ID
- Tailwind css and Shadcn/ui for UI components, as my web design talent still pretty low

## Deployment

As usual, the easiest way to deploy Next.js app is to use the the [Vercel Platform](https://vercel.com/new). Make sure to add the required environment variables to connect with your Google Calendar once deployed.

- vercel app: https://booking-room-lemon.vercel.app
- CNAME record from the main site (hosted at cloudflare): https://booking-room.cloud06.io
