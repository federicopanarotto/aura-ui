import type { Note } from "../note/Note";
import type { Review } from "../review/Review";
import type { User } from "../user/User";

export type Recording = {
  id: string;
  filePath: string;
  fileName: string;
  originalFileName: string;
  isTranscrabing: boolean;
  text: string;
  notes: Note[];
  review: Review;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}