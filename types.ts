
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  curriculumsCount: number;
}

export interface Course {
  id: string;
  title: string;
  topics: string[];
  credits: number;
  learningOutcomes: string[];
}

export interface Semester {
  number: number;
  courses: Course[];
}

export interface CapstoneProject {
  title: string;
  description: string;
  requirements: string[];
}

export interface Curriculum {
  id: string;
  userId: string;
  timestamp: number;
  skillDomain: string;
  educationLevel: string;
  semesters: Semester[];
  capstone: CapstoneProject;
  weeklyHours: number;
  industryFocus: string;
}

export interface GenerationParams {
  skill: string;
  level: string;
  semesters: number;
  hours: number;
  industry: string;
}
