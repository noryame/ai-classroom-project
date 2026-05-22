export enum Role {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

export class User {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: Role;
  profilePicture?: string;
}