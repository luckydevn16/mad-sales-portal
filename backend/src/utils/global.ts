export {};

declare global {
  namespace Express {
    export interface Request {
      user: Record<string, any>;
    }
  }

  interface DB {
    [key: string]: any;
  }
}


