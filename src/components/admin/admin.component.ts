import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/api.errors';
import AdminService from '../../services/admin/admin.service';
import { IPayloadAdmin } from '../../types/admin.types';

class AdminComponent {
  static get_all = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search_data }: { search_data: string } = req.body;
      const result = await AdminService.get_all(search_data);
      res.status(result.status).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

  static get_id = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await AdminService.get_id(id);
      res.status(result.status).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

  static create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: IPayloadAdmin = req.body;
      const result = await AdminService.create(payload);
      res.status(result.status).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

  static delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.body;
      const result = await AdminService.delete(id);
      res.status(result.status).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

}

export default AdminComponent;