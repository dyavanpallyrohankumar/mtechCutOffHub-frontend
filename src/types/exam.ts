import { CollegeProgram } from "./program";


export interface ExamSummary {
  id: number;
  examCode: string;
  examName: string;
  conductingAuthority: string;
}


export interface ExamDetails {
  id: number;
  examCode: string;
  examName: string;
  conductingAuthority: string;
  collegeProgram: CollegeProgram[];
}
