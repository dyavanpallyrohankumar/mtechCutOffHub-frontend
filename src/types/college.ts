import {
  CoEducationType,
  CollegeType,
  Region,
  AidedStatus,
  HostelAvailability,
  MinorityStatus,
} from "./enums";
import { CollegeProgram } from "./program";
/* ============================================================
 * COLLEGE LIST DTO
 * ============================================================ */

export interface CollegeList {
  collegeCode: string;
  collegeName: string;
  district: string;
  address: string;
  city: string;
  stateName: string;
  establishmentYear: number;
  coEducationType: CoEducationType;
}

/* ============================================================
 * PAGE RESPONSE
 * ============================================================ */

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

/* ============================================================
 * FILTER DTO
 * ============================================================ */

export interface CollegeFilter {
  state?: string;
  district?: string;
  city?: string;
  course?: string;

  collegeType?: CollegeType;
  region?: Region;

  minority?: boolean;
  selfFinance?: boolean;

  aidedStatus?: AidedStatus;
  hostel?: HostelAvailability;

  university?: string;

  feeMin?: number;
  feeMax?: number;

  search?: string;
}
export interface CollegeDetails {
  collegeCode: string;
  collegeName: string;

  establishmentYear: number;

  coEducationType: CoEducationType;

  address: string;

  district: string;

  city: string;

  stateName: string;

  latitude: number;

  longitude: number;

  phone: string;

  email: string;

  website: string;

  collegeType: CollegeType;

  minorityStatus: MinorityStatus;

  aidedStatus: AidedStatus;

  hostelAvailability: HostelAvailability;

  affiliatedUniversity: string;

  programs: CollegeProgram[];
}
