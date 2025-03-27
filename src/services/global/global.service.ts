import { DefResult } from '../../types/auth.types';
import { GlobalModel } from '../../models/global.model';
import { GlobalGetType, GlobalPayloadType } from '../../types/global.types';
import ApiError from '../../errors/api.errors';
import { Sequelize } from 'sequelize';

class GlobalService {

  static get_all = async (): Promise<ApiError | GlobalGetType> => {
    try {
      const globals = await GlobalModel.findAll({
        attributes: [['id', 'key'], 'name', 'count', [Sequelize.fn('TO_CHAR', Sequelize.col('updatedAt'), 'DD-MM-YYYY HH24:MI'), 'updatedAt']],
      }) as any[];
      globals.forEach((glob) => {
        switch (glob.name) {
          case 'workers': {
            glob.name = 'Workers';
            break;
          }
          case 'clients': {
            glob.name = 'Clients';
            break;
          }
          case 'com_projects': {
            glob.name = 'Coming Projects';
            break;
          }
          case 'run_projects': {
            glob.name = 'Running Projects';
            break;
          }
        }
      });
      return { data: globals, status: 200 };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };

  static update = async (payload: GlobalPayloadType): Promise<DefResult | ApiError> => {
    try {
      const constant = await GlobalModel.findOne({ where: { name: payload.name } });
      if (!constant) return ApiError.notFound('Something went wrong!');
      await constant.update(payload);
      return { message: 'Updated successfully', status: 200 };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };
}

export default GlobalService;
