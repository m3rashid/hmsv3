import { Handler, NextFunction, Request, Response } from 'express';

export const useRoute = (check: Handler) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(check(req: Request, res: Response, next)).catch(next);
};
