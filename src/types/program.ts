import { CollegeList } from "./college";
import { Region } from "./enums";

export interface CollegeProgram {
  courseCode: string;
  courseName: string;
  collegeProgramCode: string;

  intake: number;
  fee: number;

  selfFinance: boolean;

  region: Region;
}
/* --------------------------------------------------
 * Course Summary DTO
 * -------------------------------------------------- */

export interface CourseSummary {
    courseCode: string;
    courseName: string;
    collegeCount: number;
  
    colleges: CollegeList[];
  }