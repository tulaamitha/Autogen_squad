
import React from 'react';
import { Curriculum } from '../types';

interface CurriculumDisplayProps {
  data: Partial<Curriculum>;
}

const CurriculumDisplay: React.FC<CurriculumDisplayProps> = ({ data }) => {
  if (!data.semesters) return null;

  return (
    <div className="space-y-16">
      <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[4rem]"></div>
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-6">
            Forge Success
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
            {data.skillDomain}
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Level', val: data.educationLevel, icon: '🎓' },
              { label: 'Industry', val: data.industryFocus, icon: '⚡' },
              { label: 'Commitment', val: `${data.weeklyHours}h/week`, icon: '🕒' }
            ].map((pill, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl flex items-center space-x-2">
                <span className="text-lg">{pill.icon}</span>
                <span className="text-xs font-bold text-slate-600">{pill.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {data.semesters.map((semester) => (
          <div key={semester.number} className="space-y-8">
            <div className="flex items-center space-x-4 ml-2">
              <div className="h-12 w-12 bg-indigo-600 text-white rounded-[1.25rem] flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-100">
                {semester.number}
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Semester Phase</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage {semester.number} of {data.semesters?.length}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {semester.courses.map((course) => (
                <div key={course.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-50 hover:-translate-y-1 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors pr-8">{course.title}</h4>
                    <span className="flex-shrink-0 text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-xl">
                      {course.credits} Credits
                    </span>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Core Knowledge</h5>
                      <div className="grid grid-cols-1 gap-3">
                        {course.topics.map((topic, i) => (
                          <div key={i} className="text-sm text-slate-600 font-medium flex items-center p-3 bg-slate-50/50 rounded-2xl border border-slate-50 group-hover:border-indigo-50 group-hover:bg-indigo-50/20 transition-colors">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Phase Outcomes</h5>
                      <div className="flex flex-wrap gap-2">
                        {course.learningOutcomes.map((outcome, i) => (
                          <span key={i} className="text-[11px] font-bold bg-white text-slate-500 px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                            {outcome}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {data.capstone && (
        <div className="glass-card rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-tr from-violet-50 to-sky-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-6 mb-10">
              <div className="p-5 bg-gradient-to-tr from-violet-600 to-indigo-500 rounded-[2rem] text-white shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tight mb-1">Final Capstone</h3>
                <p className="text-violet-600 text-xs font-bold uppercase tracking-[0.3em]">Graduation Requirement</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-2">
                <h4 className="text-2xl font-black mb-4 text-slate-900">{data.capstone.title}</h4>
                <p className="text-slate-700 text-lg leading-relaxed font-medium">
                  {data.capstone.description}
                </p>
              </div>
              
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100">
                <h5 className="text-[10px] font-black text-violet-600 uppercase tracking-widest mb-6">Core Mandates</h5>
                <ul className="space-y-4">
                  {data.capstone.requirements.map((req, i) => (
                    <li key={i} className="flex items-start group/li">
                      <span className="mr-4 text-emerald-400 bg-emerald-400/10 p-1 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-sm font-medium text-slate-300 group-hover/li:text-white transition-colors">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurriculumDisplay;
