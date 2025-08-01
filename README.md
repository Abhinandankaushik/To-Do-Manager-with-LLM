# To-Do Manager with Google Gemini and MongoDB 

A modern web application for managing to-do tasks with a feature to ask questions and receive answers from Google's Gemini API, built using React, Vite, Tailwind CSS, Node.js, and MongoDB for persistent storage. The entire application is now fully containerized using Docker and Docker Compose.

## Features

- Add, view, and delete to-do tasks, stored persistently in MongoDB.
- Ask questions via a text field and receive answers from Google's Gemini API.
- Modern frontend built with React (using ES modules) and styled with Tailwind CSS.
- Backend API built with Node.js and Express.
- Fully containerized with Docker, including MongoDB, backend, and frontend services.

## Prerequisites

- Docker and Docker Compose
- A Google API key for Gemini (obtain one at https://makersuite.google.com/app/apikey)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Abhinandankaushik/To-Do-Manager-with-LLM.git
   cd To-Do-Manager-with-LLM
   ```

2. **Configure Environment Variables**

   - Create a `.env` file in the root directory and add your Google API key:

     ```env
     GOOGLE_API_KEY=your-google-api-key-here
     ```

   - The MongoDB connection is handled within the Docker network, so no additional `MONGODB_URI` configuration is needed.

3. **Docker Setup**

   - Ensure Docker and Docker Compose are installed.
   - Start all services (MongoDB, backend, and frontend) using Docker Compose:

     ```bash
     docker-compose up -d
     ```

     This command:
     - Starts a MongoDB container (`mongodb://mongodb:27017`, database `todo_db`).
     - Builds and starts the backend container (Node.js/Express) on `http://localhost:5000`.
     - Builds and starts the frontend container (React/Vite) on `http://localhost:5173`.

   - **Optional: Persistent MongoDB Storage**

     To persist MongoDB data, a volume is mounted to `./mongo-data`. The `docker-compose.yml` includes:

     ```yaml
     services:
       mongodb:
         image: mongo:latest
         ports:
           - "27017:27017"
         volumes:
           - ./mongo-data:/data/db
     ```

     Create the local directory if it doesn't exist:

     ```bash
     mkdir mongo-data
     ```

     Data will persist in `./mongo-data` across container restarts.

4. **Access the Application**

   - Open your browser and navigate to `http://localhost:5173`.
   - Use the app to:
     - Add tasks via the input field and "Add Task" button.
     - Delete tasks by clicking the "Delete" button next to each task.
     - Ask questions in the "Ask a Question" section and view responses from the Gemini API.

## Project Structure

- `frontend/`: React application with Vite and Tailwind CSS.
- `backend/`: Node.js/Express API for task management and Gemini API integration.
- `docker-compose.yml`: Defines services for MongoDB, backend, and frontend.
- `.env`: Stores the Google API key.
- `mongo-data/`: Directory for persistent MongoDB storage.



- **MongoDB**: Runs the official MongoDB image with a persistent volume.
- **Backend**: Builds from `./backend/Dockerfile`, connects to MongoDB, and uses the Google API key from `.env`.
- **Frontend**: Builds from `./frontend/Dockerfile` and communicates with the backend.
- **Network**: All services are connected via a bridge network (`app-network`) for internal communication.

## Running the App Locally

1. Run `docker-compose up -d` to start all services.
2. Access the app at `http://localhost:5173`.
3. Stop the services with:

   ```bash
   docker-compose down
   ```

   To also remove volumes (clearing MongoDB data):

   ```bash
   docker-compose down -v
   ```

## Notes

- Tasks are stored in a MongoDB database (`todo_db`, collection `todos`), ensuring persistence across container restarts.
- The Google Gemini API requires a valid API key with sufficient quota.
- The frontend uses Vite for a fast development experience and ES modules for modern JavaScript.
- Tailwind CSS is configured via `tailwind.config.js` in the frontend.
- All services are containerized, simplifying deployment and ensuring consistency across environments.

## Troubleshooting

- **Backend Issues**: Ensure the `.env` file contains a valid `GOOGLE_API_KEY`. Verify the MongoDB container is running (`docker ps`) and accessible at `mongodb:27017`.
- **Frontend Issues**: Ensure the backend is running and accessible at `http://localhost:5000`. Check for CORS issues (the backend is configured to allow requests from `http://localhost:5173`).
- **MongoDB Persistence**: If data is not persisting, verify the `mongo-data` volume is correctly mounted in `docker-compose.yml`.
- **Docker Issues**: Ensure Docker Compose is up-to-date and there are no port conflicts (e.g., 27017, 5000, 5173).