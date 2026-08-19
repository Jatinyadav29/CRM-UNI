import React from 'react';
import { Tabs, type TabItem } from '@/shared/ui';

export interface TimeframeSelectorProps {
  timeframe: string;
  onChange: (timeframe: string) => void;
}

export const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  timeframe,
  onChange,
}) => {
  const tabs: TabItem[] = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' },
  ];

  return <Tabs tabs={tabs} activeTab={timeframe} onChange={onChange} />;
};
