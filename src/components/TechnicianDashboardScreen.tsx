import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { DollarSign, MapPin, Clock, ChevronRight, TrendingUp, Star, Briefcase, Loader2, AlertCircle, MessageCircle } from 'lucide-react';
import API from '../api';
import { useAuth } from '../contexts/AuthContext';

interface JobRequest {
  id: number;
  customer: string;
  customer_email: string;
  service: string;
  distance: string;
  time: string;
  price: string;
  address: string;
  status: string;
}

interface EarningsSummary {
  today: number;
  todayJobs: number;
  weekly: number;
  weeklyJobs: number;
  monthly: number;
  monthlyJobs: number;
  completedJobs: number;
  avgRating: number;
  successRate: string;
}

export function TechnicianDashboardScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const [jobRequests, setJobRequests] = useState<JobRequest[]>([]);
  const [activeJobs, setActiveJobs] = useState<JobRequest[]>([]);
  const [earnings, setEarnings] = useState<EarningsSummary>({
    today: 0, todayJobs: 0,
    weekly: 0, weeklyJobs: 0,
    monthly: 0, monthlyJobs: 0,
    completedJobs: 0, avgRating: 0, successRate: '0%',
  });
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingEarnings, setLoadingEarnings] = useState(true);

  const firstName = user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'Technician';

  useEffect(() => {
    const fetchJobs = async () => {
      setLoadingJobs(true);
      try {
        const currentToken = localStorage.getItem('token');
        const res = await API.get('/bookings', {
          headers: {
            Authorization: currentToken ? `Bearer ${currentToken}` : undefined
          }
        });
        const raw = res.data as {
          id: number;
          customer_name?: string;
          customer?: string;
          customer_email?: string;
          service_name?: string;
          service_type?: string;
          service?: string;
          address?: string;
          scheduled_time?: string;
          scheduled_date?: string;
          time?: string;
          cost?: string;
          amount?: number;
          total_amount?: number;
          status: string;
        }[];
        const allMapped: JobRequest[] = raw.map((b) => {
          let jobTime = '—';
          if (b.time || b.scheduled_time) {
            jobTime = (b.time || b.scheduled_time) as string;
          } else if (b.scheduled_date) {
            const d = new Date(b.scheduled_date);
            if (!isNaN(d.getTime())) {
              jobTime = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            }
          }

          return {
            id: b.id,
            customer: b.customer_name || b.customer || 'Customer',
            customer_email: b.customer_email || '',
            service: b.service_name || b.service_type || b.service || 'Service',
            distance: '—',
            time: jobTime,
            price: b.cost || (b.amount != null ? `₹${b.amount}` : b.total_amount != null ? `₹${b.total_amount}` : 'TBD'),
            address: b.address || '—',
            status: b.status,
          };
        });

        setJobRequests(allMapped.filter(j => j.status.toLowerCase() === 'pending'));
        setActiveJobs(allMapped.filter(j => ['accepted', 'ongoing', 'started', 'on-the-way'].includes(j.status.toLowerCase())));
      } catch (err) {
        console.error('Error fetching technician jobs:', err);
      } finally {
        setLoadingJobs(false);
      }
    };

    const fetchEarnings = async () => {
      setLoadingEarnings(true);
      try {
        const currentToken = localStorage.getItem('token');
        const res = await API.get('/technician/earnings', {
          headers: {
            Authorization: currentToken ? `Bearer ${currentToken}` : undefined
          }
        });
        const d = res.data as {
          today?: number; today_earnings?: number;
          today_jobs?: number;
          weekly?: number; weekly_earnings?: number;
          weekly_jobs?: number;
          monthly?: number; monthly_earnings?: number;
          monthly_jobs?: number;
          completed_jobs?: number; total_jobs?: number;
          avg_rating?: number; average_rating?: number;
          success_rate?: string;
        };
        setEarnings({
          today: d.today ?? d.today_earnings ?? 0,
          todayJobs: d.today_jobs ?? 0,
          weekly: d.weekly ?? d.weekly_earnings ?? 0,
          weeklyJobs: d.weekly_jobs ?? 0,
          monthly: d.monthly ?? d.monthly_earnings ?? 0,
          monthlyJobs: d.monthly_jobs ?? 0,
          completedJobs: d.completed_jobs ?? d.total_jobs ?? 0,
          avgRating: d.avg_rating ?? d.average_rating ?? 0,
          successRate: d.success_rate ?? '—',
        });
      } catch {
        try {
          const currentToken = localStorage.getItem('token');
          const res = await API.get('/bookings', {
            headers: {
              Authorization: currentToken ? `Bearer ${currentToken}` : undefined
            }
          });
          const all = res.data as {
            status: string;
            amount?: number;
            total_amount?: number;
            scheduled_date?: string;
            date?: string;
            rating?: number;
          }[];
          const completed = all.filter((b) => b.status.toLowerCase() === 'completed');
          const now = new Date();
          const today = completed.filter((b) => {
            const dateStr = b.scheduled_date || b.date;
            if (!dateStr) return false;
            let d: Date;
            if (dateStr.includes('/')) {
              const [day, month, year] = dateStr.split('/');
              d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            } else {
              d = new Date(dateStr);
            }
            return !isNaN(d.getTime()) && d.toDateString() === now.toDateString();
          });
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          const weekly = completed.filter((b) => {
            const dateStr = b.scheduled_date || b.date;
            if (!dateStr) return false;
            let d: Date;
            if (dateStr.includes('/')) {
              const [day, month, year] = dateStr.split('/');
              d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            } else {
              d = new Date(dateStr);
            }
            return !isNaN(d.getTime()) && d >= weekAgo;
          });
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          const monthly = completed.filter((b) => {
            const dateStr = b.scheduled_date || b.date;
            if (!dateStr) return false;
            let d: Date;
            if (dateStr.includes('/')) {
              const [day, month, year] = dateStr.split('/');
              d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            } else {
              d = new Date(dateStr);
            }
            return !isNaN(d.getTime()) && d >= monthStart;
          });
          const sum = (arr: typeof completed) =>
            arr.reduce((s, b) => s + (b.amount ?? b.total_amount ?? 0), 0);
          const rated = completed.filter((b) => b.rating != null);
          const avgRating = rated.length > 0
            ? rated.reduce((s, b) => s + (b.rating ?? 0), 0) / rated.length
            : 0;
          setEarnings({
            today: sum(today), todayJobs: today.length,
            weekly: sum(weekly), weeklyJobs: weekly.length,
            monthly: sum(monthly), monthlyJobs: monthly.length,
            completedJobs: completed.length,
            avgRating: Math.round(avgRating * 10) / 10,
            successRate: all.length > 0 ? `${Math.round((completed.length / all.length) * 100)}%` : '—',
          });
        } catch {
        }
      } finally {
        setLoadingEarnings(false);
      }
    };

    fetchJobs();
    fetchEarnings();
  }, []);

  const stats = [
    { label: 'Jobs Completed', value: loadingEarnings ? '…' : String(earnings.completedJobs), icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
    { label: 'Average Rating', value: loadingEarnings ? '…' : earnings.avgRating > 0 ? String(earnings.avgRating) : '—', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { label: 'Success Rate', value: loadingEarnings ? '…' : earnings.successRate, icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="pb-10">
      {/* Hero Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#136dec] to-purple-600 lg:rounded-3xl lg:mx-6 lg:mt-6 lg:shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-white text-3xl lg:text-4xl font-bold mb-2">
                Welcome Back, {firstName}! 👋
              </h1>
              <p className="text-white/90 text-lg">
                {user?.name || user?.email || 'Technician'}
                {user?.service_type ? ` - ${user.service_type}` : ''}
              </p>
            </div>

            {/* Online Toggle */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:w-auto w-full">
              <div className="flex-1">
                <p className="text-white font-semibold text-lg">Online Status</p>
                <p className="text-white/80 text-sm">
                  {isOnline ? 'Available for jobs' : 'Not accepting jobs'}
                </p>
              </div>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`w-16 h-8 rounded-full transition-colors relative ${isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${isOnline ? 'translate-x-9' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          </div>


          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">{stat.label}</p>
                    <p className="text-white text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Earnings Section */}
        <div className="mt-8 lg:mt-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0f172a] mb-6">Earnings Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-r from-green-400 to-green-600 p-3 rounded-xl">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <span className="text-gray-600 font-semibold">Today</span>
              </div>
              {loadingEarnings ? (
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              ) : (
                <>
                  <p className="text-4xl font-bold text-[#0f172a]">₹{earnings.today}</p>
                  <p className="text-sm text-gray-500 mt-2">{earnings.todayJobs} jobs completed</p>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <span className="text-gray-600 font-semibold">This Week</span>
              </div>
              {loadingEarnings ? (
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              ) : (
                <>
                  <p className="text-4xl font-bold text-[#0f172a]">₹{earnings.weekly}</p>
                  <p className="text-sm text-gray-500 mt-2">{earnings.weeklyJobs} jobs completed</p>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={() => navigate('/technician/earnings')}
              className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-2xl transition group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <DollarSign className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-white font-semibold">This Month</span>
                </div>
                <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
              </div>
              {loadingEarnings ? (
                <Loader2 className="w-8 h-8 animate-spin text-white/60" />
              ) : (
                <>
                  <p className="text-4xl font-bold text-white">₹{earnings.monthly}</p>
                  <p className="text-sm text-white/80 mt-2">View details →</p>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Active Jobs */}
        {activeJobs.length > 0 && (
          <div className="mt-10 lg:mt-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#0f172a]">Active Jobs</h2>
                <span className="bg-green-100 text-green-600 text-sm font-bold px-4 py-2 rounded-full">
                  {activeJobs.length} Ongoing
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {activeJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-2xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-[#0f172a] text-xl mb-1">{job.customer}</h3>
                      <p className="text-gray-600">{job.service}</p>
                    </div>
                    <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {job.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-[#136dec]" />
                      <span>{job.address}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(job.status.toLowerCase() === 'accepted' ? `/technician/job-navigation/${job.id}` : `/technician/job-completion/${job.id}`)}
                      className="flex-1 bg-[#136dec] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Resume Job
                    </button>
                    <button
                      onClick={() => navigate(`/technician/chat/${encodeURIComponent(job.customer_email)}`, {
                        state: { contact: { id: job.customer_email, name: job.customer, role: 'Customer' } }
                      })}
                      className="p-3 bg-blue-50 text-[#136dec] rounded-xl hover:bg-blue-100 transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-6 h-6" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Job Requests */}
        <div className="mt-10 lg:mt-12 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0f172a]">New Job Requests</h2>
              {!loadingJobs && jobRequests.length > 0 && (
                <span className="bg-red-100 text-red-600 text-sm font-bold px-4 py-2 rounded-full">
                  {jobRequests.length} New
                </span>
              )}
            </div>
          </div>

          {loadingJobs ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-10 h-10 text-[#136dec] animate-spin" />
            </div>
          ) : jobRequests.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 shadow-lg text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No pending job requests right now.</p>
              <p className="text-gray-400 text-sm mt-1">Stay online to receive new requests!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {jobRequests.map((job, index) => (
                <motion.button
                  key={job.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => navigate(`/technician/job-request/${job.id}`)}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all text-left group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-[#0f172a] text-xl mb-1">{job.customer}</h3>
                      <p className="text-gray-600">{job.service}</p>
                    </div>
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg font-bold px-4 py-2 rounded-xl shadow-md">
                      {job.price}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-[#136dec]" />
                      <span>{job.address}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#136dec]" />
                        <span className="font-semibold">{job.distance} away</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#136dec]" />
                        <span className="font-semibold">{job.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-[#136dec] font-semibold">View Details</span>
                    <ChevronRight className="w-5 h-5 text-[#136dec] group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
