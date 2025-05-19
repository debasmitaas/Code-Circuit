'use client';
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
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

type TaskColumnType = 'to-do' | 'ongoing' | 'done';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  columnType: TaskColumnType;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: () => void;
  onDragStart: (task: Task, column: string) => void;
  getFilteredTasks: (tasks: Task[]) => Task[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  columnType,
  onDragOver,
  onDrop,
  onDragStart,
  getFilteredTasks
}) => {
  const { theme } = useTheme();
  
  // Function to get color based on priority
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high':
        return theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800';
      case 'medium':
        return theme === 'dark' ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-100 text-yellow-800';
      case 'low':
        return theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800';
      default:
        return theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div 
      className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg w-96 flex-shrink-0 flex flex-col min-h-[700px] task-column transition-colors duration-300`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className={`p-3 font-bold flex justify-between items-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border-b transition-colors duration-300`}>
        <span className="text-xl">{title}</span>
        <MoreHorizontal size={20} className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} transition-colors duration-300`} />
      </div>
      <div className="p-3 flex-1 overflow-y-auto">
        {getFilteredTasks(tasks).map(task => (
          <div 
            key={task.id}
            className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'} p-3 rounded mb-4 shadow-sm border cursor-grab transition-colors duration-300`}
            draggable
            onDragStart={() => onDragStart(task, columnType)}
          >
            {task.title === 'Watch video tutorial' && columnType === 'ongoing' ? (
              <div className="relative mb-3">
                <div className="bg-indigo-900 rounded-lg h-32 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                    <div className="ml-1 w-0 h-0 border-t-8 border-t-transparent border-l-14 border-l-white border-b-8 border-b-transparent"></div>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mt-2">Watch video</h3>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-lg mb-3">{task.title}</h3>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <span 
                      className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}
                    >
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                    <span 
                      className={`ml-2 px-2 py-1 text-xs rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                    >
                      {task.team}
                    </span>
                    {task.personal && (
                      <span 
                        className={`ml-2 px-2 py-1 text-xs rounded-full ${theme === 'dark' ? 'bg-indigo-900 text-indigo-100' : 'bg-indigo-100 text-indigo-800'}`}
                      >
                        Personal
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}
            

            

            
            <div className="flex justify-between items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(userId => (
                  <div key={userId} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <Image 
                      src={`/icons/${userId}.png`} 
                      alt={`User ${userId}`} 
                      width={32} 
                      height={32} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <Image 
                    src="/icons/3.png" 
                    alt="User 3" 
                    width={32} 
                    height={32} 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Removed '+' icon */}
    </div>
  );
};

export default TaskColumn;
