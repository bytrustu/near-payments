export const isValidateNumber = (value: string) => {
  const regExp = /^[0-9]*$/;
  return regExp.test(value);
};
