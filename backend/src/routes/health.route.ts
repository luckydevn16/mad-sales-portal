import { Router, Request, Response } from 'express';

const healthRoute = Router();

// Health check route
healthRoute.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

export default healthRoute;
