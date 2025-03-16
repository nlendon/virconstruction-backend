import Router, { Request, Response } from 'express';
import auth_router from './auth/auth.router';

const router = Router();

router.use('/auth', auth_router);

//Global
router.use('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Welcome to nLendon`s backend application. Ask him for security token! ' });
});

export default router;