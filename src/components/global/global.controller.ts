import { Request, Response, NextFunction } from 'express';
import ApiError from '../../errors/api.errors';
import GlobalService from '../../services/global/global.service';

class GlobalController {

  static get_all = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await GlobalService.get_all();
      res.status(200).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

  static update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = req.body;
      const result = await GlobalService.update(payload);
      res.status(200).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };
}

export default GlobalController;
