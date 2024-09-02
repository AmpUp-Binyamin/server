// src/types/express/index.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      body: {
        userId: string;
        [key: string]: any;
      };
    }
  }
}