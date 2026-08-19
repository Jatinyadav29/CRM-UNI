import { supabase } from '@/shared/api/supabaseClient';
import type { Database } from '@/shared/api/supabaseTypes';
import type { IUniversity, UniversityFilters } from '../model/types';

type UniRow = Database['public']['Tables']['universities']['Row'];

export const MOCK_UNIVERSITIES: IUniversity[] = [
  {
    id: 'uni_oxford_01',
    name: 'University of Oxford',
    code: 'OXF',
    slug: 'university-of-oxford',
    country: 'United Kingdom',
    city: 'Oxford',
    logoUrl: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 1 (Global Elite)',
    status: 'Active Partner',
    globalRanking: 1,
    acceptanceRate: 14.2,
    totalStudentBody: 24000,
    internationalStudentPercentage: 45,
    annualContractValueUsd: 145000,
    activeLeadsCount: 342,
    contactPerson: {
      name: 'Dr. Eleanor Campbell',
      email: 'e.campbell@ox.ac.uk',
      phone: '+44 1865 270000',
      role: 'Head of Global Recruitment',
    },
    programs: [
      { id: 'prog_ox_01', name: 'MSc Computer Science', degreeLevel: 'Postgraduate', intakeCap: 120, enrolledStudents: 118, annualTuitionUsd: 42000 },
      { id: 'prog_ox_02', name: 'MBA Executive', degreeLevel: 'Postgraduate', intakeCap: 200, enrolledStudents: 195, annualTuitionUsd: 85000 },
      { id: 'prog_ox_03', name: 'BA Philosophy, Politics & Economics', degreeLevel: 'Undergraduate', intakeCap: 250, enrolledStudents: 248, annualTuitionUsd: 38000 },
    ],
    tags: ['Russell Group', 'Ivy Plus', 'Research Intensive'],
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2026-08-10T14:30:00Z',
  },
  {
    id: 'uni_stanford_02',
    name: 'Stanford University',
    code: 'STAN',
    slug: 'stanford-university',
    country: 'United States',
    city: 'Stanford, CA',
    logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 1 (Global Elite)',
    status: 'Active Partner',
    globalRanking: 3,
    acceptanceRate: 3.9,
    totalStudentBody: 17500,
    internationalStudentPercentage: 34,
    annualContractValueUsd: 210000,
    activeLeadsCount: 520,
    contactPerson: {
      name: 'Marcus Thorne',
      email: 'mthorne@stanford.edu',
      phone: '+1 650 723 2300',
      role: 'Director of International Outreach',
    },
    programs: [
      { id: 'prog_stan_01', name: 'MS in Artificial Intelligence', degreeLevel: 'Postgraduate', intakeCap: 150, enrolledStudents: 149, annualTuitionUsd: 62000 },
      { id: 'prog_stan_02', name: 'BS in Computer Science', degreeLevel: 'Undergraduate', intakeCap: 300, enrolledStudents: 295, annualTuitionUsd: 58000 },
    ],
    tags: ['Silicon Valley Hub', 'AI Leader', 'Tier 1'],
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2026-08-12T16:00:00Z',
  },
  {
    id: 'uni_cambridge_03',
    name: 'University of Cambridge',
    code: 'CAM',
    slug: 'university-of-cambridge',
    country: 'United Kingdom',
    city: 'Cambridge',
    logoUrl: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 1 (Global Elite)',
    status: 'Active Partner',
    globalRanking: 2,
    acceptanceRate: 18.0,
    totalStudentBody: 21600,
    internationalStudentPercentage: 39,
    annualContractValueUsd: 175000,
    activeLeadsCount: 460,
    contactPerson: {
      name: 'Dr. Arthur Pendelton',
      email: 'a.pendelton@cam.ac.uk',
      phone: '+44 1223 337733',
      role: 'Director of Global Admissions',
    },
    programs: [
      { id: 'prog_cam_01', name: 'MPhil in Machine Learning', degreeLevel: 'Postgraduate', intakeCap: 80, enrolledStudents: 78, annualTuitionUsd: 46000 },
      { id: 'prog_cam_02', name: 'BA Economics', degreeLevel: 'Undergraduate', intakeCap: 180, enrolledStudents: 176, annualTuitionUsd: 39000 },
    ],
    tags: ['Russell Group', 'Silicon Fen', 'Global Top 3'],
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2026-08-14T11:00:00Z',
  },
  {
    id: 'uni_mit_04',
    name: 'Massachusetts Institute of Technology',
    code: 'MIT',
    slug: 'massachusetts-institute-of-technology',
    country: 'United States',
    city: 'Cambridge, MA',
    logoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 1 (Global Elite)',
    status: 'Active Partner',
    globalRanking: 1,
    acceptanceRate: 4.1,
    totalStudentBody: 11900,
    internationalStudentPercentage: 33,
    annualContractValueUsd: 240000,
    activeLeadsCount: 590,
    contactPerson: {
      name: 'Victoria Vance',
      email: 'vvance@mit.edu',
      phone: '+1 617 253 1000',
      role: 'Dean of International Alliances',
    },
    programs: [
      { id: 'prog_mit_01', name: 'MEng in EECS', degreeLevel: 'Postgraduate', intakeCap: 220, enrolledStudents: 218, annualTuitionUsd: 64000 },
      { id: 'prog_mit_02', name: 'Master of Finance', degreeLevel: 'Postgraduate', intakeCap: 120, enrolledStudents: 119, annualTuitionUsd: 88000 },
    ],
    tags: ['STEM World #1', 'Kendall Square', 'DeepTech'],
    createdAt: '2024-01-20T08:30:00Z',
    updatedAt: '2026-08-16T15:00:00Z',
  },
  {
    id: 'uni_harvard_05',
    name: 'Harvard University',
    code: 'HARV',
    slug: 'harvard-university',
    country: 'United States',
    city: 'Cambridge, MA',
    logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 1 (Global Elite)',
    status: 'Contract Pending',
    globalRanking: 4,
    acceptanceRate: 3.4,
    totalStudentBody: 23700,
    internationalStudentPercentage: 26,
    annualContractValueUsd: 225000,
    activeLeadsCount: 480,
    contactPerson: {
      name: 'Robert Kingsley',
      email: 'kingsley@harvard.edu',
      phone: '+1 617 495 1000',
      role: 'VP Global Academic Strategy',
    },
    programs: [
      { id: 'prog_harv_01', name: 'MBA General Management', degreeLevel: 'Postgraduate', intakeCap: 900, enrolledStudents: 890, annualTuitionUsd: 79500 },
      { id: 'prog_harv_02', name: 'Master in Public Policy', degreeLevel: 'Postgraduate', intakeCap: 240, enrolledStudents: 236, annualTuitionUsd: 61000 },
    ],
    tags: ['Ivy League', 'Global Endowment', 'Leadership'],
    createdAt: '2024-04-12T09:00:00Z',
    updatedAt: '2026-08-17T12:30:00Z',
  },
  {
    id: 'uni_eth_06',
    name: 'ETH Zurich',
    code: 'ETH',
    slug: 'eth-zurich',
    country: 'Switzerland',
    city: 'Zurich',
    logoUrl: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 1 (Global Elite)',
    status: 'Contract Pending',
    globalRanking: 7,
    acceptanceRate: 27.0,
    totalStudentBody: 25000,
    internationalStudentPercentage: 40,
    annualContractValueUsd: 115000,
    activeLeadsCount: 290,
    contactPerson: {
      name: 'Sabine Weber',
      email: 'weber.s@ethz.ch',
      phone: '+41 44 632 11 11',
      role: 'Head of Global Partnerships',
    },
    programs: [
      { id: 'prog_eth_01', name: 'MSc Robotics & Autonomous Systems', degreeLevel: 'Postgraduate', intakeCap: 90, enrolledStudents: 85, annualTuitionUsd: 25000 },
      { id: 'prog_eth_02', name: 'MSc Data Science', degreeLevel: 'Postgraduate', intakeCap: 110, enrolledStudents: 105, annualTuitionUsd: 25000 },
    ],
    tags: ['STEM Focused', 'European Leader', 'Quantum Hub'],
    createdAt: '2024-06-10T11:00:00Z',
    updatedAt: '2026-08-15T09:20:00Z',
  },
  {
    id: 'uni_nus_07',
    name: 'National University of Singapore',
    code: 'NUS',
    slug: 'national-university-of-singapore',
    country: 'Singapore',
    city: 'Singapore',
    logoUrl: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 1 (Global Elite)',
    status: 'In Negotiation',
    globalRanking: 8,
    acceptanceRate: 15.0,
    totalStudentBody: 38000,
    internationalStudentPercentage: 30,
    annualContractValueUsd: 130000,
    activeLeadsCount: 410,
    contactPerson: {
      name: 'Chen Wei Ling',
      email: 'chen.wl@nus.edu.sg',
      phone: '+65 6516 6666',
      role: 'Dean of Global Admissions',
    },
    programs: [
      { id: 'prog_nus_01', name: 'Master of Computing (Infocomm)', degreeLevel: 'Postgraduate', intakeCap: 180, enrolledStudents: 175, annualTuitionUsd: 48000 },
      { id: 'prog_nus_02', name: 'BSc Business Analytics', degreeLevel: 'Undergraduate', intakeCap: 220, enrolledStudents: 218, annualTuitionUsd: 36000 },
    ],
    tags: ['Asia Leader', 'Fintech', 'Global Top 10'],
    createdAt: '2024-04-20T08:00:00Z',
    updatedAt: '2026-08-16T12:00:00Z',
  },
  {
    id: 'uni_ntu_08',
    name: 'Nanyang Technological University',
    code: 'NTU',
    slug: 'nanyang-technological-university',
    country: 'Singapore',
    city: 'Singapore',
    logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1568792923760-d70635a89fa8?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 1 (Global Elite)',
    status: 'In Negotiation',
    globalRanking: 15,
    acceptanceRate: 19.0,
    totalStudentBody: 33000,
    internationalStudentPercentage: 28,
    annualContractValueUsd: 110000,
    activeLeadsCount: 360,
    contactPerson: {
      name: 'Prof. Jason Koh',
      email: 'jkoh@ntu.edu.sg',
      phone: '+65 6790 5888',
      role: 'International Outreach Director',
    },
    programs: [
      { id: 'prog_ntu_01', name: 'MSc in Cybersecurity', degreeLevel: 'Postgraduate', intakeCap: 130, enrolledStudents: 125, annualTuitionUsd: 44000 },
    ],
    tags: ['Engineering Hub', 'Smart Campus', 'Singapore Top 2'],
    createdAt: '2024-05-14T09:30:00Z',
    updatedAt: '2026-08-15T14:15:00Z',
  },
  {
    id: 'uni_tokyo_09',
    name: 'The University of Tokyo',
    code: 'UTokyo',
    slug: 'university-of-tokyo',
    country: 'Japan',
    city: 'Tokyo',
    logoUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1568792923760-d70635a89fa8?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 2 (National Leader)',
    status: 'Lead',
    globalRanking: 28,
    acceptanceRate: 34.0,
    totalStudentBody: 28000,
    internationalStudentPercentage: 18,
    annualContractValueUsd: 75000,
    activeLeadsCount: 180,
    contactPerson: {
      name: 'Prof. Kenji Takahashi',
      email: 'k.takahashi@u-tokyo.ac.jp',
      phone: '+81 3 5841 1234',
      role: 'International Exchange Center',
    },
    programs: [
      { id: 'prog_ut_01', name: 'PEAK Global Science Course', degreeLevel: 'Undergraduate', intakeCap: 80, enrolledStudents: 74, annualTuitionUsd: 22000 },
    ],
    tags: ['Top Japan', 'Research', 'Imperial'],
    createdAt: '2025-02-01T07:30:00Z',
    updatedAt: '2026-08-14T11:00:00Z',
  },
  {
    id: 'uni_sydney_10',
    name: 'University of Sydney',
    code: 'USYD',
    slug: 'university-of-sydney',
    country: 'Australia',
    city: 'Sydney',
    logoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 2 (National Leader)',
    status: 'Active Partner',
    globalRanking: 19,
    acceptanceRate: 30.0,
    totalStudentBody: 73000,
    internationalStudentPercentage: 42,
    annualContractValueUsd: 165000,
    activeLeadsCount: 680,
    contactPerson: {
      name: 'Sarah Jenkins',
      email: 's.jenkins@sydney.edu.au',
      phone: '+61 2 9351 2222',
      role: 'Senior Partnership Manager',
    },
    programs: [
      { id: 'prog_usyd_01', name: 'Master of Data Science', degreeLevel: 'Postgraduate', intakeCap: 250, enrolledStudents: 245, annualTuitionUsd: 49000 },
      { id: 'prog_usyd_02', name: 'Bachelor of Commerce', degreeLevel: 'Undergraduate', intakeCap: 600, enrolledStudents: 590, annualTuitionUsd: 46000 },
    ],
    tags: ['Group of Eight', 'APAC Top Tier', 'High Intake'],
    createdAt: '2024-05-18T10:00:00Z',
    updatedAt: '2026-08-17T15:45:00Z',
  },
  {
    id: 'uni_melbourne_11',
    name: 'University of Melbourne',
    code: 'MELB',
    slug: 'university-of-melbourne',
    country: 'Australia',
    city: 'Melbourne',
    logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 2 (National Leader)',
    status: 'Active Partner',
    globalRanking: 14,
    acceptanceRate: 28.5,
    totalStudentBody: 65000,
    internationalStudentPercentage: 44,
    annualContractValueUsd: 155000,
    activeLeadsCount: 610,
    contactPerson: {
      name: 'Andrew McDonald',
      email: 'mcdonald.a@unimelb.edu.au',
      phone: '+61 3 9035 5511',
      role: 'Head of Global Engagement',
    },
    programs: [
      { id: 'prog_melb_01', name: 'Master of Information Technology', degreeLevel: 'Postgraduate', intakeCap: 300, enrolledStudents: 292, annualTuitionUsd: 51000 },
    ],
    tags: ['Group of Eight', 'Australia #1', 'High Research'],
    createdAt: '2024-04-05T09:00:00Z',
    updatedAt: '2026-08-16T10:00:00Z',
  },
  {
    id: 'uni_imperial_12',
    name: 'Imperial College London',
    code: 'ICL',
    slug: 'imperial-college-london',
    country: 'United Kingdom',
    city: 'London',
    logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 1 (Global Elite)',
    status: 'Active Partner',
    globalRanking: 6,
    acceptanceRate: 14.3,
    totalStudentBody: 20000,
    internationalStudentPercentage: 58,
    annualContractValueUsd: 190000,
    activeLeadsCount: 540,
    contactPerson: {
      name: 'Dr. Fiona Sterling',
      email: 'f.sterling@imperial.ac.uk',
      phone: '+44 20 7589 5111',
      role: 'Director of Industry Partnerships',
    },
    programs: [
      { id: 'prog_icl_01', name: 'MSc Computing (AI & ML)', degreeLevel: 'Postgraduate', intakeCap: 160, enrolledStudents: 158, annualTuitionUsd: 45000 },
      { id: 'prog_icl_02', name: 'MSc Advanced Materials Science', degreeLevel: 'Postgraduate', intakeCap: 100, enrolledStudents: 96, annualTuitionUsd: 39000 },
    ],
    tags: ['STEM Powerhouse', 'London Biotech', 'Russell Group'],
    createdAt: '2024-03-12T11:00:00Z',
    updatedAt: '2026-08-17T16:00:00Z',
  },
  {
    id: 'uni_toronto_13',
    name: 'University of Toronto',
    code: 'UofT',
    slug: 'university-of-toronto',
    country: 'Canada',
    city: 'Toronto, ON',
    logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 2 (National Leader)',
    status: 'Active Partner',
    globalRanking: 21,
    acceptanceRate: 43.0,
    totalStudentBody: 97000,
    internationalStudentPercentage: 27,
    annualContractValueUsd: 140000,
    activeLeadsCount: 720,
    contactPerson: {
      name: 'Claire Dupont',
      email: 'c.dupont@utoronto.ca',
      phone: '+1 416 978 2011',
      role: 'International Admissions Office',
    },
    programs: [
      { id: 'prog_uoft_01', name: 'Master of Financial Insurance', degreeLevel: 'Postgraduate', intakeCap: 120, enrolledStudents: 114, annualTuitionUsd: 48000 },
    ],
    tags: ['Canada #1', 'Vector AI Hub', 'U15'],
    createdAt: '2024-06-22T08:00:00Z',
    updatedAt: '2026-08-15T10:30:00Z',
  },
  {
    id: 'uni_psl_14',
    name: 'Université PSL',
    code: 'PSL',
    slug: 'universite-psl',
    country: 'France',
    city: 'Paris',
    logoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 2 (National Leader)',
    status: 'Lead',
    globalRanking: 24,
    acceptanceRate: 12.0,
    totalStudentBody: 17000,
    internationalStudentPercentage: 22,
    annualContractValueUsd: 85000,
    activeLeadsCount: 220,
    contactPerson: {
      name: 'Henri Beaulieu',
      email: 'h.beaulieu@psl.eu',
      phone: '+33 1 85 76 49 00',
      role: 'Head of International Relations',
    },
    programs: [
      { id: 'prog_psl_01', name: 'Master in Quantitative Economics', degreeLevel: 'Postgraduate', intakeCap: 90, enrolledStudents: 87, annualTuitionUsd: 18000 },
    ],
    tags: ['Top France', 'Grandes Écoles', 'ENS Hub'],
    createdAt: '2025-01-10T12:00:00Z',
    updatedAt: '2026-08-12T09:00:00Z',
  },
  {
    id: 'uni_tsinghua_15',
    name: 'Tsinghua University',
    code: 'THU',
    slug: 'tsinghua-university',
    country: 'China',
    city: 'Beijing',
    logoUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=120&auto=format&fit=crop&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1568792923760-d70635a89fa8?w=1200&auto=format&fit=crop&q=80',
    tier: 'Tier 1 (Global Elite)',
    status: 'In Negotiation',
    globalRanking: 12,
    acceptanceRate: 2.0,
    totalStudentBody: 53000,
    internationalStudentPercentage: 15,
    annualContractValueUsd: 160000,
    activeLeadsCount: 510,
    contactPerson: {
      name: 'Prof. Li Wei',
      email: 'w.li@tsinghua.edu.cn',
      phone: '+86 10 6279 3001',
      role: 'Global Admissions Dean',
    },
    programs: [
      { id: 'prog_thu_01', name: 'Schwarzman Scholars Master in Global Affairs', degreeLevel: 'Postgraduate', intakeCap: 150, enrolledStudents: 148, annualTuitionUsd: 65000 },
      { id: 'prog_thu_02', name: 'Global Manufacturing & Supply Chain Engineering', degreeLevel: 'Postgraduate', intakeCap: 120, enrolledStudents: 116, annualTuitionUsd: 32000 },
    ],
    tags: ['C9 League', 'Global Superpower', 'Schwarzman'],
    createdAt: '2024-05-02T08:00:00Z',
    updatedAt: '2026-08-16T11:00:00Z',
  },
];

let inMemoryUniversities = [...MOCK_UNIVERSITIES];

export const universityApi = {
  async getUniversities(filters?: UniversityFilters): Promise<IUniversity[]> {
    try {
      if (supabase && supabase.from) {
        let query = supabase.from('universities').select('*');

        if (filters?.tier) query = query.eq('tier', filters.tier);
        if (filters?.status) query = query.eq('status', filters.status);
        if (filters?.country) query = query.eq('country', filters.country);

        if (filters?.search) {
          const s = filters.search.trim();
          query = query.or(`name.ilike.%${s}%,code.ilike.%${s}%,city.ilike.%${s}%,country.ilike.%${s}%`);
        }

        if (filters?.sortBy === 'ranking') {
          query = query.order('global_ranking', { ascending: filters.sortOrder !== 'desc' });
        } else if (filters?.sortBy === 'contractValue') {
          query = query.order('annual_contract_value_usd', { ascending: filters.sortOrder === 'asc' });
        } else if (filters?.sortBy === 'leads') {
          query = query.order('active_leads_count', { ascending: filters.sortOrder === 'asc' });
        } else if (filters?.sortBy === 'name') {
          query = query.order('name', { ascending: filters.sortOrder !== 'desc' });
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          const rows = data as unknown as UniRow[];
          return rows.map((row) => ({
            id: row.id,
            name: row.name,
            code: row.code,
            slug: row.slug,
            country: row.country,
            city: row.city,
            logoUrl: row.logo_url,
            heroImageUrl: row.hero_image_url,
            tier: row.tier as IUniversity['tier'],
            status: row.status as IUniversity['status'],
            globalRanking: row.global_ranking,
            acceptanceRate: row.acceptance_rate,
            totalStudentBody: row.total_student_body,
            internationalStudentPercentage: row.international_student_percentage,
            annualContractValueUsd: row.annual_contract_value_usd,
            activeLeadsCount: row.active_leads_count,
            contactPerson: {
              name: row.contact_name,
              email: row.contact_email,
              phone: row.contact_phone,
              role: row.contact_role,
            },
            programs: (row.programs as unknown as IUniversity['programs']) || [],
            tags: row.tags || [],
            createdAt: row.created_at,
            updatedAt: row.updated_at,
          }));
        }
      }
    } catch {
      // Fallback
    }

    // Filter in-memory seed dataset
    let results = [...inMemoryUniversities];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.code.toLowerCase().includes(q) ||
          u.city.toLowerCase().includes(q) ||
          u.country.toLowerCase().includes(q)
      );
    }
    if (filters?.tier) {
      results = results.filter((u) => u.tier === filters.tier);
    }
    if (filters?.status) {
      results = results.filter((u) => u.status === filters.status);
    }
    if (filters?.country) {
      results = results.filter((u) => u.country === filters.country);
    }

    if (filters?.sortBy === 'ranking') {
      results.sort((a, b) => (filters.sortOrder === 'desc' ? b.globalRanking - a.globalRanking : a.globalRanking - b.globalRanking));
    } else if (filters?.sortBy === 'contractValue') {
      results.sort((a, b) => (filters.sortOrder === 'asc' ? a.annualContractValueUsd - b.annualContractValueUsd : b.annualContractValueUsd - a.annualContractValueUsd));
    } else if (filters?.sortBy === 'leads') {
      results.sort((a, b) => (filters.sortOrder === 'asc' ? a.activeLeadsCount - b.activeLeadsCount : b.activeLeadsCount - a.activeLeadsCount));
    } else if (filters?.sortBy === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    return results;
  },

  async getUniversityById(id: string): Promise<IUniversity | null> {
    try {
      if (supabase && supabase.from) {
        const { data, error } = await supabase
          .from('universities')
          .select('*')
          .or(`id.eq.${id},slug.eq.${id}`)
          .maybeSingle();

        if (!error && data) {
          const row = data as unknown as UniRow;
          return {
            id: row.id,
            name: row.name,
            code: row.code,
            slug: row.slug,
            country: row.country,
            city: row.city,
            logoUrl: row.logo_url,
            heroImageUrl: row.hero_image_url,
            tier: row.tier as IUniversity['tier'],
            status: row.status as IUniversity['status'],
            globalRanking: row.global_ranking,
            acceptanceRate: row.acceptance_rate,
            totalStudentBody: row.total_student_body,
            internationalStudentPercentage: row.international_student_percentage,
            annualContractValueUsd: row.annual_contract_value_usd,
            activeLeadsCount: row.active_leads_count,
            contactPerson: {
              name: row.contact_name,
              email: row.contact_email,
              phone: row.contact_phone,
              role: row.contact_role,
            },
            programs: (row.programs as unknown as IUniversity['programs']) || [],
            tags: row.tags || [],
            createdAt: row.created_at,
            updatedAt: row.updated_at,
          };
        }
      }
    } catch {
      // Fallback
    }

    const uni = inMemoryUniversities.find((u) => u.id === id || u.slug === id);
    return uni || null;
  },

  async createUniversity(payload: Partial<IUniversity>): Promise<IUniversity> {
    const newUni: IUniversity = {
      id: 'uni_' + Date.now(),
      name: payload.name || 'New University Partner',
      code: payload.code || 'UNI',
      slug: (payload.name || 'new-university').toLowerCase().replace(/\s+/g, '-'),
      country: payload.country || 'United States',
      city: payload.city || 'Boston',
      logoUrl: payload.logoUrl || 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
      heroImageUrl: payload.heroImageUrl || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
      tier: payload.tier || 'Tier 2 (National Leader)',
      status: payload.status || 'Lead',
      globalRanking: payload.globalRanking || 150,
      acceptanceRate: payload.acceptanceRate || 25,
      totalStudentBody: payload.totalStudentBody || 18000,
      internationalStudentPercentage: payload.internationalStudentPercentage || 22,
      annualContractValueUsd: payload.annualContractValueUsd || 50000,
      activeLeadsCount: payload.activeLeadsCount || 100,
      contactPerson: payload.contactPerson || {
        name: 'Admissions Office',
        email: 'admissions@university.edu',
        phone: '+1 555 0192',
        role: 'Partnerships Coordinator',
      },
      programs: payload.programs || [],
      tags: payload.tags || ['Partner', 'Accredited'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      if (supabase && supabase.from) {
        await supabase.from('universities').insert({
          name: newUni.name,
          code: newUni.code,
          slug: newUni.slug,
          country: newUni.country,
          city: newUni.city,
          logo_url: newUni.logoUrl,
          hero_image_url: newUni.heroImageUrl,
          tier: newUni.tier,
          status: newUni.status,
          global_ranking: newUni.globalRanking,
          acceptance_rate: newUni.acceptanceRate,
          total_student_body: newUni.totalStudentBody,
          international_student_percentage: newUni.internationalStudentPercentage,
          annual_contract_value_usd: newUni.annualContractValueUsd,
          active_leads_count: newUni.activeLeadsCount,
          contact_name: newUni.contactPerson.name,
          contact_email: newUni.contactPerson.email,
          contact_phone: newUni.contactPerson.phone,
          contact_role: newUni.contactPerson.role,
          programs: newUni.programs as unknown as Database['public']['Tables']['universities']['Row']['programs'],
          tags: newUni.tags,
        });
      }
    } catch {
      // ignore
    }

    inMemoryUniversities.unshift(newUni);
    return newUni;
  },

  async enrollStudent(
    universityId: string,
    programId: string,
    studentData: {
      fullName: string;
      email: string;
      phone: string;
      nationality: string;
      gpa?: string;
      notes?: string;
    }
  ): Promise<{ success: boolean; referenceNumber: string; programName: string }> {
    const uni = inMemoryUniversities.find((u) => u.id === universityId || u.slug === universityId);
    let programName = 'Selected Academic Program';

    if (uni) {
      uni.activeLeadsCount += 1;
      uni.totalStudentBody += 1;
      uni.updatedAt = new Date().toISOString();

      const prog = uni.programs.find((p) => p.id === programId);
      if (prog) {
        prog.enrolledStudents += 1;
        programName = prog.name;
      }
    }

    const referenceNumber = `APP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      if (supabase && supabase.from) {
        // Attempt to log enrollment to Supabase
        await supabase.from('enrollments' as unknown as 'universities').insert({
          university_id: universityId,
          program_id: programId,
          student_name: studentData.fullName,
          student_email: studentData.email,
          student_phone: studentData.phone,
          nationality: studentData.nationality,
          reference_number: referenceNumber,
        } as unknown as Database['public']['Tables']['universities']['Insert']);
      }
    } catch {
      // ignore
    }

    return {
      success: true,
      referenceNumber,
      programName,
    };
  },
};

