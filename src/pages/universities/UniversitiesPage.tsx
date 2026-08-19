import React, { useState } from 'react';
import { UniversityFilterBar } from '@/features/manage-university/filter-universities/ui/UniversityFilterBar';
import { CreateUniversityModal } from '@/features/manage-university/create-university/ui/CreateUniversityModal';
import { UniversityTable } from '@/widgets/university-table/ui/UniversityTable';
import { GraduationCap } from 'lucide-react';

export const UniversitiesPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>Global Partner Directory</span>
        </div>
        <h2 className="text-fluid-lg font-bold text-slate-900 tracking-tight">
          Partner Institutions & Cohorts
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Manage contracts, institutional rankings, enrolled candidate caps, and primary admissions contacts.
        </p>
      </div>

      {/* Filter and Controls */}
      <UniversityFilterBar onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      {/* Table / Grid view */}
      <UniversityTable />

      <CreateUniversityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default UniversitiesPage;
