import Router, { Application } from 'express';
import { validate } from '../../middlewares/validations/validate.schema';
import { AnyZodObject } from 'zod';
import AdminComponent from '../../components/admin/admin.component';
import { UserCreateSchema, UserGetDeleteByIdSchema } from '../../schema/admin.schema';

const router = Router();

router.post('/get-all', AdminComponent.get_all as Application);
router.get('/get-by-id/:id', AdminComponent.get_id as Application);
router.post('/create', validate(UserCreateSchema as AnyZodObject), AdminComponent.create as Application);
router.delete('/delete', validate(UserGetDeleteByIdSchema as AnyZodObject), AdminComponent.delete as Application);


export default router;