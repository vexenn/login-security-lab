const { runQuery } = require("../database/db");

const taskService = {
    // 1. CREATE: Inserts a new task tied to the loggin-in user

    async createTask(userId, title, description, category, priority, status, dueDate) {
      const sql = `
        INSERT INTO tasks (user_id, title, description, category, priority, status, due_date)
        VALUES (:userId, :title, :description, :category, :priority, :status, TO_DATE(:dueDate, 'YYYY-MM-DD'))
      `;
        // Secure bind parameters isolate from the SQL engine command string
        return await runQuery(sql, [userId, title, description, category, priority, status, dueDate]);
    },

    // 2. READ: Fetches tasks for a specific user with active dynamic filtering
    async getTasksByUser(userId, filters = {}) {
      let sql = `
        SELECT task_id, title, description, category, priority, status, TO_CHAR(due_date, 'YYYY-MM-DD') as due_date
        FROM tasks
        WHERE user_id = :userId
      `;
      const binds = [userId];

    //   Dynamically append filters cleanly using safe positional bind array ordering
      if (filters.status) {
        sql += ` AND status = :status`;
        binds.push(filters.status);
      }
      if (filters.priority) {
        sql += ` AND priority = :priority`;
        binds.push(filters.priority);
      }
      if (filters.category) {
        sql += ` AND category = :category`;
        binds.push(filters.category);
      }
      if (filters.search) {
        sql += ` AND LOWER(title) LIKE :search`;
        binds.push(`%${filters.search.toLowerCase()}%`);
      }

      sql += ` ORDER BY due_date ASC`;
      const result = await runQuery(sql, binds);
      return result.rows || [];
    },

    // 3. UPDATE: Modifies an existing task row if it belongs to the requesting user
    async updateTask(taskId, userId, updates) {
      const sql = `
        UPDATE tasks
        SET title = :title,
            description = :description,
            category = :category,
            priority = :priority,
            status = :status,
            due_date = TO_DATE(:dueDate, 'YYYY-MM-DD')
        WHERE task_id = :taskId AND user_id = :userId
      `;
      return await runQuery(sql, [
        updates.title,
        updates.description,
        updates.category,
        updates.priority,
        updates.status,
        updates.dueDate,
        taskId,
        userId
      ]);
    },

    // 4. DELETE: Permanently purges a single task record from the schema
    async deleteTask(taskId, userId) {
      const sql = `DELETE FROM tasks WHERE task_id = :taskId AND user_id = :userId`;
      return await runQuery(sql, [taskId, userId]);
    }
};

module.exports = taskService;