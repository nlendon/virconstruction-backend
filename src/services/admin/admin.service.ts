import ApiError from '../../errors/api.errors';
import { Get_Promise_Type } from './type';
import { AdminModel } from '../../models/admin.model';
import { Op, Sequelize } from 'sequelize';
import { AdminModelType, DefResult } from '../../types/auth.types';
import { IPayloadAdmin } from '../../types/admin.types';

class AdminService {
  static get_all = async (search: string): Promise<ApiError | Get_Promise_Type> => {
    try {
      const { rows } = await AdminModel.findAndCountAll({
        where: {
          ...(search && {
            [Op.or]: {
              full_name: {
                [Op.iLike]: `%${search}%`,
              },
              email: {
                [Op.iLike]: `%${search}%`,
              },
            },
          }),
        },
        attributes: [['id', 'key'], 'full_name', 'email', 'is_verified', [Sequelize.fn('TO_CHAR', Sequelize.col('createdAt'), 'DD-MM-YYYY'), 'createdAt']],
      });
      return {
        status: 200,
        data: rows || [],
      };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };

  static get_id = async (id: string | undefined): Promise<ApiError | { data: AdminModelType; status: number }> => {
    try {
      const admin = await AdminModel.findByPk(id, {
        attributes: ['id',
          'email', 'full_name', 'is_verified'],
      }) as any;
      if (!admin) return ApiError.notFound('Administrator with current ID does not exist');
      return {
        data: admin,
        status: 200,
      };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };

  static create = async (payload: IPayloadAdmin): Promise<ApiError | DefResult> => {
    try {
      const { email, full_name } = payload;
      const check = await AdminModel.findOne({ where: { email: email } });
      if (check) return ApiError.badRequest('Administrator with current email already exists');
      await AdminModel.create({
        email: email,
        full_name: full_name,
      });
      return {
        status: 200,
        message: 'Administrator created successfully',
      };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };

  static delete = async (id: string): Promise<ApiError | DefResult> => {
    try {
      const admin = await AdminModel.findByPk(id);
      if (!admin) return ApiError.notFound('Administrator with current ID does not exists');
      await admin.destroy();
      return { message: 'Administrator with current ID has been destroyed', status: 200 };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };

}

export default AdminService;
