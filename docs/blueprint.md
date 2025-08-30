# **App Name**: NexusConnect

## Core Features:

- Job Feed: Display a real-time updating list of recently posted jobs from the user's network, fetched using Firestore's onSnapshot listener.
- Post a Job: Enable authenticated users to create new job postings with title, company, location, and description fields.
- My Network: Show a list of the user's connections with simple profiles for each.  Profile pages should contain summary of information that could be useful, and if it appears appropriate based on context and available user data, the page can include a brief recommendation for improving their profile using a tool.
- Direct Messaging: Provide a simple messaging interface to send private messages to connections. Utilize Firestore's onSnapshot for real-time updates.
- User Authentication: Implement Firebase Authentication using signInWithCustomToken with a pre-provided token.
- Custom Message Box UI: Implement non-modal message boxes for all user messages, rather than alert() and confirm().

## Style Guidelines:

- Primary color: Soft blue (#79A6DC) for a calm and professional feel.
- Background color: Light gray (#F5F7FA) to create a clean and neutral backdrop.
- Accent color: Teal (#45B39D) for highlighting key interactive elements and calls to action.
- Body and headline font: 'Inter' (sans-serif) for a modern, clean, and readable experience.
- Use rounded corners and subtle shadow effects for buttons, input fields, and other interactive elements to enhance usability.
- Implement a fully responsive layout to ensure the app looks great on both desktop and mobile devices.