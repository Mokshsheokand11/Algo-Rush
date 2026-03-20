import { useState, useEffect } from 'react';
import { Flame, Trophy, Calendar, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import api from '../services/api';

export function Dashboard() {
  const [problem, setProblem] = useState<any>(null);
  const [streak, setStreak] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [problemRes, streakRes] = await Promise.all([
          api.get('/problem/today'),
          api.get('/streak')
        ]);
        setProblem(problemRes.data);
        setStreak(streakRes.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Welcome back! Here's your daily summary.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-200 flex items-center gap-4">
          <div className="w-14 h-14 bg-orange-100 dark:bg-orange-950/30 rounded-2xl flex items-center justify-center">
            <Flame className="w-7 h-7 text-orange-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Current Streak</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{streak?.currentStreak || 0} days</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-200 flex items-center gap-4">
          <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center">
            <Trophy className="w-7 h-7 text-yellow-600 dark:text-yellow-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Longest Streak</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{streak?.longestStreak || 0} days</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-200 flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
            <Calendar className="w-7 h-7 text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Last Solved</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {streak?.lastSolvedDate || 'Never'}
            </p>
          </div>
        </div>
      </div>

      {/* Today's Problem */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-200">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Today's Problem</h2>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{problem?.date}</span>
        </div>
        
        <div className="p-6">
          {problem ? (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{problem.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    problem.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400">
                  Solve this problem to maintain your daily streak!
                </p>
              </div>

              <div className="flex flex-col items-end gap-4 overflow-hidden">
                {streak?.solvedToday ? (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl font-medium">
                    <CheckCircle2 className="w-5 h-5" />
                    Solved Today
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 px-4 py-2 rounded-xl font-medium">
                    <Clock className="w-5 h-5" />
                    Pending
                  </div>
                )}
                
                <a
                  href={`https://leetcode.com/problems/${problem.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg active:scale-95"
                >
                  Solve Problem
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">No problem found for today.</p>
          )}
        </div>
      </div>
    </div>
  );
}
