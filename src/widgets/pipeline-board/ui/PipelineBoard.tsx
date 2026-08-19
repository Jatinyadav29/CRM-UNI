import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useAppSelector } from '@/app/store/hooks';
import {
  usePipelineDeals,
  usePipelineColumns,
} from '@/entities/pipeline/model/usePipelineQuery';
import { StageHeader } from '@/entities/pipeline/ui/StageHeader';
import { DealCard } from '@/entities/pipeline/ui/DealCard';
import { Skeleton, Button } from '@/shared/ui';
import { Plus, Kanban, Sparkles } from 'lucide-react';
import { animateStaggerCards } from '@/shared/lib/gsap';
import { CreateDealModal } from '@/features/manage-pipeline/create-deal/ui/CreateDealModal';

export const PipelineBoard: React.FC = () => {
  const { data: deals = [], isPending } = usePipelineDeals();
  const { searchQuery, selectedPriorityFilter, selectedStageFilter } = useAppSelector(
    (state) => state.pipeline
  );

  const filteredDeals = useMemo(() => {
    return deals.filter((d) => {
      const matchesSearch =
        !searchQuery ||
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.universityName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority =
        selectedPriorityFilter === 'all' || d.priority === selectedPriorityFilter;

      const matchesStage =
        selectedStageFilter === 'all' || d.stage === selectedStageFilter;

      return matchesSearch && matchesPriority && matchesStage;
    });
  }, [deals, searchQuery, selectedPriorityFilter, selectedStageFilter]);

  const columns = usePipelineColumns(filteredDeals);
  const boardRef = useRef<HTMLDivElement>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    let mm: gsap.MatchMedia | undefined;

    if (!isPending && filteredDeals.length > 0 && boardRef.current) {
      const cards = boardRef.current.querySelectorAll('.deal-column');
      if (cards.length) {
        mm = animateStaggerCards(cards, 0.05);
      }
    }

    return () => {
      mm?.revert();
    };
  }, [isPending, filteredDeals.length]);

  if (isPending) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-6 items-start">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="flex flex-col gap-3 w-80 shrink-0">
            <Skeleton className="h-16 w-full rounded-2xl" />
            <Skeleton className="h-44 w-full rounded-2xl" />
            <Skeleton className="h-44 w-full rounded-2xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Board Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Kanban className="w-5 h-5 text-indigo-600 shrink-0" />
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              Institutional Opportunities ({filteredDeals.length} active deals)
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </h3>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Swipe across columns or drag deals across stage milestones.
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shrink-0"
        >
          New Deal
        </Button>
      </div>

      {/* Kanban Board Columns Horizontal Scroll (Mobile-First Snap-Swipe) */}
      <div
        ref={boardRef}
        className="flex flex-nowrap overflow-x-auto pb-6 items-start gap-4 snap-x snap-mandatory touch-pan-x scroll-smooth overscroll-x-contain"
      >
        {columns.map((column) => (
          <div
            key={column.id}
            className="deal-column flex flex-col gap-3.5 w-[85vw] sm:w-80 shrink-0 bg-slate-100/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 snap-center"
          >
            <StageHeader column={column} />

            {/* Deal cards list */}
            <div className="flex flex-col gap-3 min-h-[260px]">
              {column.deals.length === 0 ? (
                <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400 font-medium">
                  No deals in this stage
                </div>
              ) : (
                column.deals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <CreateDealModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default PipelineBoard;
