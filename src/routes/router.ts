import Router, { Request, Response } from 'express';
import auth_router from './auth/auth.router';
import admin_router from './admin/admin.router';
import contact_router from './contact/contact.router';
import AdminAuth from '../middlewares/auth/admin.auth';

const router = Router();

router.use('/auth', auth_router);
router.use('/admin', AdminAuth, admin_router);
router.use('/contact', contact_router);

//Global
router.use('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Welcome to vir constructions\' backend application. Ask him for security token! ' });
});

export default router;