import React from 'react';
import { 
  BookOpen, 
  Cpu, 
  Activity, 
  Users, 
  Zap,
  TrendingUp,
  Server,
  HardDrive
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from './ui/badge';

const gpuUsageData = [
  { time: '00:00', usage: 45 },
  { time: '04:00', usage: 52 },
  { time: '08:00', usage: 78 },
  { time: '12:00', usage: 85 },
  { time: '16:00', usage: 92 },
  { time: '20:00', usage: 88 },
  { time: '23:59', usage: 75 },
];

const notebookActivityData = [
  { time: '00:00', active: 8 },
  { time: '04:00', active: 12 },
  { time: '08:00', active: 15 },
  { time: '12:00', active: 18 },
  { time: '16:00', active: 16 },
  { time: '20:00', active: 14 },
  { time: '23:59', active: 11 },
];

const resourceConsumptionData = [
  { name: 'نوت‌بوک‌ها', cpu: 68, memory: 72, gpu: 85 },
  { name: 'پایپ‌لاین‌ها', cpu: 45, memory: 52, gpu: 48 },
  { name: 'مدل‌سازی', cpu: 82, memory: 88, gpu: 95 },
  { name: 'استنتاج', cpu: 55, memory: 62, gpu: 70 },
];

const recentJobsData = [
  { name: 'train-resnet50', status: 'running', progress: 75, gpu: 'GPU 0,1', user: 'علی کریمی' },
  { name: 'bert-finetuning', status: 'running', progress: 45, gpu: 'GPU 2', user: 'سارا احمدی' },
  { name: 'data-preprocessing', status: 'completed', progress: 100, gpu: '-', user: 'محمد رضایی' },
  { name: 'inference-yolov8', status: 'running', progress: 88, gpu: 'GPU 3', user: 'فاطمه محمدی' },
  { name: 'model-evaluation', status: 'pending', progress: 0, gpu: '-', user: 'حسین علوی' },
];

export function MainDashboard() {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">داشبورد اصلی</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">نمای کلی زیرساخت هوش مصنوعی</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            سیستم عملیاتی
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Active Notebooks */}
        <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              نوت‌بوک‌های فعال
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">15</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm text-green-600 dark:text-green-400">+3 از دیروز</span>
            </div>
          </CardContent>
        </Card>

        {/* Active GPUs */}
        <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              GPUهای فعال
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 dark:bg-purple-500/30 flex items-center justify-center">
              <Cpu className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">8 / 12</div>
            <div className="flex items-center gap-2 mt-2">
              <Activity className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">67% استفاده</span>
            </div>
          </CardContent>
        </Card>

        {/* GPU Usage */}
        <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/50 dark:to-amber-900/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              مصرف کل GPU
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 dark:bg-amber-500/30 flex items-center justify-center">
              <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">85%</div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </CardContent>
        </Card>

        {/* Online Users */}
        <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              کاربران آنلاین
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-green-500/20 dark:bg-green-500/30 flex items-center justify-center">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">24</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white dark:border-gray-900"></div>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">همکاران فعال</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* GPU Usage Chart */}
        <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              استفاده از GPU در 24 ساعت گذشته
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={gpuUsageData}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorUsage)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Notebook Activity */}
        <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              نوت‌بوک‌های فعال
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={notebookActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="active" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resource Consumption & Recent Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Resource Consumption */}
        <Card className="lg:col-span-2 border-none shadow-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              مصرف منابع بر اساس نوع کار
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resourceConsumptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Legend />
                <Bar dataKey="cpu" fill="#3b82f6" radius={[8, 8, 0, 0]} name="CPU" />
                <Bar dataKey="memory" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Memory" />
                <Bar dataKey="gpu" fill="#f59e0b" radius={[8, 8, 0, 0]} name="GPU" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Jobs */}
        <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-green-600 dark:text-green-400" />
              Jobهای اخیر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobsData.map((job, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{job.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{job.user}</div>
                    </div>
                    <Badge 
                      variant={job.status === 'running' ? 'default' : job.status === 'completed' ? 'secondary' : 'outline'}
                      className={
                        job.status === 'running' 
                          ? 'bg-green-500/10 text-green-700 dark:text-green-400' 
                          : job.status === 'completed'
                          ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
                          : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
                      }
                    >
                      {job.status === 'running' ? 'در حال اجرا' : job.status === 'completed' ? 'تکمیل شده' : 'در انتظار'}
                    </Badge>
                  </div>
                  {job.status === 'running' && (
                    <div className="space-y-1">
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${job.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{job.gpu}</span>
                        <span>{job.progress}%</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
