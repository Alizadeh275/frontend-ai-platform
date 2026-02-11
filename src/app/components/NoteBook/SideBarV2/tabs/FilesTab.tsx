import {
  Search,
  Upload,
  Download,
  ChevronLeft,
  ChevronDown,
  File,
  Folder,
  FileText,
} from "lucide-react";

const mockFiles = [
  { name: "دفترچه_من.ipynb", type: "notebook", path: "root" },
  {
    name: "داده‌ها",
    type: "folder",
    path: "root",
    children: [
      { name: "data.csv", type: "file", path: "root/data" },
      { name: "results.json", type: "file", path: "root/data" },
    ],
  },
  {
    name: "مدل‌ها",
    type: "folder",
    path: "root",
    children: [{ name: "model.py", type: "file", path: "root/models" }],
  },
];

export function FilesTab({
  expandedFolders,
  setExpandedFolders,
}: {
  expandedFolders: Set<string>;
  setExpandedFolders: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex gap-2 mb-4 p-2 rounded-lg bg-gradient-to-r from-gray-100/50 to-gray-50/30 border border-gray-200/80">
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm transition-all">
          <Search className="w-4 h-4" /> جستجو
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm transition-all">
          <Upload className="w-4 h-4" /> آپلود
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm transition-all">
          <Download className="w-4 h-4" /> دانلود
        </button>
      </div>

      {/* File Tree */}
      <div className="space-y-1">
        {mockFiles.map((item, index) => (
          <div key={index}>
            {item.type === "folder" ? (
              <>
                <button
                  onClick={() => toggleFolder(item.path + "/" + item.name)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gradient-to-l hover:from-blue-50/50 hover:to-white transition-all group"
                >
                  {expandedFolders.has(item.path + "/" + item.name) ? (
                    <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
                  ) : (
                    <ChevronLeft className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
                  )}

                  <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center">
                    <Folder className="w-4 h-4 text-blue-500" />
                  </div>

                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                    {item.name}
                  </span>
                </button>

                {expandedFolders.has(item.path + "/" + item.name) &&
                  item.children && (
                    <div className="mr-8 mt-1 space-y-1">
                      {item.children.map((child, i) => (
                        <button
                          key={i}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-l hover:from-gray-50 hover:to-white transition-all group"
                        >
                          <div className="w-5 h-5 rounded-md bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center">
                            <File className="w-3 h-3 text-gray-500 group-hover:text-gray-700" />
                          </div>
                          <span className="text-sm text-gray-600 group-hover:text-gray-800">
                            {child.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
              </>
            ) : (
              <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gradient-to-l hover:from-emerald-50/50 hover:to-white transition-all group">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-emerald-100 to-emerald-50 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-600">
                  {item.name}
                </span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
