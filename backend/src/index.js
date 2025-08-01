import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import dbConnect from './utils/dbConnect.js';
import getTodos from './controllers/getTodos.js';
import createTodo from './controllers/createTodo.js';
import deleteTodo from './controllers/deleteTodo.js';
import askAi from './controllers/askAi.js';

dotenv.config();

const app = express();
const port = 8000;

app.use(cors({ origin:  '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB setup
dbConnect();


// Google Gemini setup
app.get('/api/todos', getTodos);
app.post('/api/todos', createTodo);
app.delete('/api/todos/:id', deleteTodo);
app.post('/api/ask', askAi);
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do Manager API with LLM!');
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});