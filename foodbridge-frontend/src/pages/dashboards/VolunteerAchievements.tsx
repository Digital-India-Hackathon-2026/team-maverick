import { Award, Star, Zap, Heart, Shield, Navigation, Gift, Trophy, CheckCircle2, Lock } from 'lucide-react';

export default function VolunteerAchievements() {
  const nextMilestone = {
    title: 'Community Hero',
    current: 312,
    target: 500,
    unit: 'Deliveries'
  };

  const progressPercentage = (nextMilestone.current / nextMilestone.target) * 100;

  const achievements = [
    { id: 1, title: 'First Delivery', description: 'Complete your very first delivery.', icon: Navigation, unlocked: true, date: 'Aug 12, 2026', color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 2, title: '10 Deliveries', description: 'Complete 10 successful deliveries.', icon: Award, unlocked: true, date: 'Aug 28, 2026', color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { id: 3, title: 'Speed Demon', description: 'Average delivery time under 30 mins.', icon: Zap, unlocked: true, date: 'Sep 05, 2026', color: 'text-amber-500', bg: 'bg-amber-100' },
    { id: 4, title: '100 Meals Saved', description: 'Deliver enough food for 100 meals.', icon: Heart, unlocked: true, date: 'Sep 15, 2026', color: 'text-red-500', bg: 'bg-red-100' },
    { id: 5, title: 'Trusted Partner', description: 'Maintain a 4.8+ rating for a month.', icon: Shield, unlocked: true, date: 'Oct 01, 2026', color: 'text-indigo-500', bg: 'bg-indigo-100' },
    { id: 6, title: 'Weekend Warrior', description: 'Complete 5 deliveries on weekends.', icon: Star, unlocked: true, date: 'Oct 15, 2026', color: 'text-purple-500', bg: 'bg-purple-100' },
    { id: 7, title: 'Community Hero', description: 'Complete 500 successful deliveries.', icon: Trophy, unlocked: false, progress: 62, color: 'text-gray-400', bg: 'bg-gray-100' },
    { id: 8, title: '1,000 Meals Saved', description: 'Deliver enough food for 1,000 meals.', icon: Gift, unlocked: false, progress: 98, color: 'text-gray-400', bg: 'bg-gray-100' },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Achievements</h1>
        <p className="text-sm text-gray-500 mt-1">Unlock badges by reaching new delivery milestones.</p>
      </div>

      {/* Next Milestone Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-6 md:p-8 shadow-lg text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-10">
          <Trophy className="w-64 h-64" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-emerald-100 font-semibold text-sm uppercase tracking-wider mb-2">
            <Target className="w-4 h-4" /> Next Milestone
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-6">{nextMilestone.title}</h2>
          
          <div className="max-w-2xl">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-emerald-100">Progress</span>
              <span className="text-lg font-bold">
                {nextMilestone.current} / {nextMilestone.target} <span className="text-sm font-medium text-emerald-200">{nextMilestone.unit}</span>
              </span>
            </div>
            <div className="h-3 bg-black/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/50 animate-pulse"></div>
              </div>
            </div>
            <p className="text-sm text-emerald-100 mt-3">
              Only {nextMilestone.target - nextMilestone.current} more deliveries to go! Keep up the great work.
            </p>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Your Badges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((badge) => (
            <div 
              key={badge.id} 
              className={`relative bg-white rounded-2xl border p-5 transition-all ${
                badge.unlocked 
                  ? 'border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-200 cursor-pointer' 
                  : 'border-gray-100 shadow-sm bg-gray-50/50 grayscale-[50%]'
              }`}
            >
              {/* Status Icon */}
              <div className="absolute top-4 right-4">
                {badge.unlocked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-400" />
                )}
              </div>

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${badge.bg} ${badge.color}`}>
                <badge.icon className="w-7 h-7" />
              </div>

              <h3 className={`font-bold text-base mb-1 ${badge.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                {badge.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                {badge.description}
              </p>

              {badge.unlocked ? (
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Unlocked {badge.date}
                </div>
              ) : (
                <div className="mt-auto">
                  <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    <span>Progress</span>
                    <span>{badge.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-400 rounded-full" style={{ width: `${badge.progress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function Target(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}
