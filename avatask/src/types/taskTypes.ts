// Define TypeScript interfaces for the task management system

export interface Task {
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

export interface TaskColumns {
  'to-do': Task[];
  'ongoing': Task[];
  'done': Task[];
}

export type TaskColumnType = keyof TaskColumns;

export interface ActiveFilters {
  priority: 'high' | 'medium' | 'low' | null;
  team: 'Development' | 'Design' | null;
  personal: boolean | null;
}

export interface NewTask {
  title: string;
  priority: 'high' | 'medium' | 'low';
  team: 'Development' | 'Design';
  personal: boolean;
}
