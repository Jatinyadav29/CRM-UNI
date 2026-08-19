import React from 'react';
import { PipelineBoard } from '@/widgets/pipeline-board/ui/PipelineBoard';
import { Kanban } from 'lucide-react';

export const PipelinePage: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          <Kanban className="w-4 h-4" />
          <span>Institutional Pipeline & Deal Stages</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          B2B Partnership Kanban Board
        </h2>
        <p className="text-xs text-slate-500">
          Track stage velocity, weighted probability values, and manage multi-year institutional recruitment agreements.
        </p>
      </div>

      {/* Interactive Pipeline Board */}
      <PipelineBoard />
    </div>
  );
};

export default PipelinePage;
