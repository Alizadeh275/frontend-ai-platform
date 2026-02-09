import React, { useState } from 'react';
import { 
  Cpu, 
  Activity, 
  Thermometer, 
  Zap,
  Fan,
  AlertTriangle,
  TrendingUp,
  Server,
  Clock,
  HardDrive,
  Eye,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

// Mock data for GPU metrics
const gpuUtilizationData = [
  { time: '00:00', gpu0: 85, gpu1: 78, gpu2: 92, gpu3: 88 },
  { time: '00:30', gpu0: 87, gpu1: 82, gpu2: 95, gpu3: 90 },
  { time: '01:00', gpu0: 90, gpu1: 85, gpu2: 98, gpu3: 92 },
  { time: '01:30', gpu0: 88, gpu1: 80, gpu2: 96, gpu3: 89 },
  { time: '02:00', gpu0: 86, gpu1: 78, gpu2: 94, gpu3: 87 },
  { time: '02:30', gpu0: 89, gpu1: 83, gpu2: 97, gpu3: 91 },
  { time: '03:00', gpu0: 85, gpu1: 81, gpu2: 93, gpu3: 88 },
];

const memoryUsageData = [
  { time: '00:00', gpu0: 72, gpu1: 68, gpu2: 78, gpu3: 75 },
  { time: '00:30', gpu0: 75, gpu1: 70, gpu2: 80, gpu3: 77 },
  { time: '01:00', gpu0: 78, gpu1: 73, gpu2: 82, gpu3: 79 },
  { time: '01:30', gpu0: 76, gpu1: 71, gpu2: 81, gpu3: 78 },
  { time: '02:00', gpu0: 74, gpu1: 69, gpu2: 79, gpu3: 76 },
  { time: '02:30', gpu0: 77, gpu1: 72, gpu2: 83, gpu3: 80 },
  { time: '03:00', gpu0: 73, gpu1: 68, gpu2: 78, gpu3: 75 },
];

const temperatureData = [
  { time: '00:00', gpu0: 75, gpu1: 72, gpu2: 78, gpu3: 76 },
  { time: '00:30', gpu0: 76, gpu1: 73, gpu2: 79, gpu3: 77 },
  { time: '01:00', gpu0: 77, gpu1: 74, gpu2: 80, gpu3: 78 },
  { time: '01:30', gpu0: 78, gpu1: 75, gpu2: 81, gpu3: 79 },
  { time: '02:00', gpu0: 76, gpu1: 73, gpu2: 79, gpu3: 77 },
  { time: '02:30', gpu0: 77, gpu1: 74, gpu2: 80, gpu3: 78 },
  { time: '03:00', gpu0: 75, gpu1: 72, gpu2: 78, gpu3: 76 },
];

const powerConsumptionData = [
  { time: '00:00', gpu0: 250, gpu1: 235, gpu2: 275, gpu3: 260 },
  { time: '00:30', gpu0: 255, gpu1: 240, gpu2: 280, gpu3: 265 },
  { time: '01:00', gpu0: 260, gpu1: 245, gpu2: 285, gpu3: 270 },
  { time: '01:30', gpu0: 258, gpu1: 243, gpu2: 283, gpu3: 268 },
  { time: '02:00', gpu0: 252, gpu1: 237, gpu2: 277, gpu3: 262 },
  { time: '02:30', gpu0: 257, gpu1: 242, gpu2: 282, gpu3: 267 },
  { time: '03:00', gpu0: 250, gpu1: 235, gpu2: 275, gpu3: 260 },
];

interface GPUCardData {
  id: number;
  name: string;
  utilization: number;
  memory: number;
  memoryTotal: number;
  temperature: number;
  power: number;
  powerLimit: number;
  fanSpeed: number;
  status: 'healthy' | 'warning' | 'error';
  process: string | null;
  user: string | null;
}

const gpuCards: GPUCardData[] = [
  {
    id: 0,
    name: 'NVIDIA A100-SXM4-80GB',
    utilization: 85,
    memory: 58,
    memoryTotal: 80,
    temperature: 75,
    power: 250,
    powerLimit: 400,
    fanSpeed: 65,
    status: 'healthy',
    process: 'training-resnet50',
    user: 'علی کریمی',
  },
  {
    id: 1,
    name: 'NVIDIA A100-SXM4-80GB',
    utilization: 78,
    memory: 54,
    memoryTotal: 80,
    temperature: 72,
    power: 235,
    powerLimit: 400,
    fanSpeed: 62,
    status: 'healthy',
    process: 'training-resnet50',
    user: 'علی کریمی',
  },
  {
    id: 2,
    name: 'NVIDIA A100-SXM4-80GB',
    utilization: 92,
    memory: 62,
    memoryTotal: 80,
    temperature: 78,
    power: 275,
    powerLimit: 400,
    fanSpeed: 70,
    status: 'healthy',
    process: 'bert-finetuning',
    user: 'سارا احمدی',
  },
  {
    id: 3,
    name: 'NVIDIA A100-SXM4-80GB',
    utilization: 88,
    memory: 60,
    memoryTotal: 80,
    temperature: 76,
    power: 260,
    powerLimit: 400,
    fanSpeed: 67,
    status: 'healthy',
    process: 'inference-yolov8',
    user: 'فاطمه محمدی',
  },
  {
    id: 4,
    name: 'NVIDIA A100-SXM4-80GB',
    utilization: 0,
    memory: 0,
    memoryTotal: 80,
    temperature: 45,
    power: 50,
    powerLimit: 400,
    fanSpeed: 30,
    status: 'healthy',
    process: null,
    user: null,
  },
  {
    id: 5,
    name: 'NVIDIA A100-SXM4-80GB',
    utilization: 0,
    memory: 0,
    memoryTotal: 80,
    temperature: 46,
    power: 52,
    powerLimit: 400,
    fanSpeed: 30,
    status: 'healthy',
    process: null,
    user: null,
  },
  {
    id: 6,
    name: 'NVIDIA V100-SXM2-32GB',
    utilization: 65,
    memory: 24,
    memoryTotal: 32,
    temperature: 82,
    power: 280,
    powerLimit: 300,
    fanSpeed: 85,
    status: 'warning',
    process: 'model-training',
    user: 'محمد رضایی',
  },
  {
    id: 7,
    name: 'NVIDIA V100-SXM2-32GB',
    utilization: 15,
    memory: 8,
    memoryTotal: 32,
    temperature: 55,
    power: 120,
    powerLimit: 300,
    fanSpeed: 45,
    status: 'healthy',
    process: 'data-preprocessing',
    user: 'حسین علوی',
  },
];

export function GPUMonitoring() {
  const [timeRange, setTimeRange] = useState('3h');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const activeGPUs = gpuCards.filter(gpu => gpu.utilization > 0).length;
  const totalMemoryUsed = gpuCards.reduce((acc, gpu) => acc + gpu.memory, 0);
  const totalMemory = gpuCards.reduce((acc, gpu) => acc + gpu.memoryTotal, 0);
  const avgUtilization = Math.round(gpuCards.reduce((acc, gpu) => acc + gpu.utilization, 0) / gpuCards.length);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">مانیتورینگ GPU</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">نظارت لحظه‌ای بر وضعیت GPUهای سیستم</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 ساعت گذشته</SelectItem>
              <SelectItem value="3h">3 ساعت گذشته</SelectItem>
              <SelectItem value="6h">6 ساعت گذشته</SelectItem>
              <SelectItem value="24h">24 ساعت گذشته</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant={autoRefresh ? 'default' : 'outline'}
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            <RefreshCw className={`ml-2 h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            {autoRefresh ? 'در حال بروزرسانی' : 'بروزرسانی دستی'}
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Total GPUs */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              تعداد کل GPU
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center">
              <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{gpuCards.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {activeGPUs} فعال، {gpuCards.length - activeGPUs} بدون بار
            </p>
          </CardContent>
        </Card>

        {/* Average Utilization */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              میانگین استفاده
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 dark:bg-purple-500/30 flex items-center justify-center">
              <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{avgUtilization}%</div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${avgUtilization}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Memory Usage */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/50 dark:to-amber-900/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              مصرف حافظه
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 dark:bg-amber-500/30 flex items-center justify-center">
              <HardDrive className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {totalMemoryUsed} GB
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              از {totalMemory} GB ({Math.round((totalMemoryUsed / totalMemory) * 100)}%)
            </p>
          </CardContent>
        </Card>

        {/* Health Status */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              وضعیت سلامت
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-green-500/20 dark:bg-green-500/30 flex items-center justify-center">
              <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">سالم</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              1 هشدار دما
            </p>
          </CardContent>
        </Card>
      </div>

      {/* GPU Utilization Chart */}
      <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            نمودار استفاده از GPU
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={gpuUtilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="gpu0" stroke="#3b82f6" strokeWidth={2} name="GPU 0" />
              <Line type="monotone" dataKey="gpu1" stroke="#8b5cf6" strokeWidth={2} name="GPU 1" />
              <Line type="monotone" dataKey="gpu2" stroke="#f59e0b" strokeWidth={2} name="GPU 2" />
              <Line type="monotone" dataKey="gpu3" stroke="#10b981" strokeWidth={2} name="GPU 3" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Memory & Temperature Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Memory Usage */}
        <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              مصرف حافظه GPU
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={memoryUsageData}>
                <defs>
                  <linearGradient id="colorMem0" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMem1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Area type="monotone" dataKey="gpu0" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMem0)" name="GPU 0" />
                <Area type="monotone" dataKey="gpu1" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorMem1)" name="GPU 1" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Temperature */}
        <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-red-600 dark:text-red-400" />
              دمای GPU
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line type="monotone" dataKey="gpu0" stroke="#ef4444" strokeWidth={2} name="GPU 0" />
                <Line type="monotone" dataKey="gpu1" stroke="#f97316" strokeWidth={2} name="GPU 1" />
                <Line type="monotone" dataKey="gpu2" stroke="#f59e0b" strokeWidth={2} name="GPU 2" />
                <Line type="monotone" dataKey="gpu3" stroke="#eab308" strokeWidth={2} name="GPU 3" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Power Consumption */}
      <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            مصرف برق (Watts)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={powerConsumptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Bar dataKey="gpu0" fill="#3b82f6" radius={[4, 4, 0, 0]} name="GPU 0" />
              <Bar dataKey="gpu1" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="GPU 1" />
              <Bar dataKey="gpu2" fill="#f59e0b" radius={[4, 4, 0, 0]} name="GPU 2" />
              <Bar dataKey="gpu3" fill="#10b981" radius={[4, 4, 0, 0]} name="GPU 3" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Individual GPU Cards */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">جزئیات هر GPU</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {gpuCards.map((gpu) => (
            <Card 
              key={gpu.id} 
              className={`border-none shadow-lg backdrop-blur ${
                gpu.status === 'warning' 
                  ? 'bg-amber-50/50 dark:bg-amber-950/20 border-2 border-amber-500/30' 
                  : 'bg-white/50 dark:bg-gray-900/50'
              }`}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">GPU {gpu.id}</h3>
                        <Badge 
                          variant={gpu.status === 'healthy' ? 'secondary' : 'destructive'}
                          className={
                            gpu.status === 'healthy' 
                              ? 'bg-green-500/10 text-green-700 dark:text-green-400' 
                              : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                          }
                        >
                          {gpu.status === 'healthy' ? 'سالم' : 'هشدار'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{gpu.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{gpu.utilization}%</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">استفاده</p>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                      <div className="flex items-center gap-2 mb-1">
                        <HardDrive className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">Memory</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {gpu.memory} / {gpu.memoryTotal} GB
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(gpu.memory / gpu.memoryTotal) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Thermometer className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">دما</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{gpu.temperature}°C</div>
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${gpu.temperature > 80 ? 'bg-red-500' : 'bg-orange-500'}`}
                          style={{ width: `${gpu.temperature}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">مصرف برق</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {gpu.power}W / {gpu.powerLimit}W
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: `${(gpu.power / gpu.powerLimit) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Fan className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">سرعت فن</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{gpu.fanSpeed}%</div>
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${gpu.fanSpeed}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Process Info */}
                  {gpu.process ? (
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">پروسس در حال اجرا</div>
                          <div className="font-medium text-gray-900 dark:text-white">{gpu.process}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">کاربر: {gpu.user}</div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        بدون بار - آماده استفاده
                      </div>
                    </div>
                  )}

                  {gpu.status === 'warning' && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-100 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700">
                      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                      <div className="text-xs text-amber-900 dark:text-amber-200">
                        هشدار: دمای GPU بالاتر از حد معمول است
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
