import { DefResult } from '../../types/auth.types';
import { GlobalModel } from '../../models/global.model';
import { GlobalGetType, GlobalPayloadType } from '../../types/global.types';
import ApiError from '../../errors/api.errors';

class GlobalService {

  static get_all = async (): Promise<ApiError | GlobalGetType> => {
    try {
      const globals = await GlobalModel.findAll();
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
      return { message: 'Global has been updated', status: 200 };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };
}

export default GlobalService;