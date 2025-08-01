import Todo from "../models/todoSchema.js";

const createTodo = async (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: 'Task is required' });
  try {
    const newTodo = new Todo({ task });
    await newTodo.save();
    res.status(201).json({ id: newTodo._id, task: newTodo.task });
  } catch (err) {
    console.error('Error adding todo:', err);
    res.status(500).json({ error: 'Failed to add todo' });
  }
}

export default createTodo