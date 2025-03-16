import { object, string, AnyZodObject, z as Zod } from 'zod';
import { passwordValidation } from '../middlewares/validations/validate.payload';

export const SignInSchema = object({
  body: object({
    email: string({ invalid_type_error: 'Invalid Type of Email' })
      .min(6, 'Email must contain minimum 6 digits')
      .max(36, 'Email cannot have more digits then 36')
      .email('Invalid Email'),
    password: string({ invalid_type_error: 'Invalid Type of Password' })
      .min(8, 'Password must contain minimum 8 digits')
      .max(50, 'Password cannot have more digits then 50')
      .superRefine((password, ctx) => {
        if (!passwordValidation(password)) ctx.addIssue({ code: 'custom', message: 'Invalid Password' });
      }),
  }),
});

export const forgotPasswordSchema = Zod.object({
  body: object({
    email: string({ invalid_type_error: 'Invalid Type of Email' })
      .min(6, 'Email must contain minimum 6 digits')
      .max(36, 'Email cannot have more digits then 36')
      .email('Invalid Email'),
  }),
});

export const activationSchema = object({
  body: object({
    token: string({ invalid_type_error: 'Invalid Type of Token' }).min(10, 'Invalid Token'),
    password: string({ invalid_type_error: 'Invalid Type of Password' })
      .min(8, 'Password must contain minimum 8 digits')
      .max(50, 'Password cannot have more digits then 50')
      .superRefine((password, ctx) => {
        if (!passwordValidation(password)) ctx.addIssue({ code: 'custom', message: 'Invalid Password' });
      }),
  }),
});

export const ResetPasswordSchema: AnyZodObject = object({
  body: object({
    token: string({ invalid_type_error: 'Invalid Type of Token' }).min(10, 'Invalid Token'),
    password: string({ invalid_type_error: 'Invalid Type of Password' })
      .min(8, 'Password must contain minimum 8 digits')
      .max(50, 'Password cannot have more digits then 50')
      .superRefine((password, ctx) => {
        if (!passwordValidation(password)) ctx.addIssue({ code: 'custom', message: 'Invalid Password' });
      }),
    repeatPassword: string({ invalid_type_error: 'Invalid Type of Repeat Password' })
      .min(8, 'Password must contain minimum 8 digits')
      .max(50, 'Password cannot have more digits then 50')
      .superRefine((password, ctx) => {
        if (!passwordValidation(password)) ctx.addIssue({ code: 'custom', message: 'Invalid Password' });
      }),
  }).superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword)
      ctx.addIssue({
        code: 'custom',
        message: 'Password and Repeat password do not match',
      });
  }),
}) as unknown as AnyZodObject;

export const ChangePasswordSchema = object({
  body: object({
    oldPassword: string({ invalid_type_error: 'Invalid Type of Password' })
      .min(8, 'Password must contain minimum 8 digits')
      .max(50, 'Password cannot have more digits then 50')
      .superRefine((password, ctx) => {
        if (!passwordValidation(password)) ctx.addIssue({ code: 'custom', message: 'Invalid Password' });
      }),
    newPassword: string({ invalid_type_error: 'Invalid Type of Password' })
      .min(8, 'Password must contain minimum 8 digits')
      .max(50, 'Password cannot have more digits then 50')
      .superRefine((password, ctx) => {
        if (!passwordValidation(password)) ctx.addIssue({ code: 'custom', message: 'Invalid Password' });
      }),
    repeatPassword: string({ invalid_type_error: 'Invalid Type of Repeat Password' })
      .min(8, 'Password must contain minimum 8 digits')
      .max(50, 'Password cannot have more digits then 50')
      .superRefine((password, ctx) => {
        if (!passwordValidation(password)) ctx.addIssue({ code: 'custom', message: 'Invalid Password' });
      }),
  }),
});

export const TokenSchema = object({
  headers: object({
    authorization: string({
      invalid_type_error: 'Invalid Type of Token',
      required_error: 'Authorization Key required',
    })
      .min(100, 'Invalid Token')
      .superRefine((token: string, ctx) => {
        token = token.replace('Bearer ', '');
        const regex = /^[\w-]+?\.[\w-]+?\.[\w-]+?$/;
        if (!token.match(regex)) ctx.addIssue({ code: 'custom', message: 'Invalid Token' });
      }),
  }),
});
