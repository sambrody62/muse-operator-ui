import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Star, Plus, Calendar, Clock, Tag, Users, Link, Paperclip, CheckSquare, MessageSquare, Send, Smile } from 'lucide-react';

const ClickUpPage: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('Social Media Strategy Launch');
  const [status, setStatus] = useState('IN PROGRESS');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [description, setDescription] = useState('Develop comprehensive social media strategy for eco-friendly water bottle launch targeting millennials and Gen Z. Deliverables include platform strategy, content calendar, influencer partnerships, community building approach, and budget allocation across 6-week campaign timeline.');
  const [comment, setComment] = useState('');

  const statusOptions = ['TO DO', 'IN PROGRESS', 'REVIEW', 'DONE'];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-700">EcoBottle Co</h2>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-sm text-gray-600">Subtasks</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="pl-4">
              <div className="p-2 bg-blue-50 rounded">
                <span className="text-sm text-blue-600 font-medium">Social Media Strategy Launch</span>
              </div>
              <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                <span className="text-sm text-gray-600">+ Add Subtask</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm font-medium">
                Share
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded">
                <Star className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="bg-green-600 text-white px-1.5 py-0.5 rounded text-xs mr-2">EC</span>
            <span>EcoBottle Co</span>
            <span className="mx-2">/</span>
            <span>Marketing</span>
            <span className="mx-2">/</span>
            <span>Q4 Campaign</span>
          </div>

          {/* Task ID */}
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm text-gray-500">Task</span>
            <span className="text-sm font-mono text-gray-600">EC-3021</span>
            <button className="text-purple-600 text-sm hover:underline flex items-center">
              <span className="mr-1">🤖</span> Ask AI
            </button>
          </div>

          {/* Task Title */}
          <div className="mb-6">
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-2xl font-semibold w-full border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1"
            />
          </div>

          {/* AI Summary */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <span className="text-purple-600">🧠</span>
              <div className="flex-1">
                <span className="text-sm text-gray-600">
                  Ask Brain to <button className="text-purple-600 hover:underline">write a description, create a summary</button> or <button className="text-purple-600 hover:underline">find similar tasks</button>
                </span>
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div className="space-y-4 mb-6">
            {/* Status */}
            <div className="flex items-center">
              <div className="w-32 text-sm text-gray-600">Status</div>
              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium"
                >
                  <span>{status}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                {showStatusDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10">
                    {statusOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setStatus(option);
                          setShowStatusDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span className="ml-2 text-sm text-gray-400">✓</span>
            </div>

            {/* Assignees */}
            <div className="flex items-center">
              <div className="w-32 text-sm text-gray-600">Assignees</div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">SC</div>
                <span className="text-sm text-gray-700">Sarah Chen</span>
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-center">
              <div className="w-32 text-sm text-gray-600 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Dates
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-gray-500 hover:text-gray-700">Nov 1</button>
                <span className="text-gray-400">→</span>
                <button className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-sm">Dec 15</button>
              </div>
            </div>

            {/* Time Estimate */}
            <div className="flex items-center">
              <div className="w-32 text-sm text-gray-600 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Time Estimate
              </div>
              <div className="text-sm text-gray-400">Empty</div>
            </div>

            {/* Tags */}
            <div className="flex items-center">
              <div className="w-32 text-sm text-gray-600 flex items-center">
                <Tag className="w-4 h-4 mr-1" />
                Tags
              </div>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">Marketing</span>
                <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">Q4 Launch</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-xs">Social Media</span>
              </div>
            </div>

            {/* Priority */}
            <div className="flex items-center">
              <div className="w-32 text-sm text-gray-600">Priority</div>
              <div className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-sm font-medium">High</div>
            </div>

            {/* Track Time */}
            <div className="flex items-center">
              <div className="w-32 text-sm text-gray-600">Track Time</div>
              <button className="text-sm text-gray-400 hover:text-gray-600 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Add time
              </button>
            </div>

            {/* Relationships */}
            <div className="flex items-center">
              <div className="w-32 text-sm text-gray-600 flex items-center">
                <Link className="w-4 h-4 mr-1" />
                Relationships
              </div>
              <div className="text-sm text-gray-400">Empty</div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Add description</span>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <p className="text-sm text-gray-700">{description}</p>
            </div>
          </div>

          {/* Custom Fields */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Fields</h3>
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <Plus className="w-4 h-4 mr-1" />
              Create a Field on this location
            </button>
          </div>

          {/* Add Subtask */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Add subtask</h3>
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <Plus className="w-4 h-4 mr-1" />
              Add Task
            </button>
          </div>

          {/* Checklists */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Checklists</h3>
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <Plus className="w-4 h-4 mr-1" />
              Create checklist
            </button>
          </div>

          {/* Attachments */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Attachments</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-sm text-gray-500">
                Drop your files here to <button className="text-purple-600 hover:underline">upload</button>
              </p>
            </div>
          </div>

          {/* Comments */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <button className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">Comments</button>
              <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded text-sm">Activity</button>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  S
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Smile className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Paperclip className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    <button className="px-4 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm font-medium">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Activity */}
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Activity</h3>
          <button className="text-sm text-gray-500 hover:text-gray-700">▼ Show more</button>
        </div>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="text-gray-400">•</span>
              <div>
                <p>You updated the status to IN PROGRESS</p>
                <p className="text-xs text-gray-400 mt-1">Today at 10:30 am</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className="text-sm text-purple-600 hover:underline">+ More</button>
        </div>
      </div>
    </div>
  );
};

export default ClickUpPage;