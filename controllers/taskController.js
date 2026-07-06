const taskService = require("../services/taskService");

// Handler for POST /tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description, category, priority, status, dueDate } = req.body;
    const userId = req.user.userId; // Securely pulled from the verified JWT payload

    if (!title) {
        return res.status(400).json({ error: "Task title is required." });
    }

    // Default fallbacks to comply with Oracle CHECK constraint enumeration expectations
    const finalPriority = priority || "Medium";
    const finalStatus = status || "Pending";

    await taskService.createTask(userId, title, description, category, finalPriority, finalStatus, dueDate);
    res.status(201).json({ message: "Task created successfully." });
  } catch (err) {
    console.error("Create Task Controller Error:", err);
    res.status(500).json({ error: "Internal server error while processing your task creation." });
  }
};

// Handler for GET /tasks
exports.getTasks = async (req, res) => {
    try {
      const userId = req.user.userId;
    //   Captures URL query strings: ?status=Pending&priority=High&search=code
      const { status, priority, category, search } = req.query;

      const tasks = await taskService.getTasksByUser(userId, { status, priority, category, search });

      // Format response values safely to normalize varied Oracle return array/object variations
      const formattedTasks = tasks.map(task => ({
        taskId: task.TASK_ID || task[0],
        title: task.TITLE || task[1],
        description: task.DESCRIPTION || task[2],
        category: task.CATEGORY || task[3],
        priority: task.PRIORITY || task[4],
        status: task.STATUS || task[5],
        dueDate: task.DUE_DATE || task[6],
      }));

      res.json(formattedTasks);
    } catch (err) {
      console.error("Get Tasks Controller Error:", err);
      res.status(500).json({ error: "Internal server error while fetching application tasks." });
    }
};

// Handler for PUT /tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    await taskService.updateTask(id, userId, req.body);
    res.json({ message: "Task updated successfully." });
  } catch (err) {
    console.error("Update Task Controller Error:", err);
    res.status(500).json({ error: "Internal server error while attempting to modify task parameters." });
  }
};

// Handler for DELETE /tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    await taskService.deleteTask(id, userId);
    res.json({ message: "Task permanently eliminated from system registry." });
  } catch (err) {
    console.error("Delete Task Controller Error:", err);
    res.status(500).json({ error: "Internal server error while executing resource purge sequence." });
  }
};