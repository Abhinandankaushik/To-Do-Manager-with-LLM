# To-Do Manager with Google Gemini and MongoDB

A modern web application for managing to-do tasks with a feature to ask questions and receive answers from Google's Gemini API, built using React, Vite, Tailwind CSS, Node.js, and MongoDB for persistent storage.

## Features

# Add, view, and delete to-do tasks, stored persistently in MongoDB.

- Ask questions via a text field and receive answers from Google's Gemini API.
- Modern frontend built with React (using ES modules) and styled with Tailwind CSS.
- Backend API built with Node.js and Express.
- MongoDB database running in a Docker container for task storage.

## Prerequisites

- Node.js (v18 or higher)
- npm
- Docker and Docker Compose
- A Google API key for Gemini (obtain one at https://makersuite.google.com/app/apikey)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/todo-manager-gemini.git
   cd todo-manager-gemini
   ```

2. **MongoDB Setup with Docker**

   - Ensure Docker and Docker Compose are installed.

   - Start the MongoDB container using Docker Compose:

     ```bash
     docker-compose up -d
     ```

     This starts a MongoDB instance on `mongodb://localhost:27017`. The database is named `todo_db` by default.

   - **Optional: Mount a Volume for Persistent Storage**To persist MongoDB data outside the container (e.g., in a local directory `./mongo-data`):

     1. Modify `docker-compose.yml` to include a volume:

        ```yaml
        services:
          mongodb:
            image: mongo:latest
            ports:
              - "27017:27017"
            volumes:
              - ./mongo-data:/data/db
        ```

     2. Create the local directory:

        ```bash
        mkdir mongo-data
        ```

     3. Restart the container:

        ```bash
        docker-compose down
        docker-compose up -d
        ```

     This mounts `./mongo-data` to `/data/db` in the container, ensuring data persists across container restarts.

3. **Backend Setup**

   - Navigate to the `backend` directory:

     ```bash
     cd backend
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Create a `.env` file in the `backend` directory and add your Google API key:

     ```env
     GOOGLE_API_KEY=your-google-api-key-here
     MONGODB_URI=mongodb://localhost:27017/todo_db
     ```

   - Start the backend server:

     ```bash
     npm start
     ```

     The backend runs on `http://localhost:5000`.

4. **Frontend Setup**

   - Navigate to the `frontend` directory:

     ```bash
     cd ../frontend
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the frontend development server:

     ```bash
     npm run dev
     ```

     The frontend runs on `http://localhost:5173` (Vite's default port).

## Running the App Locally

1. Ensure the MongoDB container is running (`docker-compose up -d`).
2. Ensure the backend server is running (`npm start` in the `backend` directory).
3. Start the frontend server (`npm run dev` in the `frontend` directory).
4. Open your browser and navigate to `http://localhost:5173`.
5. Use the app to:
   - Add tasks via the input field and "Add Task" button.
   - Delete tasks by clicking the "Delete" button next to each task.
   - Ask questions in the "Ask a Question" section, and view responses from the Gemini API.


Notes

- Tasks are stored in a MongoDB database (`todo_db`, collection `todos`), ensuring persistence across server restarts.
- The Google Gemini API is used for LLM responses. Ensure your API key is valid and you have sufficient quota.
- The frontend uses Vite for a fast development experience and ES modules for modern JavaScript.
- Tailwind CSS is installed as an npm package and configured via `tailwind.config.js`.

## Troubleshooting

- If the backend fails to start, ensure the `.env` file contains a valid `GOOGLE_API_KEY` and `MONGODB_URI`, and that the MongoDB container is running.
- If the frontend does not connect to the backend, verify that the backend is running on `http://localhost:5000`.
- For CORS issues, ensure the backend is configured to allow requests from `http://localhost:5173`.
- If MongoDB data is not persisting, verify that the volume is correctly mounted in `docker-compose.yml`.