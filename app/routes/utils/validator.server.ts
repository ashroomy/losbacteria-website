export const validateEmail = (email: string): string | undefined => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.length || !validRegex.test(email)) {
      return "El correo que escribiste no es válido. Intentalo de nuevo."
    }
  }