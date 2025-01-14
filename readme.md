# Chat Application

This repository contains the code for a real-time chat application, which includes both the frontend and backend. The project is built using modern web technologies and allows users to join chat rooms and communicate in real-time.

## Project Structure

- **Frontend**: Located in the `frontend` folder, built with React, TypeScript, Tailwind CSS, and WebSocket for real-time communication.
- **Backend**: Located in the `backend` folder, built with Node.js and the `ws` library for WebSocket server implementation.

## Features

- Join chat rooms with unique room IDs.
- Real-time messaging using WebSocket protocol.
- Differentiated user views for messages (own vs. others).
- Responsive UI built with Tailwind CSS.

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **TypeScript**: For type-safe code.
- **Tailwind CSS**: For styling and responsive design.
- **WebSocket**: For real-time communication with the backend.

### Backend
- **Node.js**: JavaScript runtime for server-side programming.
- **WebSocket (`ws`)**: Library for WebSocket server implementation.

## How to Run

### Prerequisites
- Node.js installed on your system.
- A package manager like `npm` or `yarn`.

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Chat-app.git
   cd Chat-app
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

4. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```

5. Open your browser and navigate to `http://localhost:5173` to access the chat application.

## Usage

1. Enter a unique room ID to join a chat room.
2. Start sending messages to other participants in the same room.
3. Messages will appear in real-time for all users in the room.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.


Demo - https://www.loom.com/share/78c512d6371b4f6998c3af789e05e3c5?sid=e8284f05-7113-430d-90fc-55868f4dfc64

Happy chatting!
