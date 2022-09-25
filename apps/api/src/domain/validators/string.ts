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
  /[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-z-\\.]+/i.test(email);

export const isPasswordValid = (password: string): boolean =>
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?\/~_+-=|\]).{8,}$/g.test(
    password
  );

export const isIdValid = (id: string): boolean =>
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(
    id
  );
