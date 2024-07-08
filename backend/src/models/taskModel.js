const connection = require("./connection");

const getAll = async () => {
  const [tasks] = await connection.execute("SELECT * FROM tasks");
  return tasks;
};

const createTask = async (task) => {
  const { title } = task;
  const dateUTC = new Date(Date.now()).toUTCString();

  const query = "INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)";
  const [result] = await connection.execute(query, [
    title,
    true,
    dateUTC,
  ]);

  const [createdTask] = await connection.execute(
    "SELECT * FROM tasks WHERE id = ?",
    [result.insertId]
  );
  return createdTask;
};

const deleteTask = async (id) => {
  const removedTask = await connection.execute(
    "DELETE FROM tasks WHERE id = ?",
    [id]
  );
  return removedTask;
};

const updateTask = async (id, task) => {
  const { title } = task;

  const query = 'UPDATE tasks SET title = ? WHERE id = ?';

  const [updatedTask] = await connection.execute(query, [title, id]);
  return updatedTask;
};

const updateStatusTask = async (id, task) => {
  const { status } = task;
  const query = 'UPDATE tasks SET status = ? WHERE id = ?';
  const [updatedTask] = await connection.execute(query, [status, id]);
  return updatedTask;
};


module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
  updateStatusTask
};