import ApiErrors from '../../errors/api.errors';
import Jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const AdminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { headers: { authorization } }: any = req;
    const { SECRET_KEY } = process.env;
    if (!authorization) {
      next(ApiErrors.badRequest('Token required'));
    }
    const token = authorization.replace('Bearer ', '');
    let data: JwtPayload;
    try {
      data = Jwt.verify(token, SECRET_KEY as Secret) as JwtPayload;
      if (!data) {
        next(ApiErrors.badRequest('Permission Denied'));
      }
    } catch (e) {
      next(ApiErrors.noPermission('Expired or Invalid token'));
    }
    next();
  } catch (e) {
    next(ApiErrors.badRequest(e));
  }
};

export default AdminAuth;