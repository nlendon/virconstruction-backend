import Jwt, { Secret } from 'jsonwebtoken';

export const generateToken = (expires: string, data: { id: string, email: string, role: string, secret?: string }) => {
  if (expires && data) {
    // @ts-ignore
    return Jwt.sign(
      { id: data.id, email: data.email, role: data.role, secret: data.secret || null },
      process.env.SECRET_KEY as Secret,
      { expiresIn: expires }
    );
  } else {
    return null;
  }
};