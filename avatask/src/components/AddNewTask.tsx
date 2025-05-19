'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

// Define Task interface to match the one in TaskBoard
interface Task {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  team: 'Development' | 'Design';
  personal: boolean;
  dueDate?: string;
  completed?: number;
  total?: number;
}

interface AddNewTaskProps {
  onClose: () => void;
  onAddTask?: (task: Task) => void;
}

const AddNewTask: React.FC<AddNewTaskProps> = ({ onClose, onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [team, setTeam] = useState<'Development' | 'Design'>('Development');
  const [isPersonal, setIsPersonal] = useState(false);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new task object
    const newTask = {
      id: Math.floor(Math.random() * 10000), // Generate random ID
      title: taskTitle,
      priority,
      team,
      personal: isPersonal,
      dueDate: dueDate || undefined,
      completed: 0,
      total: 1
    };
    
    // Call the onAddTask function if provided
    if (onAddTask) {
      onAddTask(newTask);
    }
    
    // Close the modal
    onClose();
  };

  return (
    <div className="bg-white rounded-lg p-6 w-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add New Task</h2>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskTitle">
            Task Title
          </label>
          <input
            id="taskTitle"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="team">
            Team
          </label>
          <select
            id="team"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={team}
            onChange={(e) => setTeam(e.target.value as 'Development' | 'Design')}
          >
            <option value="Development">Development</option>
            <option value="Design">Design</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isPersonal}
              onChange={(e) => setIsPersonal(e.target.checked)}
            />
            <span className="text-gray-700 text-sm font-bold">Personal Task</span>
          </label>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
            Due Date (Optional)
          </label>
          <input
            id="dueDate"
            type="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <button 
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewTask;
