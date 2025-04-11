# Anonymous Message App

An anonymous messaging platform where users can send messages to registered users without revealing their identity. Additionally, the app features AI-powered message generation for enhanced user engagement.

## Features

- **Anonymous Messaging**: Send messages anonymously to registered users.
- **AI-Powered Messages**: Generate AI-assisted messages for creative and engaging communication.
- **User Registration & Authentication**: Secure sign-up and login system.
- **Real-Time Messaging**: Instant delivery of messages.
- **Modern UI**: Built with Next.js and Tailwind CSS for a responsive and smooth user experience.

## Tech Stack

- **Frontend**: Next.js (TypeScript), Tailwind CSS
- **Backend**: Next.js API Routes (Node.js, Express-like backend)
- **Database**: MongoDB
- **AI Integration**:Gemini API
- **Authentication**: NextAuth.js (Google, GitHub, or Email login)

---

## Installation & Setup

### Prerequisites
- **Node.js**
- **MongoDB** (or a cloud database like MongoDB Atlas)
- **Environment Variables** (see `.env.example` for reference)

### 1. Clone the Repository
```sh
git clone https://github.com/Harshillagg/AnonyMsg.git
cd anonymous-message-app
```

### 2. Install Dependencies
```sh
npm install  # or yarn install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory

### 4. Run the Development Server
```sh
npm run dev  # or yarn dev
```
Visit `http://localhost:3000` to see the app in action.

## Future Enhancements
- **End-to-End Encryption** for message privacy
- **More AI Features** for message customization
- **User Blocking & Reporting** to prevent misuse
