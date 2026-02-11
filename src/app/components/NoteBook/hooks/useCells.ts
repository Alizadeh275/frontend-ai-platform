"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Cell } from "../Cells/types";

const INITIAL_CELLS: Cell[] = [
  {
    id: "1",
    type: "text",
    content:
      "به ابزار توسعه و تحلیل داده خوش آمدید. این یک ابزار تعاملی برای نوشتن و اجرای کد پایتون است.",
  },
  {
    id: "2",
    type: "code",
    content: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# بارگذاری داده‌ها
data = pd.read_csv('data.csv')
print(f'تعداد ردیف‌ها: {len(data)}')
print(f'تعداد ستون‌ها: {len(data.columns)}')`,
    executionStatus: "success",
    output: `تعداد ردیف‌ها: 1000
تعداد ستون‌ها: 5`,
    executionTime: "0.23 ثانیه",
  },
  {
    id: "3",
    type: "code",
    content: `# تحلیل آماری
df_stats = data.describe()
print(df_stats)`,
    executionStatus: "idle",
  },
  {
    id: "4",
    type: "text",
    content: "در این بخش به تحلیل داده‌های ورودی و رسم نمودارها می‌پردازیم.",
  },
  {
    id: "5",
    type: "code",
    content: `# رسم نمودار
plt.figure(figsize=(10, 6))
plt.plot(data['x'], data['y'])
plt.xlabel('متغیر X')
plt.ylabel('متغیر Y')
plt.title('نمودار داده‌ها')
plt.grid(True)
plt.show()`,
    executionStatus: "success",
    hasChart: true,
    executionTime: "1.02 ثانیه",
  },
];

export function useCells() {
  const [cells, setCells] = useState<Cell[]>(INITIAL_CELLS);
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);

  const runCell = (cellId: string) => {
    toast.info("در حال اجرای سلول...", {
      description: "کد شما در حال اجرا است",
    });

    setCells((prev) =>
      prev.map((cell) =>
        cell.id === cellId ? { ...cell, executionStatus: "running" } : cell,
      ),
    );

    setTimeout(() => {
      setCells((prev) =>
        prev.map((cell) =>
          cell.id === cellId
            ? {
                ...cell,
                executionStatus: "success",
                output: "خروجی نمونه",
                executionTime: "0.15 ثانیه",
              }
            : cell,
        ),
      );
      toast.success("اجرا با موفقیت انجام شد");
    }, 2000);
  };

  const deleteCell = (cellId: string) => {
    const cell = cells.find((c) => c.id === cellId);
    setCells((prev) => prev.filter((c) => c.id !== cellId));
    if (selectedCellId === cellId) setSelectedCellId(null);
    toast.success(`سلول ${cell?.type === "code" ? "کد" : "متن"} حذف شد`);
  };

  const moveCellUp = (cellId: string) => {
    setCells((prev) => {
      const index = prev.findIndex((c) => c.id === cellId);
      if (index <= 0) return prev;
      const copy = [...prev];
      const [cell] = copy.splice(index, 1);
      copy.splice(index - 1, 0, cell);
      return copy;
    });
  };

  const moveCellDown = (cellId: string) => {
    setCells((prev) => {
      const index = prev.findIndex((c) => c.id === cellId);
      if (index === -1 || index >= prev.length - 1) return prev;
      const copy = [...prev];
      const [cell] = copy.splice(index, 1);
      copy.splice(index + 1, 0, cell);
      return copy;
    });
  };

  const updateCellContent = (cellId: string, value: string) => {
    setCells((prev) =>
      prev.map((c) => (c.id === cellId ? { ...c, content: value } : c)),
    );
  };

  const addCellBelow = (targetCellId: string, type: "code" | "text") => {
    const index = cells.findIndex((c) => c.id === targetCellId);
    if (index === -1) return;

    const newCell: Cell = {
      id: Date.now().toString(),
      type,
      content:
        type === "code"
          ? "# کد خود را اینجا بنویسید"
          : "متن خود را اینجا بنویسید...",
      executionStatus: "idle",
    };

    setCells((prev) => {
      const copy = [...prev];
      copy.splice(index + 1, 0, newCell);
      return copy;
    });

    setSelectedCellId(newCell.id);
    toast.success("سلول جدید اضافه شد");
  };

  const addCell = (type: "code" | "text") => {
    const newCell: Cell = {
      id: Date.now().toString(),
      type,
      content:
        type === "code"
          ? "# کد خود را اینجا بنویسید"
          : "متن خود را اینجا بنویسید...",
      executionStatus: "idle",
    };
    setCells((prev) => [...prev, newCell]);
    setSelectedCellId(newCell.id);
    toast.success("سلول جدید اضافه شد");
  };

  return {
    cells,
    selectedCellId,
    setSelectedCellId,
    runCell,
    deleteCell,
    moveCellUp,
    moveCellDown,
    updateCellContent,
    addCell,
    addCellBelow,
  };
}
