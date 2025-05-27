import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

const getInitialTasks = () => {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
};

export default function TodoApp() {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [taskText, setTaskText] = useState('');
  const [filter, setFilter] = useState('all'); //initialy it will sjow all tasks
  const [sorting, setsorting] = useState(true);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const text = taskText.trim();
    if (!text) return alert('Task cannot be empty');
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter((task) =>
    filter === 'all' ? true :
    filter === 'active' ? !task.completed :
    task.completed
  );

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sorting ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
  );

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>

      {/* Input and Add */}
      <div className="flex mb-4">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter a new task"
          className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* filltering and Sorting all list according to completed this task or not */}
      <div className="flex justify-between mb-4 text-sm">
        <div>
          <button
            onClick={() => setFilter('all')}
            className={`px-2 py-1 ${filter === 'all' ? 'font-bold text-blue-600' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-2 py-1 ${filter === 'active' ? 'font-bold text-blue-600' : ''}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-2 py-1 ${filter === 'completed' ? 'font-bold text-blue-600' : ''}`}
          >
            Completed
          </button>
        </div>
        <button
          onClick={() => setsorting(!sorting)}
          className="text-blue-500 hover:underline flex items-center gap-1"
        >
          Sort {sorting ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
        </button>
      </div>

      {/* task lists */}
      <ul className="space-y-2">
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border border-gray-200 rounded"
            >
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="accent-blue-500"
                />
                <span
                  className={`cursor-pointer ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => removeTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 size={18} />
              </button>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No tasks available</li>
        )}
      </ul>
    </div>
  );
}
