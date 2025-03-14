import Router, { Application, Request, Response } from 'express';

const router = Router();
import AdminAuth from '../middlewares/auth/admin.auth';

// router.use('/auth', auth_router);
// router.use('/admin', AdminAuth as Application, admin_router);

//Global
router.use('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Welcome to nLendon`s backend application. Ask him for security token! ' });
});

export default router;