import Router, { Request, Response } from 'express';
import AdminAuth from '../middlewares/auth/admin.auth';
import auth_router from './auth/auth.router';
import admin_router from './admin/admin.router';
import contact_router from './contact/contact.router';
import review_router from './review/review.router';
import global_router from './global/global.router';
import uploader_router from './uploader.router';

const router = Router();

router.use('/auth', auth_router);
router.use('/admin', AdminAuth, admin_router);
router.use('/contact', contact_router);
router.use('/review', review_router);
router.use('/global', global_router);
router.use('/uploader', uploader_router);

//Global
router.use('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Welcome to vir constructions\' backend application! ' });
});

export default router;