import { DefResult } from '../../types/auth.types';
import { ReviewGetType, ReviewModelType, ReviewPayloadType } from '../../types/review.types';
import { ReviewModel } from '../../models/review.model';
import { v4 as uuid } from 'uuid';
import ApiError from '../../errors/api.errors';

class ReviewService {
  static create = async (payload: ReviewPayloadType): Promise<DefResult | ApiError> => {
    try {
      const is_exist = await ReviewModel.findOne({ where: { full_name: payload.full_name, review: payload.review } });
      if (is_exist) return ApiError.badRequest('Review with current full name and review message is already exist');
      await ReviewModel.create({ id: uuid(), ...payload });
      return { message: 'Review has been created successfully', status: 200 };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };

  static get_all = async (): Promise<ApiError | ReviewGetType> => {
    try {
      const reviews = await ReviewModel.findAll();
      return {
        data: reviews,
        status: 200,
      };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };

  static get_id = async (id: string): Promise<ApiError | ReviewGetType> => {
    try {
      const is_exist = await ReviewModel.findByPk(id);
      if (!is_exist) return ApiError.badRequest('Review with current id is already exist');
      return {
        data: is_exist,
        status: 200,
      };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };

  static delete = async (id: string): Promise<DefResult | ApiError> => {
    try {
      const is_exist = await ReviewModel.findByPk(id) as ReviewModelType | null;
      if (!is_exist) return ApiError.badRequest('Review with current id does not exist');
      await is_exist.destroy();
      return { message: 'Review has been deleted successfully', status: 200 };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };

  static update = async (payload: ReviewModelType): Promise<DefResult | ApiError> => {
    try {
      const review = await ReviewModel.findByPk(payload.id);
      if (!review) return ApiError.badRequest('Review with current id does not exist');
      await review.update(payload);
      return { message: 'Review has been updated successfully', status: 200 };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };
}

export default ReviewService;