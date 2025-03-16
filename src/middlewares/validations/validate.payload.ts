export const emailValidation = (email: string): RegExpMatchArray => {
  return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) as RegExpMatchArray;
};

export const passwordValidation = (password: string): RegExpMatchArray | null => {
  return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/);
};

export const objectValidation = (data: any) => {
  const result: any = {};
  for (const key in data) {
    const value: any = data[key];
    if (value !== null && value !== '' && value !== '{}') {
      result[key] = value;
    }
  }
  return result;
};
