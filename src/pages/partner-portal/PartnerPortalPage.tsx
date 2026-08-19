import React, { useState } from 'react';
import { useAppSelector } from '@/app/store/hooks';
import { useUniversityDetailQuery } from '@/entities/university/model/useUniversityQuery';
import {
  UniversityStatusBadge,
  UniversityTierBadge,
} from '@/entities/university/ui/UniversityBadge';
import { Button, Card, Skeleton } from '@/shared/ui';
import { formatCurrency, formatNumber } from '@/shared/lib/utils';
import { toast } from 'react-toastify';
import {
  Copy,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Users,
  BookOpen,
  Award,
  Calendar,
  Sparkles,
  Link as LinkIcon,
} from 'lucide-react';
import { Link } from 'react-router';

export const PartnerPortalPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const universityId = user?.universityId || 'uni_oxford_01';
  const { data: uni, isPending } = useUniversityDetailQuery(universityId);
  const [copied, setCopied] = useState(false);

  const enrollmentLink = `${window.location.origin}/enroll/${universityId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(enrollmentLink);
    setCopied(true);
    toast.success('Public Enrollment Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  if (isPending) {
    return (
      <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full">
        <Skeleton className="h-44 w-full rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!uni) {
    return (
      <div className="p-12 text-center max-w-md mx-auto">
        <h3 className="text-lg font-bold text-slate-900">Partner Profile Not Found</h3>
        <p className="text-xs text-slate-500 font-medium mt-1">
          No university is assigned to this partner profile.
        </p>
      </div>
    );
  }

  const totalCapacity = uni.programs.reduce((sum, p) => sum + p.intakeCap, 0);
  const totalEnrolled = uni.programs.reduce((sum, p) => sum + p.enrolledStudents, 0);
  const enrollmentPercentage = totalCapacity > 0 ? Math.round((totalEnrolled / totalCapacity) * 100) : 0;

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full font-sans">
      {/* Partner Notice Header: Clean White Card */}
      <Card className="p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={uni.logoUrl}
            alt={uni.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-100 shadow-sm bg-white shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" />
                Verified Partner Portal
              </span>
              <UniversityTierBadge tier={uni.tier} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {uni.name}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {uni.city}, {uni.country} ({uni.code}) · Representative: {user?.fullName || 'Partner Admin'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <UniversityStatusBadge status={uni.status} />
        </div>
      </Card>

      {/* MoU Document & Verification Badge Card */}
      <Card className="p-5 sm:p-6 bg-blue-50/40 border-blue-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-slate-900">
                Institutional Partnership MoU & Agreement
              </h4>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Active & Legally Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Ref: MOU-{uni.code}-2026-V8 · Contract ARR: <strong>{formatCurrency(uni.annualContractValueUsd)}</strong> · Valid through Dec 2028
            </p>
          </div>
        </div>

        {/* Public Link Generator Trigger */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button
            size="sm"
            onClick={handleCopyLink}
            variant="primary"
            leftIcon={copied ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
          >
            {copied ? 'Link Copied!' : 'Copy Enrollment Link'}
          </Button>

          <Link to={`/enroll/${uni.id}`} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              variant="outline"
              leftIcon={<ExternalLink className="w-4 h-4" />}
            >
              Open Form
            </Button>
          </Link>
        </div>
      </Card>

      {/* Real-time Student Enrollment & Telemetry Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        <Card className="p-5 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase">
            <Users className="w-4 h-4 text-blue-600" />
            Total Enrolled
          </div>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {formatNumber(totalEnrolled)}
          </p>
          <span className="text-[11px] text-slate-500 font-medium">
            Across {uni.programs.length} active programs
          </span>
        </Card>

        <Card className="p-5 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Intake Capacity
          </div>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {formatNumber(totalCapacity)}
          </p>
          <span className="text-[11px] text-slate-500 font-medium">
            {enrollmentPercentage}% filled for 2026/27
          </span>
        </Card>

        <Card className="p-5 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase">
            <Award className="w-4 h-4 text-amber-500" />
            Active CRM Leads
          </div>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {uni.activeLeadsCount}
          </p>
          <span className="text-[11px] text-slate-500 font-medium">
            Verified candidate inquiries
          </span>
        </Card>

        <Card className="p-5 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase">
            <Calendar className="w-4 h-4 text-rose-500" />
            Admissions Status
          </div>
          <p className="text-base font-extrabold text-emerald-600 mt-2">
            Open for Applications
          </p>
          <span className="text-[11px] text-slate-500 font-medium">
            Fall 2026 Cohort
          </span>
        </Card>
      </div>

      {/* Program Capacity & Enrollment Breakdown */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Academic Programs & Student Cohort Allocation
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Live capacity monitoring for each accredited degree program
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            Direct Link: <code className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg text-[11px] text-slate-700 font-mono">/enroll/{uni.id}</code>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {uni.programs.map((prog) => {
            const capPercent = Math.min(100, Math.round((prog.enrolledStudents / prog.intakeCap) * 100));
            const spotsRemaining = Math.max(0, prog.intakeCap - prog.enrolledStudents);

            return (
              <Card key={prog.id} className="p-5 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                        {prog.degreeLevel}
                      </span>
                      <h4 className="font-bold text-base text-slate-900 mt-1.5">
                        {prog.name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-slate-900">
                        {formatCurrency(prog.annualTuitionUsd)}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium block">/ academic yr</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>
                      Enrolled: <strong>{prog.enrolledStudents}</strong> / {prog.intakeCap}
                    </span>
                    <span className="font-bold text-blue-600">{capPercent}% Cap</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${capPercent}%` }}
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium text-right">
                    {spotsRemaining} enrollment spots remaining
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Share & Direct Enrollment Link Box */}
      <Card className="p-6 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
            <LinkIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Public Student Self-Enrollment URL
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Share this dedicated link with applicants, international agencies, and marketing portals.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            readOnly
            value={enrollmentLink}
            className="w-full md:w-80 bg-slate-50 border border-slate-100 text-slate-900 text-xs px-3 py-2 rounded-xl outline-none select-all font-mono focus:border-blue-600"
          />
          <Button
            size="sm"
            onClick={handleCopyLink}
            className="shrink-0"
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PartnerPortalPage;
