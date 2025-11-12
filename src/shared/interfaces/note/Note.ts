import type { Recording } from "../recording/Recording";
import type { User } from "../user/User";

export interface Note {
  id: string;
  content: string;
  recording: Recording;
  createdBy: User; 
  createdAt: Date;
  updatedAt: Date;
}