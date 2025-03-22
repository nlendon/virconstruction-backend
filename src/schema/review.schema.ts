import { object, string } from 'zod';

export const ReviewCreateSchema = object({
  body: object({
    full_name: string({ invalid_type_error: 'Invalid Type of Full Name' })
      .min(6, 'Full Name must contain minimum 6 digits')
      .max(50, 'Full Name cannot contain more than 50 digits'),
    profession: string({ invalid_type_error: 'Invalid Type of Profession' })
      .min(6, 'Profession must contain minimum 6 digits')
      .max(50, 'Profession cannot contain more than 50 digits'),
    review: string({ invalid_type_error: 'Invalid Type of Message' })
      .min(16, 'Review must contain minimum 16 digits')
      .max(256, 'Review cannot contain more than 256 digits'),
  }),
});

export const ReviewGetDeleteByIdSchema = object({
  body: object({
    id: string({ invalid_type_error: 'Invalid Type of Id' }).trim().uuid(),
  }),
});

export const ReviewUpdateSchema = object({
  body: object({
    full_name: string({ invalid_type_error: 'Invalid Type of Full Name' })
      .min(6, 'Full Name must contain minimum 6 characters')
      .max(50, 'Full Name cannot contain more than 50 characters')
      .optional()
      .transform(value => (value === undefined ? undefined : value.trim())),

    profession: string({ invalid_type_error: 'Invalid Type of Profession' })
      .min(6, 'Profession must contain minimum 6 characters')
      .max(50, 'Profession cannot contain more than 50 characters')
      .optional()
      .transform(value => (value === undefined ? undefined : value.trim())),

    review: string({ invalid_type_error: 'Invalid Type of Message' })
      .min(16, 'Review must contain minimum 16 characters')
      .max(256, 'Review cannot contain more than 256 characters')
      .optional()
      .transform(value => (value === undefined ? undefined : value.trim())),
  }).strict(),

  params: object({
    id: string({ invalid_type_error: 'Invalid Type of Id' }).trim().uuid(),
  }),
});
