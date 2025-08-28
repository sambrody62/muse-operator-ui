import React, { useState } from 'react';
import ClickUpPage from './ClickUpPage';
import MuseOperatorUI from './MuseOperatorUI';

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
  tags: string[];
  description: string;
  subtasks: number;
  subtasksComplete: number;
  comments: number;
  attachments: number;
}

const IntegratedApp: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showMuseOperator, setShowMuseOperator] = useState(true);

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    setShowMuseOperator(true);
  };

  return (
    <div className="relative h-screen bg-gray-100">
      {/* ClickUp Page - Always full width */}
      <div className="w-full h-full">
        <ClickUpPage />
      </div>

      {/* Muse Operator UI - Overlay on top */}
      <div className="absolute top-0 right-0 h-full transition-all duration-300">
        <MuseOperatorUI />
      </div>
    </div>
  );
};

export default IntegratedApp;