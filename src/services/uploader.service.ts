import path from 'path';
import { v4 as Uuid } from 'uuid';
import * as fs from 'fs';
import ApiError from '../errors/api.errors';

class UploaderService {

  static create = async (files: any): Promise<ApiError | string[]> => {
    try {
      const dirname: string = path.dirname(__dirname);
      const fileIds: string[] = [];
      const fileArray = Array.isArray(files) ? files : [files];
      for (const file of fileArray) {
        const fileName: string = `${Uuid()}.png`;
        fileIds.push(process.env.API_URL + '/static/' + fileName);
        await file.mv(path.resolve(dirname, '..', 'static', fileName));
      }
      return fileIds;
    } catch (e) {
      throw ApiError.badRequest(e);
    }
  };

  static delete = async (id: string): Promise<ApiError | { status: number; message: string }> => {
    try {
      const filePath = `src/static/${id}.png`;
      fs.unlink(filePath, (err) => {
        if (err) return ApiError.badRequest('File does not exist or cannot be deleted.');
        return;
      });
      return {
        message: 'File deleted successfully',
        status: 200
      };
    } catch (e) {
      throw ApiError.badRequest(e);
    }
  };
}

export default UploaderService;
