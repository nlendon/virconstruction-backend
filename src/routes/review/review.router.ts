import Router, { Application } from 'express';
import { validate } from '../../middlewares/validations/validate.schema';
import { AnyZodObject } from 'zod';
import ReviewController from '../../components/review/review.controller';
import AdminAuth from '../../middlewares/auth/admin.auth';
import { ReviewCreateSchema, ReviewGetDeleteByIdSchema, ReviewUpdateSchema } from '../../schema/review.schema';

const router = Router();

router.get('/get-all', ReviewController.get_all as Application);
router.post('/create', validate(ReviewCreateSchema as AnyZodObject), AdminAuth, ReviewController.create as Application);
router.get('/get-by-id/:id', ReviewController.get_id as Application);
router.post('/delete', AdminAuth, validate(ReviewGetDeleteByIdSchema as AnyZodObject), ReviewController.delete as Application);
router.post('/update/:id', AdminAuth, validate(ReviewUpdateSchema as AnyZodObject), ReviewController.update as Application);

export default router;
