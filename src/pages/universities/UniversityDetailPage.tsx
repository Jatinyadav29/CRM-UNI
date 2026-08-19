import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useUniversityDetailQuery } from '@/entities/university/model/useUniversityQuery';
import {
  UniversityStatusBadge,
  UniversityTierBadge,
} from '@/entities/university/ui/UniversityBadge';
import { Button, Card, Skeleton } from '@/shared/ui';
import { formatCurrency, formatNumber } from '@/shared/lib/utils';
import {
  ArrowLeft,
  Globe,
  Award,
  Users,
  Percent,
  DollarSign,
  Mail,
  Phone,
  BookOpen,
  Calendar,
} from 'lucide-react';

export const UniversityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: uni, isPending } = useUniversityDetailQuery(id || '');

  if (isPending) {
    return (
      <div className="p-6 sm:p-8 flex flex-col gap-6 max-w-5xl mx-auto w-full">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-64 w-full rounded-3xl" />
        <div className="grid grid-cols-4 gap-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      </div>
    );
  }

  if (!uni) {
    return (
      <div className="p-12 text-center max-w-md mx-auto">
        <h3 className="text-lg font-bold text-slate-900">Partner Not Found</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          The requested university profile does not exist in the database.
        </p>
        <Button onClick={() => navigate('/main/universities')}>
          Back to Directory
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 flex flex-col gap-6 max-w-5xl mx-auto w-full">
      {/* Back Button */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/main/universities')}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back to University Directory
        </Button>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 text-white shadow-xl">
        <img
          src={uni.heroImageUrl}
          alt={uni.name}
          className="h-64 sm:h-72 w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={uni.logoUrl}
              alt={uni.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-xl bg-white shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <UniversityTierBadge tier={uni.tier} />
                <UniversityStatusBadge status={uni.status} />
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">
                {uni.name}
              </h2>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                {uni.city}, {uni.country} ({uni.code})
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">
              Annual Contract
            </span>
            <p className="text-xl font-black text-white">
              {formatCurrency(uni.annualContractValueUsd)}
              <span className="text-xs font-normal text-slate-300"> /yr</span>
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 flex flex-col gap-1 border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Award className="w-4 h-4 text-amber-500" />
            Global Ranking
          </div>
          <p className="text-2xl font-black text-slate-900 mt-1">
            #{uni.globalRanking}
          </p>
          <span className="text-[10px] text-slate-400 font-medium">
            World University Index
          </span>
        </Card>

        <Card className="p-4 flex flex-col gap-1 border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Users className="w-4 h-4 text-indigo-500" />
            Total Enrollment
          </div>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {formatNumber(uni.totalStudentBody)}
          </p>
          <span className="text-[10px] text-slate-400 font-medium">
            {uni.internationalStudentPercentage}% International
          </span>
        </Card>

        <Card className="p-4 flex flex-col gap-1 border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Percent className="w-4 h-4 text-rose-500" />
            Acceptance Rate
          </div>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {uni.acceptanceRate}%
          </p>
          <span className="text-[10px] text-slate-400 font-medium">
            Highly Selective
          </span>
        </Card>

        <Card className="p-4 flex flex-col gap-1 border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            Active CRM Leads
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {uni.activeLeadsCount}
          </p>
          <span className="text-[10px] text-slate-400 font-medium">
            Qualified Applicants
          </span>
        </Card>
      </div>

      {/* Two Column Layout: Programs and Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Programs Catalog */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            Partner Academic Programs ({uni.programs.length})
          </h3>

          <div className="flex flex-col gap-3">
            {uni.programs.map((prog) => {
              const capPercentage = Math.round(
                (prog.enrolledStudents / prog.intakeCap) * 100
              );
              return (
                <Card key={prog.id} className="p-4 border-slate-200 flex flex-col gap-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60">
                        {prog.degreeLevel}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-1">
                        {prog.name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-slate-900">
                        {formatCurrency(prog.annualTuitionUsd)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">/ academic year</span>
                    </div>
                  </div>

                  {/* Enrollment Progress Bar */}
                  <div className="flex flex-col gap-1 pt-1">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Enrollment Capacity</span>
                      <span className="font-bold text-slate-700">
                        {prog.enrolledStudents} / {prog.intakeCap} ({capPercentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${capPercentage}%` }}
                        className="h-full bg-indigo-600 rounded-full"
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Admissions Contact & Telemetry Info */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600" />
            Primary Contact
          </h3>

          <Card className="p-5 flex flex-col gap-4 border-slate-200">
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                {uni.contactPerson.name}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {uni.contactPerson.role}
              </p>
            </div>

            <div className="flex flex-col gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <a
                href={`mailto:${uni.contactPerson.email}`}
                className="flex items-center gap-2 text-indigo-600 hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{uni.contactPerson.email}</span>
              </a>

              <a
                href={`tel:${uni.contactPerson.phone}`}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{uni.contactPerson.phone}</span>
              </a>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-[11px] text-slate-500 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Partner since {new Date(uni.createdAt).getFullYear()}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailPage;
