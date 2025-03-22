import Router, { Application } from 'express';
import { validate } from '../../middlewares/validations/validate.schema';
import { AnyZodObject } from 'zod';
import { GlobalUpdateSchema } from '../../schema/global.schema';
import AdminAuth from '../../middlewares/auth/admin.auth';
import GlobalController from '../../components/global/global.controller';

const router = Router();

router.get('/get-all', GlobalController.get_all as Application);
router.post('/update', AdminAuth, validate(GlobalUpdateSchema as AnyZodObject), GlobalController.update as Application);

export default router;