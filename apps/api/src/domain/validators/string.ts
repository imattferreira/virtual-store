interface RangeParams {
  min: number;
  max: number;
}

export const hasValidLengthRange = (
  str: string,
  { max, min }: Partial<RangeParams>
): boolean => {
  if (min && str.length < min) {
    return false;
  }

  if (max && str.length > max) {
    return false;
  }

  return true;
};

export const isEmailValid = (email: string): boolean =>
  /[a-z0-9_]+@[a-z_]+\.[a-z]{2,3}/i.test(email);

export const isPasswordValid = (password: string): boolean =>
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password);

export const isIdValid = (id: string): boolean =>
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(
    id
  );
