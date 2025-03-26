import Router, { Application } from 'express';
import { validate } from '../../middlewares/validations/validate.schema';
import { AnyZodObject } from 'zod';
import { ContactCreateSchema, ContactGetDeleteByIdSchema } from '../../schema/contact.schema';
import ContactController from '../../components/contact/contact.controller';
import AdminAuth from '../../middlewares/auth/admin.auth';

const router = Router();

router.get('/get-all', AdminAuth, ContactController.get_all as Application);
router.post('/create', validate(ContactCreateSchema as AnyZodObject), ContactController.create as Application);
router.get('/get-by-id/:id', AdminAuth, ContactController.get_id as Application);
router.post('/delete', AdminAuth, validate(ContactGetDeleteByIdSchema as AnyZodObject), ContactController.delete as Application);


export default router;
