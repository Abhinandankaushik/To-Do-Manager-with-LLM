import Todo from "../models/todoSchema.js";

const deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
}

export default deleteTodo