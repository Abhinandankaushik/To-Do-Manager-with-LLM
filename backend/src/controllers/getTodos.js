import Todo from "../models/todoSchema.js";

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos.map(todo => ({ id: todo._id, task: todo.task })));
    } catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
}

export default getTodos;