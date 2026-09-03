import { useRef, useState } from "react";
import {
  FileSpreadsheet,
  Upload,
  Download,
  CheckCircle2,
  AlertTriangle,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { uploadApi } from "@/api/uploadApi";

type ImportType = "master" | "students";

const ExcelImportPage = () => {
  const [activeType, setActiveType] = useState<ImportType>("master");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const resetFile = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleTypeChange = (type: ImportType) => {
    if (uploading) return;

    setActiveType(type);
    resetFile();
  };

  const validateFile = (file: File): boolean => {
    const fileName = file.name.toLowerCase();

    if (!fileName.endsWith(".xlsx")) {
      toast.error("Invalid file. Please select an Excel .xlsx file.");

      return false;
    }

    return true;
  };

  const handleFileSelect = (file?: File) => {
    if (!file) return;

    if (!validateFile(file)) {
      resetFile();
      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    handleFileSelect(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);

    if (uploading) return;

    const file = event.dataTransfer.files?.[0];

    handleFileSelect(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!uploading) {
      setDragActive(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an Excel file first.");
      return;
    }

    try {
      setUploading(true);

      const response =
        activeType === "master"
          ? await uploadApi.importMaster(selectedFile)
          : await uploadApi.importStudents(selectedFile);

      toast.success(response.data || "Import started successfully.");

      resetFile();
    } catch (error: any) {
      console.error("Excel import failed:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Excel import failed. Please check the file and try again.";

      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  const sampleFile =
    activeType === "master"
      ? "/samples/admission-import.xlsx"
      : "/samples/admission-import.xlsx";

  const title =
    activeType === "master" ? "Master Data Import" : "Student Data Import";

  const description =
    activeType === "master"
      ? "Import colleges, programs, exams and other master data."
      : "Import student records and related admission data.";

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-primary/10
              text-primary
              flex
              items-center
              justify-center
            "
          >
            <FileSpreadsheet className="w-5 h-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">Excel Import</h1>

            <p className="text-sm text-muted-foreground mt-1">
              Import platform data using validated Excel workbooks.
            </p>
          </div>
        </div>
      </div>

      {/* Import Type Tabs */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-2
          p-1.5
          bg-muted/40
          border
          border-border
          rounded-xl
          mb-6
        "
      >
        <button
          type="button"
          disabled={uploading}
          onClick={() => handleTypeChange("master")}
          className={`
            flex
            items-center
            justify-center
            gap-2
            px-4
            py-3
            rounded-lg
            text-sm
            font-medium
            transition-all
            ${
              activeType === "master"
                ? "bg-card text-primary shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            }
          `}
        >
          <FileSpreadsheet className="w-4 h-4" />
          Master Data
        </button>

        <button
          type="button"
          disabled={uploading}
          onClick={() => handleTypeChange("students")}
          className={`
            flex
            items-center
            justify-center
            gap-2
            px-4
            py-3
            rounded-lg
            text-sm
            font-medium
            transition-all
            ${
              activeType === "students"
                ? "bg-card text-primary shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            }
          `}
        >
          <FileSpreadsheet className="w-4 h-4" />
          Student Data
        </button>
      </div>

      {/* Main Content */}

      <div
        className="
          bg-card
          border
          border-border
          rounded-2xl
          p-6
          md:p-8
        "
      >
        {/* Section Header */}

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>

            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>

          {/* Sample */}

          <a
            href={sampleFile}
            download
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-4
              py-2.5
              rounded-lg
              border
              border-border
              text-sm
              font-medium
              hover:bg-muted
              transition-colors
              shrink-0
            "
          >
            <Download className="w-4 h-4" />
            Download Sample
          </a>
        </div>

        {/* Drop Zone */}

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`
            relative
            border-2
            border-dashed
            rounded-2xl
            p-8
            md:p-12
            text-center
            cursor-pointer
            transition-all
            ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/20"
            }
            ${uploading ? "opacity-60 cursor-not-allowed" : ""}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            onChange={handleInputChange}
            className="hidden"
            disabled={uploading}
          />

          {!selectedFile ? (
            <>
              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-primary/10
                  text-primary
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-4
                "
              >
                <Upload className="w-6 h-6" />
              </div>

              <h3 className="text-sm font-semibold">
                Drop your Excel file here
              </h3>

              <p className="text-xs text-muted-foreground mt-2">
                or click to browse from your computer
              </p>

              <div className="mt-4 text-[11px] text-muted-foreground">
                Supported format: .xlsx
              </div>
            </>
          ) : (
            <>
              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-green-500/10
                  text-green-500
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-4
                "
              >
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h3 className="text-sm font-semibold break-all">
                {selectedFile.name}
              </h3>

              <p className="text-xs text-muted-foreground mt-2">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  resetFile();
                }}
                disabled={uploading}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  mt-4
                  px-3
                  py-1.5
                  rounded-lg
                  text-xs
                  text-destructive
                  hover:bg-destructive/10
                "
              >
                <X className="w-3.5 h-3.5" />
                Remove
              </button>
            </>
          )}
        </div>

        {/* Warning */}

        <div
          className="
            flex
            items-start
            gap-3
            p-4
            mt-6
            rounded-xl
            bg-amber-500/5
            border
            border-amber-500/20
          "
        >
          <AlertTriangle
            className="
              w-4
              h-4
              text-amber-500
              shrink-0
              mt-0.5
            "
          />

          <div>
            <div className="text-sm font-medium">Before importing</div>

            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Use the provided sample workbook as the template. Do not rename,
              remove or reorder required columns unless the backend import
              specification allows it.
            </p>
          </div>
        </div>

        {/* Upload */}

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-5
              py-2.5
              rounded-lg
              btn-gradient
              text-sm
              font-medium
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Starting Import...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Import {activeType === "master" ? "Master Data" : "Students"}
              </>
            )}
          </button>
        </div>

        {/* Processing Information */}

        <div
          className="
            mt-6
            pt-6
            border-t
            border-border
            text-xs
            text-muted-foreground
          "
        >
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />

            <span>
              Upload validation happens before the import starts. The import
              itself runs asynchronously on the server. You will receive an
              email when processing is complete.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelImportPage;
