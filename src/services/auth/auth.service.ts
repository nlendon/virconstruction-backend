import { AuthPayload, DefResult, SignInPromise, AdminModelType } from '../../types/auth.types';
import { generateToken } from '../../helpers/token.generator';
import { AdminModel } from '../../models/admin.model';
import { v4 as uuid } from 'uuid';
import ApiError from '../../errors/api.errors';
import Bcrypt from 'bcrypt';
import Mailer from '../../helpers/node.mailer';
import Jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { Database } from '../../database/database.init';
import { CheckTokenType } from './type';

class AuthService {
  static sign_in = async (payload: AuthPayload): Promise<SignInPromise | ApiError | DefResult> => {
    try {
      const admin = await AdminModel.findOne({ where: { email: payload.email } }) as AdminModelType | null;
      if (!admin) return { message: 'Incorrect Email', status: 404 };
      if (!Bcrypt.compareSync(payload.password, <string>admin?.password))
        return { message: 'Password is incorrect', status: 400 };
      return {
        status: 200,
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
        role: admin.role,
        token: generateToken('14d', { id: admin.id, email: admin.email }) as string | null,
      };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };

  static forgot_password = async (email: string): Promise<ApiError | DefResult> => {
    try {
      const admin = await AdminModel.findOne({ where: { email } }) as AdminModelType | null;
      if (admin) {
        const secret = uuid();
        const checkToken: any = generateToken('1h', {
          id: admin.id,
          email: admin.email,
          secret,
        });
        await admin.update({ secret });
        await Mailer.forgotPassword(email, checkToken, admin.full_name);
      }
      return {
        status: 200,
        message: 'If the specified email address is registered in our system, you will receive a password reset email with instructions',
      };

    } catch (e) {
      return ApiError.badRequest(e);
    }
  };
  static reset_password = async (payload: { token: string, password: string }): Promise<ApiError | DefResult> => {
    try {
      let data: JwtPayload;
      try {
        data = Jwt.verify(payload.token, process.env.SECRET_KEY as Secret) as JwtPayload;
      } catch (e) {
        return ApiError.noPermission('Expired or Invalid Token');
      }
      const admin = await AdminModel.findOne({ where: { secret: data.secret } }) as AdminModelType | null;
      if (!admin) return ApiError.badRequest('Requested reset password user is not found');
      admin.password = await Bcrypt.hash(payload.password, 10);
      admin.secret = null;
      await admin.save();
      return {
        status: 200,
        message: 'Password has been changed',
      };
    } catch (e) {
      throw ApiError.badRequest(e);
    }
  };
  static change_password = async (
    authorization: string | undefined,
    payload: { oldPassword: string; newPassword: string; repeatPassword: string },
  ): Promise<ApiError | DefResult> => {
    try {
      if (!authorization) return ApiError.badRequest('Invalid authorization token');
      let data: JwtPayload;
      try {
        authorization = authorization.replace('Bearer ', '');
        data = Jwt.verify(authorization, process.env.SECRET_KEY as Secret) as JwtPayload;
      } catch (e) {
        return ApiError.noPermission('Invalid authorization token');
      }
      if (payload.newPassword !== payload.repeatPassword)
        return ApiError.badRequest('New Password and repeat password is not the same');
      const admin = await AdminModel.findByPk(data.id) as AdminModelType | null;
      if (admin && Bcrypt.compareSync(payload.oldPassword, admin.password)) {
        admin.password = await Bcrypt.hash(payload.newPassword, 10);
        admin.secret = null;
        await admin.save();
        return {
          status: 200,
          message: 'Password has been changed successfully',
        };
      } else {
        return ApiError.notFound('Administrator has not been found, or old password is incorrect');
      }
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };

  static account_activation = async (token: string, password: string): Promise<ApiError | DefResult> => {
    try {
      let data: JwtPayload;
      try {
        data = Jwt.verify(token, process.env.SECRET_KEY as Secret) as JwtPayload;
      } catch (e) {
        return ApiError.badRequest('Expired or Invalid Token');
      }
      const admin = (await AdminModel.findOne({ where: { secret: data.secret } })) as AdminModelType | null;
      if (!admin)
        return ApiError.badRequest('Administrator with current activation link does not exist or has been activated yet');
      const updateData = {
        is_verified: true,
        secret: null,
        password: await Bcrypt.hash(password, 10),
      };
      await admin.update(updateData);
      return {
        status: 200,
        message: 'Administrator has been activated successfully',
      };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };


  static check_token = async (token: string): Promise<ApiError | CheckTokenType> => {
    try {
      let data: JwtPayload;
      try {
        data = Jwt.verify(token, process.env.SECRET_KEY as Secret) as JwtPayload;
      } catch (e) {
        return ApiError.badRequest('Expired or Invalid Token');
      }
      const admin = await AdminModel.findByPk(data.id) as AdminModelType | null;
      if (!admin || admin.password === 'waiting-response') return { status: 401, isValid: false };
      else return { status: 200, isValid: true };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };
}

export default AuthService;
