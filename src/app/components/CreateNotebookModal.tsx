import React, { useState } from "react";
import {
  X,
  Info,
  Cpu,
  HardDrive,
  Box,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";

interface CreateNotebookModalProps {
  onClose: () => void;
}

const dockerImages = [
  {
    value: "pytorch-2.1",
    label: "PyTorch 2.1 + CUDA 11.8",
    description: "pytorch/pytorch:2.1.0-cuda11.8",
  },
  {
    value: "tensorflow-2.15",
    label: "TensorFlow 2.15 + GPU",
    description: "tensorflow/tensorflow:2.15.0-gpu",
  },
  {
    value: "jupyter-datascience",
    label: "Jupyter Data Science",
    description: "jupyter/datascience-notebook:latest",
  },
  {
    value: "huggingface",
    label: "HuggingFace Transformers",
    description: "huggingface/transformers:latest",
  },
  {
    value: "custom",
    label: "تصویر سفارشی",
    description: "Custom Docker Image",
  },
];

export function CreateNotebookModal({ onClose }: CreateNotebookModalProps) {
  const [step, setStep] = useState(1);
  const [serverName, setServerName] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [image, setImage] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [cpuCores, setCpuCores] = useState([4]);
  const [memory, setMemory] = useState([16]);
  const [gpuCount, setGpuCount] = useState([1]);
  const [gpuType, setGpuType] = useState("");
  const [storage, setStorage] = useState([50]);
  const [enableGpu, setEnableGpu] = useState(true);
  const [autoShutdown, setAutoShutdown] = useState(true);
  const [idleTimeout, setIdleTimeout] = useState("2");

  const totalSteps = 4;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCreate = () => {
    // Handle creation logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                ایجاد سرور نوت‌بوک جدید
              </h2>
              <p className="text-blue-100 mt-1">
                پیکربندی محیط Jupyter خود را تنظیم کنید
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3, 4].map((s) => (
              <React.Fragment key={s}>
                <div
                  className={`flex-1 h-2 rounded-full transition-all ${s <= step ? "bg-white" : "bg-white/30"}`}
                ></div>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-blue-100">
            <span>اطلاعات پایه</span>
            <span>محیط اجرایی</span>
            <span>منابع</span>
            <span>تنظیمات پیشرفته</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-240px)]">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="text-sm text-blue-900 dark:text-blue-200">
                  نام و پروژه خود را برای سرور نوت‌بوک انتخاب کنید. این اطلاعات
                  برای شناسایی و دسته‌بندی سرورها استفاده می‌شود.
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="serverName">نام سرور *</Label>
                  <Input
                    id="serverName"
                    placeholder="مثال: training-resnet50"
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    از حروف انگلیسی، اعداد و خط تیره استفاده کنید
                  </p>
                </div>

                <div>
                  <Label htmlFor="workspace">پروژه / Workspace *</Label>
                  <Select value={workspace} onValueChange={setWorkspace}>
                    <SelectTrigger dir="rtl" className="mt-2">
                      <SelectValue placeholder="انتخاب پروژه" />
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                      <SelectItem value="deep-learning">
                        Deep Learning
                      </SelectItem>
                      <SelectItem value="nlp-research">NLP Research</SelectItem>
                      <SelectItem value="computer-vision">
                        Computer Vision
                      </SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="generative-ai">
                        Generative AI
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">توضیحات (اختیاری)</Label>
                  <Textarea
                    id="description"
                    placeholder="توضیحات مختصری درباره هدف استفاده از این سرور..."
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Environment */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950/50 rounded-lg border border-purple-200 dark:border-purple-800">
                <Box className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div className="text-sm text-purple-900 dark:text-purple-200">
                  تصویر Docker مناسب با نیازهای پروژه خود را انتخاب کنید. همه
                  تصاویر شامل Jupyter Lab هستند.
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>انتخاب تصویر Docker *</Label>
                  <div className="mt-3 space-y-2">
                    {dockerImages.map((img) => (
                      <div
                        key={img.value}
                        onClick={() => setImage(img.value)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          image === img.value
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {img.label}
                            </div>
                            <code className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                              {img.description}
                            </code>
                          </div>
                          {image === img.value && (
                            <Badge className="bg-blue-500">انتخاب شده</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {image === "custom" && (
                  <div>
                    <Label htmlFor="customImage">آدرس تصویر سفارشی</Label>
                    <Input
                      id="customImage"
                      placeholder="مثال: registry.company.com/my-image:v1.0"
                      value={customImage}
                      onChange={(e) => setCustomImage(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Resources */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/50 rounded-lg border border-amber-200 dark:border-amber-800">
                <Cpu className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div className="text-sm text-amber-900 dark:text-amber-200">
                  منابع محاسباتی مورد نیاز را تخصیص دهید. می‌توانید بعداً این
                  تنظیمات را تغییر دهید.
                </div>
              </div>

              <div className="space-y-6">
                {/* CPU */}
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <Label>CPU Cores</Label>
                    <Badge variant="secondary">{cpuCores[0]} vCPU</Badge>
                  </div>
                  <Slider
                    value={cpuCores}
                    onValueChange={setCpuCores}
                    min={1}
                    max={32}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>1 Core</span>
                    <span>32 Cores</span>
                  </div>
                </div>

                {/* Memory */}
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <Label>Memory (RAM)</Label>
                    <Badge variant="secondary">{memory[0]} GB</Badge>
                  </div>
                  <Slider
                    value={memory}
                    onValueChange={setMemory}
                    min={4}
                    max={128}
                    step={4}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>4 GB</span>
                    <span>128 GB</span>
                  </div>
                </div>

                {/* GPU Toggle */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div>
                    <Label>استفاده از GPU</Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      برای پردازش‌های سنگین یادگیری عمیق
                    </p>
                  </div>
                  <Switch checked={enableGpu} onCheckedChange={setEnableGpu} />
                </div>

                {/* GPU Config */}
                {enableGpu && (
                  <>
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <Label>تعداد GPU</Label>
                        <Badge variant="secondary">{gpuCount[0]} GPU</Badge>
                      </div>
                      <Slider
                        value={gpuCount}
                        onValueChange={setGpuCount}
                        min={1}
                        max={8}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>1 GPU</span>
                        <span>8 GPUs</span>
                      </div>
                    </div>

                    <div>
                      <Label>نوع GPU</Label>
                      <Select value={gpuType} onValueChange={setGpuType}>
                        <SelectTrigger dir="rtl" className="mt-2">
                          <SelectValue placeholder="انتخاب نوع GPU" />
                        </SelectTrigger>
                        <SelectContent dir="rtl">
                          <SelectItem value="a100">
                            NVIDIA A100 (80GB)
                          </SelectItem>
                          <SelectItem value="v100">
                            NVIDIA V100 (32GB)
                          </SelectItem>
                          <SelectItem value="a6000">
                            NVIDIA A6000 (48GB)
                          </SelectItem>
                          <SelectItem value="t4">NVIDIA T4 (16GB)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Storage */}
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <Label>فضای ذخیره‌سازی</Label>
                    <Badge variant="secondary">{storage[0]} GB</Badge>
                  </div>
                  <Slider
                    value={storage}
                    onValueChange={setStorage}
                    min={10}
                    max={500}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>10 GB</span>
                    <span>500 GB</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Advanced Settings */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/50 rounded-lg border border-green-200 dark:border-green-800">
                <Settings className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div className="text-sm text-green-900 dark:text-green-200">
                  تنظیمات پیشرفته برای بهینه‌سازی مصرف منابع و امنیت سرور.
                </div>
              </div>

              <div className="space-y-4">
                {/* Auto Shutdown */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex-1">
                    <Label>خاموش شدن خودکار</Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      سرور در صورت عدم فعالیت به طور خودکار متوقف شود
                    </p>
                  </div>
                  <Switch
                    checked={autoShutdown}
                    onCheckedChange={setAutoShutdown}
                  />
                </div>

                {autoShutdown && (
                  <div>
                    <Label htmlFor="idleTimeout">زمان Timeout (ساعت)</Label>
                    <Select value={idleTimeout} onValueChange={setIdleTimeout}>
                      <SelectTrigger dir="rtl" className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent dir="rtl">
                        <SelectItem value="0.5">30 دقیقه</SelectItem>
                        <SelectItem value="1">1 ساعت</SelectItem>
                        <SelectItem value="2">2 ساعت</SelectItem>
                        <SelectItem value="4">4 ساعت</SelectItem>
                        <SelectItem value="8">8 ساعت</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Environment Variables */}
                <div>
                  <Label>متغیرهای محیطی (اختیاری)</Label>
                  <Textarea
                    placeholder="KEY1=value1&#10;KEY2=value2"
                    className="mt-2 font-mono text-sm"
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    هر متغیر در یک خط جداگانه
                  </p>
                </div>

                {/* Startup Script */}
                <div>
                  <Label>اسکریپت راه‌اندازی (اختیاری)</Label>
                  <Textarea
                    dir="ltr"
                    placeholder="#!/bin/bash&#10;pip install -r requirements.txt"
                    className="mt-2 font-mono text-sm"
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    این اسکریپت هنگام راه‌اندازی سرور اجرا می‌شود
                  </p>
                </div>

                {/* Summary */}
                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    خلاصه پیکربندی
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        نام سرور:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {serverName || "تعریف نشده"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        پروژه:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {workspace || "تعریف نشده"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        منابع:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {cpuCores[0]} vCPU, {memory[0]} GB RAM
                        {enableGpu && `, ${gpuCount[0]} GPU`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Storage:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {storage[0]} GB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              <ChevronRight className="ml-2 h-4 w-4" />
              قبلی
            </Button>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              مرحله {step} از {totalSteps}
            </div>

            {step < totalSteps ? (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                بعدی
                <ChevronLeft className="mr-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleCreate}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                ایجاد سرور
                <ChevronLeft className="mr-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
