import ApiError from '../../errors/api.errors';
import { DefResult } from '../../types/auth.types';
import { ContactModel } from '../../models/contact.model';
import { ContactGetType } from '../../types/contact.types';
import { v4 as uuid } from 'uuid';

class ContactService {
  static create = async (payload: any): Promise<ApiError | DefResult> => {
    try {
      const is_exists = await ContactModel.findOne({ where: { email: payload.email } });
      if (is_exists) return ApiError.badRequest('An inquiry has already been sent from your email to Contact Us. Please wait for the administrator\'s response or reach out via our hotline');
      await ContactModel.create({ id: uuid(), ...payload });
      return { message: 'Your requests has been sent. Please wait for the administrator\'s response', status: 200 };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };

  static delete = async (id: string): Promise<ApiError | DefResult> => {
    try {
      const is_exists = await ContactModel.findByPk(id);
      if (!is_exists) return ApiError.notFound('Request with current ID does not exist');
      await is_exists.destroy();
      return { message: 'Request has been deleted successfully', status: 200 };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };

  static get_all = async (): Promise<ApiError | ContactGetType> => {
    try {
      const requests = await ContactModel.findAll();
      return { data: requests, status: 200 };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };

  static get_id = async (id: string): Promise<ApiError | ContactGetType> => {
    try {
      const request = await ContactModel.findByPk(id);
      if (!request) return ApiError.notFound('Request with current ID does not exist');
      return { data: request, status: 200 };
    } catch (e) {
      return ApiError.badRequest(e);
    }
  };
}

export default ContactService;