import { Gender } from "./enums";


/* ---------------- College Details ---------------- */
export interface Branch {
  id: number;
  branchName: string;
  branchCode: string;
  collegeProgramCode: string;
}

export interface CollegeDetails {
  collegeName: string;
  collegeAddress: string;
  collegeCode: string;
  universityName: string;
  collegeType: string;
  branches: Branch[];
}

/* ---------------- Common DTO ---------------- */

export interface ExamDTO {
  id: number;
  examName: string;
  examCode: string;
  conductingAuthority: string;
}

/* ---------------- College Cutoff Response ---------------- */

export interface CutoffSummaryDTO {
  year: number;
  phase: string;
  category: string;
  exam: ExamDTO;
  gender: Gender;
  startRank: number;
  endRank: number;
  startPercentile: number | null;
  endPercentile: number | null;
}



export interface CutoffData {
  exam: ExamDTO;
  year: number;
  phase: string;
  gender: Gender;
  category: string;
  startRank: number;
  endRank: number;
  startPercentile: number | null;
  endPercentile: number | null;
}

/* ---------------- Program Cutoff Response ---------------- */

export interface GenderCutoffDTO {
  gender: Gender;
  startRank: number;
  endRank: number;
  startPercentile: number | null;
  endPercentile: number | null;
}

export interface ExamGroupDTO {
  exam: ExamDTO;
  genders: GenderCutoffDTO[];
}

export interface CategoryDTO {
  category: string;
  exams: ExamGroupDTO[];
}

export interface PhaseDTO {
  phase: string;
  categories: CategoryDTO[];
}

export interface YearDTO {
  year: number;
  phases: PhaseDTO[];
}

export interface BranchCutoffStructuredResponseDTO {
  collegeId: number;
  branchId: number;
  years: YearDTO[];
}
