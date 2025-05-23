'use client';
import { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import TaskBoard from '../../components/TaskBoard';
import Header from '../../components/Header';
import { useTheme } from '../../context/ThemeContext';
import { ThemeProvider } from '../../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AddNewTask from '../../components/AddNewTask';
import { monaSans, victorMono } from '../fonts';

// Import GradientBackdrop dynamically to avoid SSR issues
const GradientBackdrop = dynamic(() => import('../../../components/GradientBackdrop'), { ssr: false });

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
}

function TaskPageContent() {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const tasksRef = useRef<TaskColumns>(initialTasks);
  const [taskState, setTaskState] = useState<TaskColumns>(initialTasks);
  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  
  const handleAddTask = (newTask: Task) => {
    const updatedTasks = {
      ...tasksRef.current,
      'to-do': [...tasksRef.current['to-do'], newTask]
    };
    
    tasksRef.current = updatedTasks;
    setTaskState(updatedTasks);
    
    console.log('Added new task:', newTask);
    console.log('Updated tasks:', updatedTasks);    
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (containerRef.current && boardRef.current) {
      gsap.fromTo(
        boardRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );

      const taskColumns = boardRef.current.querySelectorAll('.task-column');
      gsap.fromTo(
        taskColumns,
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: 'power2.out',
          delay: 0.3
        }
      );

      const horizontalScroll = gsap.to(boardRef.current, {
        x: () => -(boardRef.current!.scrollWidth - window.innerWidth + 40),
        ease: 'none',
        scrollTrigger: {
          trigger: boardRef.current,
          start: 'top top',
          end: () => `+=${boardRef.current!.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      return () => {
        horizontalScroll.scrollTrigger?.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);
  
  return (
    <div className={`flex h-screen relative ${theme === 'dark' ? 'text-gray-100 bg-gray-900' : 'text-gray-800'} transition-colors duration-300 overflow-hidden ${monaSans.className}`} ref={containerRef}>
      <GradientBackdrop />
      
      <div className={`w-full flex flex-col overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : ''} transition-colors duration-300`}>
        <Header />
        <div className="flex-1 overflow-x-auto p-4 scrollbar-hide" ref={boardRef}>
          <TaskBoard 
            initialTasks={taskState} 
          />
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-10 ${theme === 'dark' ? 'bg-indigo-700' : 'bg-indigo-600'} text-white ${victorMono.className}`}
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={24} className="text-indigo-500" />
      </motion.button>

        <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ 
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.2)'
              }}
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <AddNewTask 
                onClose={() => setIsModalOpen(false)} 
                onAddTask={handleAddTask}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TaskPage() {
  return (
    <ThemeProvider>
      <TaskPageContent />
    </ThemeProvider>
  );
}
