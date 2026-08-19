import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { useUniversityDetailQuery, useEnrollStudentMutation } from '@/entities/university/model/useUniversityQuery';
import { Button, Card, Input, Skeleton } from '@/shared/ui';
import { formatCurrency } from '@/shared/lib/utils';
import {
  GraduationCap,
  Globe,
  Award,
  CheckCircle,
  FileCheck2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface EnrollmentFormValues {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  programId: string;
  gpa: string;
  notes?: string;
}

export const StudentEnrollmentPage: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const { data: uni, isPending } = useUniversityDetailQuery(universityId || '');
  const enrollMutation = useEnrollStudentMutation();

  const [submittedData, setSubmittedData] = useState<{
    referenceNumber: string;
    programName: string;
    studentName: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EnrollmentFormValues>({
    defaultValues: {
      nationality: 'International Student',
      gpa: '3.8 / 4.0 (Top 10%)',
    },
  });

  const selectedProgramId = watch('programId');

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-2xl w-full flex flex-col gap-6">
          <Skeleton className="h-44 w-full rounded-3xl" />
          <Skeleton className="h-96 w-full rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!uni) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans text-center">
        <Card className="max-w-md p-8 flex flex-col items-center gap-4">
          <GraduationCap className="w-12 h-12 text-slate-400" />
          <h2 className="text-xl font-bold text-slate-900">Institution Not Found</h2>
          <p className="text-xs text-slate-500">
            The university enrollment link is invalid or the institution is no longer accepting public enrollments.
          </p>
          <Link to="/">
            <Button size="sm">Go to Homepage</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const onSubmit = async (data: EnrollmentFormValues) => {
    const progId = data.programId || uni.programs[0]?.id || 'prog_default';
    const res = await enrollMutation.mutateAsync({
      universityId: uni.id,
      programId: progId,
      studentData: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        nationality: data.nationality,
        gpa: data.gpa,
        notes: data.notes,
      },
    });

    setSubmittedData({
      referenceNumber: res.referenceNumber,
      programName: res.programName,
      studentName: data.fullName,
    });
  };

  // Success Confirmation View
  if (submittedData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800/20 flex flex-col animate-in fade-in zoom-in-95 duration-300">
          {/* Top Banner */}
          <div className="bg-linear-to-br from-emerald-800 via-teal-900 to-slate-950 p-8 text-white text-center flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center mb-1">
              <CheckCircle className="w-8 h-8 text-emerald-300" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              Application Confirmed
            </span>
            <h2 className="text-2xl font-black text-white">
              Enrollment Submitted Successfully
            </h2>
            <p className="text-xs text-slate-300 max-w-sm">
              Your international application has been lodged directly into the {uni.name} candidate repository.
            </p>
          </div>

          {/* Certificate Details */}
          <div className="p-6 sm:p-8 flex flex-col gap-5">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <span className="text-xs text-slate-500 font-semibold uppercase">
                  Application Ref
                </span>
                <span className="text-sm font-black font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                  {submittedData.referenceNumber}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-bold text-slate-900">{submittedData.studentName}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Target University:</span>
                <span className="font-bold text-slate-900">{uni.name}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Program:</span>
                <span className="font-bold text-indigo-700">{submittedData.programName}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Intake Term:</span>
                <span className="font-bold text-slate-900">Fall 2026</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/60 text-xs text-emerald-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Admissions Confirmation Email Sent</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  The admissions committee will review your credentials and contact you within 5 business days.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSubmittedData(null)}
              >
                Submit Another Application
              </Button>
              <Link to="/">
                <Button size="sm">Genesis Portal</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* Header Banner */}
      <div className="relative bg-linear-to-b from-indigo-950 via-slate-900 to-slate-950 border-b border-slate-800 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={uni.logoUrl}
              alt={uni.name}
              className="w-20 h-20 rounded-3xl object-cover border-2 border-white/20 shadow-2xl bg-white shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-indigo-300 bg-indigo-500/30 px-2 py-0.5 rounded-full border border-indigo-400/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Official International Portal
                </span>
                <span className="text-[11px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  World #{uni.globalRanking}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {uni.name}
              </h1>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                {uni.city}, {uni.country} ({uni.code})
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-left md:text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">
              2026/2027 Admissions
            </span>
            <p className="text-sm font-black text-emerald-400 flex items-center gap-1.5 md:justify-end mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Accepting Applications
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-200">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-indigo-600" />
                Select Your Academic Program
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose from accredited undergraduate and postgraduate degree paths.
              </p>
            </div>

            {/* Program Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {uni.programs.map((prog) => {
                const isSelected = selectedProgramId === prog.id || (!selectedProgramId && prog === uni.programs[0]);

                return (
                  <label
                    key={prog.id}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-600/20'
                        : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60">
                          {prog.degreeLevel}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 mt-1">
                          {prog.name}
                        </h4>
                      </div>
                      <input
                        type="radio"
                        value={prog.id}
                        {...register('programId')}
                        defaultChecked={prog === uni.programs[0]}
                        className="accent-indigo-600 w-4 h-4 mt-1 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                      <span className="text-slate-500">Annual Tuition:</span>
                      <span className="font-extrabold text-slate-900">
                        {formatCurrency(prog.annualTuitionUsd)}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Student Personal Information */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Applicant Personal Information
                </h3>
                <p className="text-xs text-slate-500">
                  Please verify your legal passport information.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Legal Name"
                  placeholder="e.g. Liam Anderson"
                  error={errors.fullName?.message}
                  {...register('fullName', { required: 'Legal name is required' })}
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="liam.anderson@example.com"
                  error={errors.email?.message}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Valid email is required',
                    },
                  })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Phone Number (with country code)"
                  placeholder="+1 555 019 283"
                  error={errors.phone?.message}
                  {...register('phone', { required: 'Phone is required' })}
                />

                <Input
                  label="Nationality / Citizenship"
                  placeholder="Canada"
                  {...register('nationality', { required: 'Nationality is required' })}
                />

                <Input
                  label="Academic GPA / Equivalent"
                  placeholder="3.8 / 4.0"
                  {...register('gpa')}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
                  Statement of Interest / Academic Background (Optional)
                </label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  placeholder="Briefly describe your academic background and motivation for joining this program..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl p-3 outline-none focus:bg-white focus:border-slate-800 transition-all"
                />
              </div>
            </div>

            {/* Submission Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Next review batch closes: September 15, 2026</span>
              </div>

              <Button
                type="submit"
                size="lg"
                isLoading={enrollMutation.isPending}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 shadow-lg shadow-indigo-600/20"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollmentPage;
