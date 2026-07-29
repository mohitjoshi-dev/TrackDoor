import {
  Mail,
  CalendarDays,
  MapPin,
  Pencil,
  Quote,
} from "lucide-react";

import ProfileCardWrapper from "./ProfileCardWrapper";

export default function ProfileCard() {
  return (
    <ProfileCardWrapper className="p-8">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />
      <div className="absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-violet-500/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-col pt-2">
              <h2 className="text-3xl font-bold text-white">
                Mohit Joshi
              </h2>

              <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              Free Plan
            </div>
            </div>

            <div className="relative shrink-0">
              <div className="flex h-26 w-26 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-blue-600 text-4xl font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                MJ
              </div>
              <button className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0B1121] bg-slate-800 text-white shadow-lg transition-transform hover:scale-110">
                <Pencil size={18} />
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm text-slate-400">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-slate-500" />
              mohit@example.com
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays size={16} className="text-slate-500" />
              Joined July 2025
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-slate-500" />
              India
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6">
          <div className="flex gap-3">
            <Quote size={22} className="mt-1 text-violet-500/50" />
            <p className="italic text-slate-400">
              "Discipline today, financial freedom tomorrow."
            </p>
          </div>

          <div className="mt-6">
            <button className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </ProfileCardWrapper>
  );
}