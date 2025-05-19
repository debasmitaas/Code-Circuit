'use client';
import React, { useState, useEffect } from 'react';
import TaskColumn from './TaskColumn';
import { useTheme } from '../context/ThemeContext';
// Define types directly in the component for simplicity
interface Task {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  team: 'Development' | 'Design';
  personal: boolean;
  progress?: { current: number; total: number };
  dueDate?: string;
  completed?: number;
  total?: number;
}

interface TaskColumns {
  'to-do': Task[];
  'ongoing': Task[];
  'done': Task[];
}

interface ActiveFilters {
  priority: 'high' | 'medium' | 'low' | null;
  team: 'Development' | 'Design' | null;
  personal: boolean | null;
}

interface TaskBoardProps {
  initialTasks: TaskColumns;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ initialTasks }) => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<TaskColumns>(initialTasks);
  const [activeFilters] = useState<ActiveFilters>({
    priority: null,
    team: null,
    personal: null
  });
  

  
  // Update tasks when initialTasks changes
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);
  
  // Handle drag and drop functionality
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);

  // Filter tasks based on active filters
  const getFilteredTasks = (columnTasks: Task[]): Task[] => {
    return columnTasks.filter(task => {
      const priorityMatch = !activeFilters.priority || task.priority === activeFilters.priority;
      const teamMatch = !activeFilters.team || task.team === activeFilters.team;
      const personalMatch = activeFilters.personal === null || task.personal === activeFilters.personal;
      return priorityMatch && teamMatch && personalMatch;
    });
  };

  // Handle drag start
  const handleDragStart = (task: Task, column: string): void => {
    setDraggedTask(task);
    setDraggedColumn(column);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (column: keyof TaskColumns): void => {
    if (draggedTask && draggedColumn !== column) {
      // Remove from old column
      const updatedTasks = {...tasks};
      updatedTasks[draggedColumn as keyof TaskColumns] = tasks[draggedColumn as keyof TaskColumns].filter(task => task.id !== draggedTask.id);
      
      // Add to new column
      updatedTasks[column] = [...tasks[column], draggedTask];
      
      setTasks(updatedTasks);
    }
    setDraggedTask(null);
    setDraggedColumn(null);
  };

  // No longer need the getAvatarColor function since we're using images

  return (
    <div className={`flex h-full space-x-6 justify-center ${theme === 'dark' ? 'bg-gray-900' : ''} transition-colors duration-300`}>
      <TaskColumn 
        title="To-do"
        tasks={tasks['to-do']}
        columnType="to-do"
        onDragOver={handleDragOver}
        onDrop={() => handleDrop('to-do')}
        onDragStart={handleDragStart}
        getFilteredTasks={getFilteredTasks}
      />
      
      <TaskColumn 
        title="Ongoing"
        tasks={tasks['ongoing']}
        columnType="ongoing"
        onDragOver={handleDragOver}
        onDrop={() => handleDrop('ongoing')}
        onDragStart={handleDragStart}
        getFilteredTasks={getFilteredTasks}
      />
      
      <TaskColumn 
        title="Done"
        tasks={tasks['done']}
        columnType="done"
        onDragOver={handleDragOver}
        onDrop={() => handleDrop('done')}
        onDragStart={handleDragStart}
        getFilteredTasks={getFilteredTasks}
      />
    </div>
  );
};

export default TaskBoard;
