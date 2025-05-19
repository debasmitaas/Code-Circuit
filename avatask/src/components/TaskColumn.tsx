'use client';
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

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
  return (
    <div 
      className="bg-white rounded-lg w-96 flex-shrink-0 flex flex-col min-h-[700px]"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="p-3 font-bold flex justify-between items-center border-b">
        <span className="text-xl">{title}</span>
        <MoreHorizontal size={20} className="text-gray-400" />
      </div>
      <div className="p-3 flex-1 overflow-y-auto">
        {getFilteredTasks(tasks).map(task => (
          <div 
            key={task.id}
            className="bg-white p-3 rounded mb-4 shadow-sm border border-gray-100 cursor-grab"
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
              <h3 className="font-semibold text-lg mb-3">{task.title}</h3>
            )}
            
            {task.progress && (
              <div className="mb-3">
                <div className="h-2 w-full bg-indigo-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full" 
                    style={{width: `${(task.progress.current / task.progress.total) * 100}%`}}
                  ></div>
                </div>
                <div className="flex items-center mt-1">
                  <Image 
                    src="/icons/progress-icon.png" 
                    alt="Progress" 
                    width={16} 
                    height={16} 
                    className="mr-1" 
                  />
                  <span className="text-gray-500 text-sm">{task.progress.current}/{task.progress.total}</span>
                </div>
              </div>
            )}
            
            {task.completed !== undefined && task.total !== undefined && (
              <div className="mb-3">
                <div className="flex items-center">
                  <Image 
                    src="/icons/completed-icon.png" 
                    alt="Completed" 
                    width={16} 
                    height={16} 
                    className="mr-1" 
                  />
                  <span className="text-gray-500 text-sm">{task.completed}/{task.total} completed</span>
                </div>
              </div>
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
