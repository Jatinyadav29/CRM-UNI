import { supabase } from '@/shared/api/supabaseClient';
import type { Database } from '@/shared/api/supabaseTypes';
import type { IDeal, PipelineStage } from '../model/types';

type DealRow = Database['public']['Tables']['deals']['Row'];

export const MOCK_DEALS: IDeal[] = [
  {
    id: 'deal_ox_01',
    universityId: 'uni_oxford_01',
    universityName: 'University of Oxford',
    universityLogo: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?w=120&auto=format&fit=crop&q=80',
    title: 'Enterprise Multi-Year Global Student Recruitment License',
    stage: 'contract_signed',
    dealValueUsd: 145000,
    expectedCloseDate: '2026-09-01',
    probabilityPercentage: 100,
    priority: 'critical',
    assignedRep: {
      id: 'rep_01',
      name: 'Alex Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      email: 'alex.vance@genesis-edu.io',
    },
    notesCount: 14,
    lastActivityDate: '2026-08-16T14:20:00Z',
    createdAt: '2026-05-10T10:00:00Z',
    updatedAt: '2026-08-16T14:20:00Z',
  },
  {
    id: 'deal_stan_02',
    universityId: 'uni_stanford_02',
    universityName: 'Stanford University',
    universityLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
    title: 'AI Engineering Cohort CRM Expansion (3-Year)',
    stage: 'negotiation',
    dealValueUsd: 210000,
    expectedCloseDate: '2026-09-15',
    probabilityPercentage: 85,
    priority: 'critical',
    assignedRep: {
      id: 'rep_02',
      name: 'Elena Rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      email: 'e.rostova@genesis-edu.io',
    },
    notesCount: 8,
    lastActivityDate: '2026-08-17T09:15:00Z',
    createdAt: '2026-06-01T11:00:00Z',
    updatedAt: '2026-08-17T09:15:00Z',
  },
  {
    id: 'deal_cam_03',
    universityId: 'uni_cambridge_03',
    universityName: 'University of Cambridge',
    universityLogo: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=120&auto=format&fit=crop&q=80',
    title: 'Postgraduate Machine Learning Applicant Portal & Telemetry',
    stage: 'negotiation',
    dealValueUsd: 175000,
    expectedCloseDate: '2026-09-30',
    probabilityPercentage: 80,
    priority: 'critical',
    assignedRep: {
      id: 'rep_01',
      name: 'Alex Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      email: 'alex.vance@genesis-edu.io',
    },
    notesCount: 9,
    lastActivityDate: '2026-08-17T14:00:00Z',
    createdAt: '2026-05-22T09:00:00Z',
    updatedAt: '2026-08-17T14:00:00Z',
  },
  {
    id: 'deal_mit_04',
    universityId: 'uni_mit_04',
    universityName: 'MIT (Kendall Innovation Hub)',
    universityLogo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&auto=format&fit=crop&q=80',
    title: 'Global STEM Talent Funnel & Predictive Yield Analytics',
    stage: 'proposal_presented',
    dealValueUsd: 240000,
    expectedCloseDate: '2026-10-15',
    probabilityPercentage: 70,
    priority: 'critical',
    assignedRep: {
      id: 'rep_02',
      name: 'Elena Rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      email: 'e.rostova@genesis-edu.io',
    },
    notesCount: 7,
    lastActivityDate: '2026-08-16T16:30:00Z',
    createdAt: '2026-06-15T10:00:00Z',
    updatedAt: '2026-08-16T16:30:00Z',
  },
  {
    id: 'deal_eth_05',
    universityId: 'uni_eth_06',
    universityName: 'ETH Zurich',
    universityLogo: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=120&auto=format&fit=crop&q=80',
    title: 'European Master Portal & Applicant Screening Integration',
    stage: 'proposal_presented',
    dealValueUsd: 115000,
    expectedCloseDate: '2026-10-01',
    probabilityPercentage: 65,
    priority: 'high',
    assignedRep: {
      id: 'rep_01',
      name: 'Alex Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      email: 'alex.vance@genesis-edu.io',
    },
    notesCount: 6,
    lastActivityDate: '2026-08-14T11:30:00Z',
    createdAt: '2026-07-02T13:00:00Z',
    updatedAt: '2026-08-14T11:30:00Z',
  },
  {
    id: 'deal_nus_06',
    universityId: 'uni_nus_07',
    universityName: 'National University of Singapore',
    universityLogo: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=120&auto=format&fit=crop&q=80',
    title: 'APAC Candidate Pipeline Analytics Suite',
    stage: 'qualification',
    dealValueUsd: 130000,
    expectedCloseDate: '2026-10-20',
    probabilityPercentage: 50,
    priority: 'high',
    assignedRep: {
      id: 'rep_03',
      name: 'David Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: 'd.chen@genesis-edu.io',
    },
    notesCount: 4,
    lastActivityDate: '2026-08-15T16:00:00Z',
    createdAt: '2026-07-15T08:30:00Z',
    updatedAt: '2026-08-15T16:00:00Z',
  },
  {
    id: 'deal_ntu_07',
    universityId: 'uni_ntu_08',
    universityName: 'Nanyang Technological University',
    universityLogo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80',
    title: 'Cybersecurity Postgraduate Cohort Marketing License',
    stage: 'qualification',
    dealValueUsd: 110000,
    expectedCloseDate: '2026-11-05',
    probabilityPercentage: 45,
    priority: 'medium',
    assignedRep: {
      id: 'rep_03',
      name: 'David Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: 'd.chen@genesis-edu.io',
    },
    notesCount: 3,
    lastActivityDate: '2026-08-13T10:00:00Z',
    createdAt: '2026-07-20T11:00:00Z',
    updatedAt: '2026-08-13T10:00:00Z',
  },
  {
    id: 'deal_tokyo_08',
    universityId: 'uni_tokyo_09',
    universityName: 'The University of Tokyo',
    universityLogo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=120&auto=format&fit=crop&q=80',
    title: 'Global STEM Pilot Onboarding 2026',
    stage: 'discovery',
    dealValueUsd: 75000,
    expectedCloseDate: '2026-11-15',
    probabilityPercentage: 25,
    priority: 'medium',
    assignedRep: {
      id: 'rep_03',
      name: 'David Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: 'd.chen@genesis-edu.io',
    },
    notesCount: 2,
    lastActivityDate: '2026-08-12T10:45:00Z',
    createdAt: '2026-08-01T09:00:00Z',
    updatedAt: '2026-08-12T10:45:00Z',
  },
  {
    id: 'deal_sydney_09',
    universityId: 'uni_sydney_10',
    universityName: 'University of Sydney',
    universityLogo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=120&auto=format&fit=crop&q=80',
    title: 'Oceania Regional International Agent Network Hub',
    stage: 'contract_signed',
    dealValueUsd: 165000,
    expectedCloseDate: '2026-08-30',
    probabilityPercentage: 100,
    priority: 'high',
    assignedRep: {
      id: 'rep_02',
      name: 'Elena Rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      email: 'e.rostova@genesis-edu.io',
    },
    notesCount: 11,
    lastActivityDate: '2026-08-17T11:00:00Z',
    createdAt: '2026-04-18T10:00:00Z',
    updatedAt: '2026-08-17T11:00:00Z',
  },
  {
    id: 'deal_melb_10',
    universityId: 'uni_melbourne_11',
    universityName: 'University of Melbourne',
    universityLogo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    title: 'Information Technology Master Yield Acceleration Program',
    stage: 'negotiation',
    dealValueUsd: 155000,
    expectedCloseDate: '2026-09-25',
    probabilityPercentage: 85,
    priority: 'high',
    assignedRep: {
      id: 'rep_02',
      name: 'Elena Rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      email: 'e.rostova@genesis-edu.io',
    },
    notesCount: 5,
    lastActivityDate: '2026-08-16T13:45:00Z',
    createdAt: '2026-06-10T14:00:00Z',
    updatedAt: '2026-08-16T13:45:00Z',
  },
  {
    id: 'deal_imperial_11',
    universityId: 'uni_imperial_12',
    universityName: 'Imperial College London',
    universityLogo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80',
    title: 'Biomedical & AI Candidate Pipeline Automation',
    stage: 'contract_signed',
    dealValueUsd: 190000,
    expectedCloseDate: '2026-08-20',
    probabilityPercentage: 100,
    priority: 'critical',
    assignedRep: {
      id: 'rep_01',
      name: 'Alex Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      email: 'alex.vance@genesis-edu.io',
    },
    notesCount: 13,
    lastActivityDate: '2026-08-17T17:00:00Z',
    createdAt: '2026-03-25T11:00:00Z',
    updatedAt: '2026-08-17T17:00:00Z',
  },
  {
    id: 'deal_tsinghua_12',
    universityId: 'uni_tsinghua_15',
    universityName: 'Tsinghua University',
    universityLogo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=120&auto=format&fit=crop&q=80',
    title: 'Schwarzman Scholars International Admissions Infrastructure',
    stage: 'discovery',
    dealValueUsd: 160000,
    expectedCloseDate: '2026-12-01',
    probabilityPercentage: 30,
    priority: 'high',
    assignedRep: {
      id: 'rep_03',
      name: 'David Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: 'd.chen@genesis-edu.io',
    },
    notesCount: 3,
    lastActivityDate: '2026-08-11T15:00:00Z',
    createdAt: '2026-08-05T08:00:00Z',
    updatedAt: '2026-08-11T15:00:00Z',
  },
];

let inMemoryDeals = [...MOCK_DEALS];

export const pipelineApi = {
  async getDeals(): Promise<IDeal[]> {
    try {
      if (supabase && supabase.from) {
        const { data, error } = await supabase.from('deals').select('*');
        if (!error && data && data.length > 0) {
          const rows = data as unknown as DealRow[];
          return rows.map((d) => ({
            id: d.id,
            universityId: d.university_id,
            universityName: d.university_name,
            universityLogo: d.university_logo,
            title: d.title,
            stage: d.stage as PipelineStage,
            dealValueUsd: d.deal_value_usd,
            expectedCloseDate: d.expected_close_date,
            probabilityPercentage: d.probability_percentage,
            priority: d.priority as IDeal['priority'],
            assignedRep: {
              id: d.assigned_rep_id,
              name: d.assigned_rep_name,
              avatarUrl: d.assigned_rep_avatar,
              email: d.assigned_rep_email,
            },
            notesCount: d.notes_count,
            lastActivityDate: d.last_activity_date,
            createdAt: d.created_at,
            updatedAt: d.updated_at,
          }));
        }
      }
    } catch {
      // Fallback
    }

    return [...inMemoryDeals];
  },

  async moveDealStage(dealId: string, newStage: PipelineStage): Promise<IDeal> {
    const deal = inMemoryDeals.find((d) => d.id === dealId);
    let probability = 50;
    if (newStage === 'contract_signed') probability = 100;
    else if (newStage === 'churned') probability = 0;
    else if (newStage === 'negotiation') probability = 85;
    else if (newStage === 'proposal_presented') probability = 65;
    else if (newStage === 'qualification') probability = 45;
    else if (newStage === 'discovery') probability = 25;

    const now = new Date().toISOString();

    try {
      if (supabase && supabase.from) {
        await supabase
          .from('deals')
          .update({
            stage: newStage,
            probability_percentage: probability,
            updated_at: now,
          })
          .eq('id', dealId);
      }
    } catch {
      // ignore
    }

    if (deal) {
      deal.stage = newStage;
      deal.probabilityPercentage = probability;
      deal.updatedAt = now;
      return { ...deal };
    }

    return {
      id: dealId,
      universityId: 'uni_custom',
      universityName: 'Partner University',
      universityLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
      title: 'Opportunity',
      stage: newStage,
      dealValueUsd: 100000,
      expectedCloseDate: '2026-11-30',
      probabilityPercentage: probability,
      priority: 'high',
      assignedRep: {
        id: 'rep_01',
        name: 'Alex Vance',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        email: 'alex.vance@genesis-edu.io',
      },
      notesCount: 1,
      lastActivityDate: now,
      createdAt: now,
      updatedAt: now,
    };
  },

  async createDeal(payload: Partial<IDeal>): Promise<IDeal> {
    const newDeal: IDeal = {
      id: 'deal_' + Date.now(),
      universityId: payload.universityId || 'uni_custom',
      universityName: payload.universityName || 'Partner University',
      universityLogo: payload.universityLogo || 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
      title: payload.title || 'New CRM Partnership Opportunity',
      stage: payload.stage || 'discovery',
      dealValueUsd: payload.dealValueUsd || 80000,
      expectedCloseDate: payload.expectedCloseDate || '2026-11-30',
      probabilityPercentage: payload.probabilityPercentage || 30,
      priority: payload.priority || 'medium',
      assignedRep: payload.assignedRep || {
        id: 'rep_01',
        name: 'Alex Vance',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        email: 'alex.vance@genesis-edu.io',
      },
      notesCount: 0,
      lastActivityDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      if (supabase && supabase.from) {
        await supabase.from('deals').insert({
          university_id: newDeal.universityId,
          university_name: newDeal.universityName,
          university_logo: newDeal.universityLogo,
          title: newDeal.title,
          stage: newDeal.stage,
          deal_value_usd: newDeal.dealValueUsd,
          expected_close_date: newDeal.expectedCloseDate,
          probability_percentage: newDeal.probabilityPercentage,
          priority: newDeal.priority,
          assigned_rep_id: newDeal.assignedRep.id,
          assigned_rep_name: newDeal.assignedRep.name,
          assigned_rep_avatar: newDeal.assignedRep.avatarUrl,
          assigned_rep_email: newDeal.assignedRep.email,
          notes_count: newDeal.notesCount,
          last_activity_date: newDeal.lastActivityDate,
        });
      }
    } catch {
      // ignore
    }

    inMemoryDeals.unshift(newDeal);
    return newDeal;
  },
};
