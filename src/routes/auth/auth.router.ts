import Router, { Application } from 'express';
// import { AuthController } from '../../components/auth';
// import { validate } from '../../middlewares/validations/validate.schema';
// import { ChangePasswordSchema, ResetPasswordSchema, SignInSchema, activationSchema, forgotPasswordSchema } from '../../schema/auth.schema';
// import { AnyZodObject } from 'zod';

const router = Router();
//
// router.post('/request_invite', AuthController.request_invite);
// router.post('/activate_invite', AuthController.activate_invite);
// router.post('/sign-in', AuthController.sign_in);
// router.post('/forgot-password', AuthController.forgot_password);
// router.post('/telegram_auth', AuthController.telegram_auth);
// router.post('/check_token', AuthController.check_token);

// router.post('/sign-in', validate(SignInSchema as AnyZodObject), AuthController.signIn as Application);
// router.post('/forgot', validate(forgotPasswordSchema as AnyZodObject), AuthController.forgotPassword as Application);
// router.post('/reset-password', validate(ResetPasswordSchema as AnyZodObject), AuthController.resetPassword as Application);
// router.post('/change-password', validate(ChangePasswordSchema as AnyZodObject), AuthController.changePassword as Application);
// router.post('/account/activation', validate(activationSchema as AnyZodObject), AuthController.activation as Application);

export default router;