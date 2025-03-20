import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/api.errors';
import ContactService from '../../services/contact/contact.service';

class ContactController {
  static create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: any = req.body;
      const result = await ContactService.create(payload);
      res.status(result.status).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

  static get_all = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await ContactService.get_all();
      res.status(result.status).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

  static get_id = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await ContactService.get_id(id);
      res.status(result.status).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

  static delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.body;
      const result = await ContactService.delete(id);
      res.status(result.status).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };
}

export default ContactController;