import { NextFunction, Request, Response } from 'express';
import UploaderService from '../services/uploader.service';
import ApiError from '../errors/api.errors';

class UploaderController {

  static create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { files }: any = req.files;
      const result = await UploaderService.create(files);
      res.send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

  static delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await UploaderService.delete(id);
      res.send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };
}

export default UploaderController;
