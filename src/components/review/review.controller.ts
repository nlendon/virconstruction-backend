import { Request, Response, NextFunction } from 'express';
import ApiError from '../../errors/api.errors';
import ReviewService from '../../services/review/review.service';

class ReviewController {
  static create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = req.body;
      const result = await ReviewService.create(payload);
      res.status(200).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

  static get_all = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await ReviewService.get_all();
      res.status(200).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

  static get_id = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await ReviewService.get_id(id);
      res.status(200).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

  static delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.body;
      const result = await ReviewService.delete(id);
      res.status(200).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

  static update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await ReviewService.update({ id, ...data });
      res.status(200).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };
}

export default ReviewController;