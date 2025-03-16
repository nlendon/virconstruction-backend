import { NextFunction, Request, Response } from 'express';
import { AuthPayload, DefResult, SignInPromise } from '../../types/auth.types';
import ApiError from '../../errors/api.errors';
import AuthService from '../../services/auth/auth.service';

class AuthController {
  static sign_in = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: AuthPayload = req.body;
      const result: DefResult | SignInPromise = await AuthService.sign_in({ email, password });
      res.status(result.status).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };
  static forgot_password = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email }: { email: string } = req.body;
      const result: DefResult = await AuthService.forgot_password(email);
      res.status(result.status).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

  static reset_password = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { password, token } = req.body;
      const result = await AuthService.reset_password({ token, password });
      res.status(result.status).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };
  static change_password = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: { oldPassword: string; newPassword: string; repeatPassword: string } = req.body;
      const {
        headers: { authorization }
      } = req;
      const result = await AuthService.change_password(authorization, payload);
      res.status(result.status).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

  static account_activation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { token, password }: { token: string; password: string } = req.body;
      const result = await AuthService.account_activation(token, password);
      res.status(result.status).send(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  };

}

export default AuthController;