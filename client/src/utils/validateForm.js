export const validateRegister = (form, setError) => {
  if (form.password.length < 7) {
    throw new Error("Password must be at least 7 characters");
  }
};
