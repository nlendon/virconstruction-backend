import Router, { Application } from 'express';
import { AnyZodObject } from 'zod';
import AuthController from '../../components/auth/auth.controller';
import { validate } from '../../middlewares/validations/validate.schema';
import {
  activationSchema,
  ChangePasswordSchema,
  forgotPasswordSchema,
  ResetPasswordSchema,
  SignInSchema,
} from '../../schema/auth.schema';

const router = Router();

router.post('/sign-in', validate(SignInSchema as AnyZodObject), AuthController.sign_in as Application);
router.post('/forgot-password', validate(forgotPasswordSchema as AnyZodObject), AuthController.forgot_password as Application);
router.post('/reset-password', validate(ResetPasswordSchema as AnyZodObject), AuthController.reset_password as Application);
router.post('/change-password', validate(ChangePasswordSchema as AnyZodObject), AuthController.change_password as Application);
router.post('/account/activation', validate(activationSchema as AnyZodObject), AuthController.account_activation as Application);
router.post('/account/check-token', AuthController.token_check as Application);

export default router;
