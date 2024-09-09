declare namespace Express {
  interface User {
    id: number;
    username: string;
    email?: string;
    googleId?: string;
    githubId?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  interface Request {
    user?: User; // Optional because it may not always be present
  }
}