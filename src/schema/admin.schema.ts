import { object, string, enum as enum_, z } from 'zod';

export const UserCreateSchema = object({
  body: object({
    full_name: string({ invalid_type_error: 'Invalid Type of Full Name' })
      .min(3, 'Full Name must contain minimum 6 digits')
      .max(50, 'Full Name cannot contain more than 50 digits'),
    email: string({ invalid_type_error: 'Invalid Type of Email' })
      .min(16, 'Email must contain minimum 6 digits')
      .max(50, 'Email cannot contain more than 50 digits')
      .email('Invalid  Email'),
  })
});

export const UserGetDeleteByIdSchema = object({
  body: object({
    id: string({ invalid_type_error: 'Invalid Type of Id' }).trim().uuid()
  })
});
