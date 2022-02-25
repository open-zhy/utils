export const isValidEmail = (email: string) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ig).test(email);
