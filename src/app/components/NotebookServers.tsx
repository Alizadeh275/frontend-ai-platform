import React, { useState } from 'react';
import { 
  Plus, 
  Play, 
  Square, 
  RotateCw, 
  Terminal, 
  Edit, 
  Trash2,
  ExternalLink,
  Search,
  Filter,
  Cpu,
  HardDrive,
  Clock,
  User,
  Box
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { CreateNotebookModal } from './CreateNotebookModal';

interface NotebookServer {
  id: string;
  name: string;
  status: 'running' | 'starting' | 'stopped' | 'error';
  cpu: string;
  memory: string;
  gpu: string;
  image: string;
  owner: string;
  lastActivity: string;
  created: string;
  storage: string;
  workspace: string;
  cpuUsage: number;
  memoryUsage: number;
  gpuUsage: number;
}

const mockServers: NotebookServer[] = [
  {
    id: '1',
    name: 'training-resnet50',
    status: 'running',
    cpu: '8 vCPU',
    memory: '32 GB',
    gpu: '2x NVIDIA A100',
    image: 'pytorch/pytorch:2.1.0-cuda11.8',
    owner: 'علی کریمی',
    lastActivity: '2 دقیقه پیش',
    created: '1403/11/15',
    storage: '100 GB',
    workspace: 'deep-learning',
    cpuUsage: 75,
    memoryUsage: 82,
    gpuUsage: 95,
  },
  {
    id: '2',
    name: 'data-analysis-01',
    status: 'running',
    cpu: '4 vCPU',
    memory: '16 GB',
    gpu: '-',
    image: 'jupyter/datascience-notebook:latest',
    owner: 'سارا احمدی',
    lastActivity: '10 دقیقه پیش',
    created: '1403/11/14',
    storage: '50 GB',
    workspace: 'analytics',
    cpuUsage: 35,
    memoryUsage: 45,
    gpuUsage: 0,
  },
  {
    id: '3',
    name: 'bert-finetuning',
    status: 'running',
    cpu: '16 vCPU',
    memory: '64 GB',
    gpu: '4x NVIDIA V100',
    image: 'huggingface/transformers:latest',
    owner: 'محمد رضایی',
    lastActivity: '1 ساعت پیش',
    created: '1403/11/13',
    storage: '200 GB',
    workspace: 'nlp-research',
    cpuUsage: 88,
    memoryUsage: 92,
    gpuUsage: 98,
  },
  {
    id: '4',
    name: 'exploratory-notebook',
    status: 'stopped',
    cpu: '2 vCPU',
    memory: '8 GB',
    gpu: '-',
    image: 'jupyter/scipy-notebook:latest',
    owner: 'فاطمه محمدی',
    lastActivity: '2 روز پیش',
    created: '1403/11/10',
    storage: '20 GB',
    workspace: 'exploration',
    cpuUsage: 0,
    memoryUsage: 0,
    gpuUsage: 0,
  },
  {
    id: '5',
    name: 'yolo-training',
    status: 'starting',
    cpu: '8 vCPU',
    memory: '32 GB',
    gpu: '1x NVIDIA A100',
    image: 'ultralytics/yolov8:latest',
    owner: 'حسین علوی',
    lastActivity: 'در حال راه‌اندازی',
    created: '1403/11/15',
    storage: '80 GB',
    workspace: 'computer-vision',
    cpuUsage: 15,
    memoryUsage: 20,
    gpuUsage: 0,
  },
  {
    id: '6',
    name: 'gan-experiments',
    status: 'error',
    cpu: '4 vCPU',
    memory: '16 GB',
    gpu: '1x NVIDIA T4',
    image: 'tensorflow/tensorflow:latest-gpu',
    owner: 'زهرا حسینی',
    lastActivity: '5 دقیقه پیش',
    created: '1403/11/14',
    storage: '60 GB',
    workspace: 'generative-ai',
    cpuUsage: 0,
    memoryUsage: 0,
    gpuUsage: 0,
  },
];

export function NotebookServers() {
  const [servers] = useState<NotebookServer[]>(mockServers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [workspaceFilter, setWorkspaceFilter] = useState('all');
  const [gpuFilter, setGpuFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
      case 'starting':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'stopped':
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20';
      case 'error':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running':
        return 'در حال اجرا';
      case 'starting':
        return 'در حال راه‌اندازی';
      case 'stopped':
        return 'متوقف شده';
      case 'error':
        return 'خطا';
      default:
        return status;
    }
  };

  const filteredServers = servers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         server.owner.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || server.status === statusFilter;
    const matchesWorkspace = workspaceFilter === 'all' || server.workspace === workspaceFilter;
    const matchesGpu = gpuFilter === 'all' || 
                       (gpuFilter === 'with-gpu' && server.gpu !== '-') ||
                       (gpuFilter === 'without-gpu' && server.gpu === '-');
    
    return matchesSearch && matchesStatus && matchesWorkspace && matchesGpu;
  });

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">مدیریت سرورهای نوت‌بوک</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">ایجاد و مدیریت محیط‌های توسعه Jupyter</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="ml-2 h-5 w-5" />
          ایجاد سرور جدید
        </Button>
      </div>

      {/* Filters Bar */}
      <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="جستجوی نام سرور یا کاربر..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="وضعیت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                <SelectItem value="running">در حال اجرا</SelectItem>
                <SelectItem value="starting">در حال راه‌اندازی</SelectItem>
                <SelectItem value="stopped">متوقف شده</SelectItem>
                <SelectItem value="error">خطا</SelectItem>
              </SelectContent>
            </Select>

            {/* Workspace Filter */}
            <Select value={workspaceFilter} onValueChange={setWorkspaceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="پروژه" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه پروژه‌ها</SelectItem>
                <SelectItem value="deep-learning">Deep Learning</SelectItem>
                <SelectItem value="nlp-research">NLP Research</SelectItem>
                <SelectItem value="computer-vision">Computer Vision</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
              </SelectContent>
            </Select>

            {/* GPU Filter */}
            <Select value={gpuFilter} onValueChange={setGpuFilter}>
              <SelectTrigger>
                <SelectValue placeholder="GPU" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه</SelectItem>
                <SelectItem value="with-gpu">دارای GPU</SelectItem>
                <SelectItem value="without-gpu">بدون GPU</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Servers Grid */}
      <div className="grid grid-cols-1 gap-4 lg:gap-6">
        {filteredServers.map((server) => (
          <Card key={server.id} className="border-none shadow-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Server Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{server.name}</h3>
                        <Badge variant="outline" className={getStatusColor(server.status)}>
                          {server.status === 'running' && <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>}
                          {getStatusText(server.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {server.owner}
                        </div>
                        <div className="flex items-center gap-1">
                          <Box className="h-4 w-4" />
                          {server.workspace}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {server.lastActivity}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resource Specs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">CPU</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{server.cpu}</div>
                      {server.status === 'running' && (
                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: `${server.cpuUsage}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Memory</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{server.memory}</div>
                      {server.status === 'running' && (
                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded-full transition-all"
                            style={{ width: `${server.memoryUsage}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">GPU</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{server.gpu}</div>
                      {server.status === 'running' && server.gpu !== '-' && (
                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 rounded-full transition-all"
                            style={{ width: `${server.gpuUsage}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Storage</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{server.storage}</div>
                    </div>
                  </div>

                  {/* Docker Image */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                    <Box className="h-3 w-3" />
                    <code className="font-mono">{server.image}</code>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2">
                  {server.status === 'running' ? (
                    <>
                      <Button 
                        className="flex-1 lg:flex-none bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                      >
                        <ExternalLink className="ml-2 h-4 w-4" />
                        باز کردن Jupyter
                      </Button>
                      <Button variant="outline" size="icon">
                        <Terminal className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Square className="h-4 w-4" />
                      </Button>
                    </>
                  ) : server.status === 'stopped' ? (
                    <>
                      <Button 
                        className="flex-1 lg:flex-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        <Play className="ml-2 h-4 w-4" />
                        راه‌اندازی
                      </Button>
                    </>
                  ) : server.status === 'starting' ? (
                    <>
                      <Button disabled className="flex-1 lg:flex-none">
                        <RotateCw className="ml-2 h-4 w-4 animate-spin" />
                        در حال راه‌اندازی...
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline"
                        className="flex-1 lg:flex-none border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950"
                      >
                        <RotateCw className="ml-2 h-4 w-4" />
                        راه‌اندازی مجدد
                      </Button>
                    </>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="ml-2 h-4 w-4" />
                        ویرایش
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Terminal className="ml-2 h-4 w-4" />
                        دسترسی Terminal
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <HardDrive className="ml-2 h-4 w-4" />
                        مدیریت Storage
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="ml-2 h-4 w-4" />
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServers.length === 0 && (
        <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Box className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">سروری یافت نشد</h3>
            <p className="text-gray-500 dark:text-gray-400">فیلترهای خود را تغییر دهید یا یک سرور جدید ایجاد کنید</p>
          </CardContent>
        </Card>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreateNotebookModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
