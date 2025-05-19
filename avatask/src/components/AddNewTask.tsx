'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { monaSans, victorMono } from '../app/fonts';

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
  const { theme } = useTheme();
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
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className={`${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-white'} bg-opacity-75 backdrop-filter backdrop-blur-xl rounded-lg p-6 w-96 shadow-xl border border-opacity-20 transition-colors duration-300 ${monaSans.className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} transition-colors duration-300 ${monaSans.className}`}
        >
          Add New Task
        </motion.h2>
        <motion.button 
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className={`${theme === 'dark' ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-300`}
          onClick={onClose}
        >
          <X size={20} />
        </motion.button>
      </div>
      
      <motion.form 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} transition-colors duration-300`} htmlFor="taskTitle">
            Task Title
          </label>
          <input
            id="taskTitle"
            type="text"
            className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-white bg-gray-800 border-gray-600' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline transition-colors duration-300`}
            placeholder="Enter task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} transition-colors duration-300`} htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            className={`shadow border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-white bg-gray-800 border-gray-600' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline transition-colors duration-300`}
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} transition-colors duration-300`} htmlFor="team">
            Team
          </label>
          <select
            id="team"
            className={`shadow border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-white bg-gray-800 border-gray-600' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline transition-colors duration-300`}
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
            <span className={`text-sm font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} transition-colors duration-300`}>Personal Task</span>
          </label>
        </div>
        
        <div className="mb-6">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} transition-colors duration-300`} htmlFor="dueDate">
            Due Date (Optional)
          </label>
          <input
            id="dueDate"
            type="date"
            className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-white bg-gray-800 border-gray-600' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline transition-colors duration-300`}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <motion.button 
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700'} transition-colors duration-300`}
            onClick={onClose}
          >
            Cancel
          </motion.button>
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-white ${theme === 'dark' ? 'bg-indigo-700' : 'bg-indigo-600'} transition-colors duration-300 ${victorMono.className}`}
          >
            Add Task
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default AddNewTask;
