export type UniversityTier =
  | 'Tier 1 (Global Elite)'
  | 'Tier 2 (National Leader)'
  | 'Tier 3 (Regional Focus)';

export type UniversityStatus =
  | 'Active Partner'
  | 'Contract Pending'
  | 'In Negotiation'
  | 'Lead'
  | 'Archived';

export interface IUniversityProgram {
  id: string;
  name: string;
  degreeLevel: 'Undergraduate' | 'Postgraduate' | 'Doctorate' | 'Certificate';
  intakeCap: number;
  enrolledStudents: number;
  annualTuitionUsd: number;
}

export interface IUniversity {
  id: string;
  name: string;
  code: string;
  slug: string;
  country: string;
  city: string;
  logoUrl: string;
  heroImageUrl: string;
  tier: UniversityTier;
  status: UniversityStatus;
  globalRanking: number;
  acceptanceRate: number;
  totalStudentBody: number;
  internationalStudentPercentage: number;
  annualContractValueUsd: number;
  activeLeadsCount: number;
  contactPerson: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  programs: IUniversityProgram[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UniversityFilters {
  search?: string;
  tier?: string;
  status?: string;
  country?: string;
  sortBy?: 'ranking' | 'name' | 'contractValue' | 'leads';
  sortOrder?: 'asc' | 'desc';
}
