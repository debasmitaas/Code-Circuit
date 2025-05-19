'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import GradientBackdrop from '../../../components/GradientBackdrop';
import TaskBoard from '../../components/TaskBoard';
import Header from '../../components/Header';
import AddNewTask from '../../components/AddNewTask';

// Define the Task and TaskColumns types to match the component
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

// Define initial task data
const initialTasks: TaskColumns = {
  'to-do': [
    { id: 1, title: 'Design homepage', priority: 'high', team: 'Design', personal: false },
    { id: 2, title: 'Write documentation', priority: 'medium', team: 'Development', personal: false, progress: { current: 1, total: 3 } },
    { id: 3, title: 'Code review', priority: 'low', team: 'Development', personal: true },
  ],
  'ongoing': [
    { id: 4, title: 'Watch video tutorial', priority: 'high', team: 'Development', personal: false, progress: { current: 3, total: 5 } },
    { id: 5, title: 'Run tests', priority: 'medium', team: 'Design', personal: true, progress: { current: 3, total: 5 } },
  ],
  'done': [
    { id: 6, title: 'Prepare slide deck', priority: 'high', team: 'Development', personal: false },
    { id: 7, title: 'Launch website', priority: 'medium', team: 'Development', personal: true, dueDate: 'Feb 12', completed: 10, total: 10 },
  ]
};

// Main App Component
export default function TaskPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  return (
    <div className="flex h-screen text-gray-800 relative">
      <GradientBackdrop />
      
      {/* Main Content */}
      <div className="w-full flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Board Content */}
        <div className="flex-1 overflow-x-auto p-4">
          <TaskBoard initialTasks={initialTasks} />
        </div>
      </div>

      {/* Add Task Button */}
      <button 
        className="fixed bottom-6 right-6 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={24} className="text-indigo-500" />
      </button>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AddNewTask onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  );
}
