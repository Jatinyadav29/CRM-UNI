export type PipelineStage =
  | 'discovery'
  | 'qualification'
  | 'proposal_presented'
  | 'negotiation'
  | 'contract_signed'
  | 'churned';

export type DealPriority = 'low' | 'medium' | 'high' | 'critical';

export interface IDeal {
  id: string;
  universityId: string;
  universityName: string;
  universityLogo: string;
  title: string;
  stage: PipelineStage;
  dealValueUsd: number;
  expectedCloseDate: string;
  probabilityPercentage: number;
  priority: DealPriority;
  assignedRep: {
    id: string;
    name: string;
    avatarUrl: string;
    email: string;
  };
  notesCount: number;
  lastActivityDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPipelineColumn {
  id: PipelineStage;
  title: string;
  color: string;
  deals: IDeal[];
  totalValueUsd: number;
  dealCount: number;
}
