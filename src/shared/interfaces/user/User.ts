export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin' | string;
  fullName: string;
}