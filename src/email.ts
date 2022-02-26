/**
 * Check whether a string is a valid email
 * 
 * @param email `
 * @returns 
 */
export const isValidEmail = (email: string) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ig).test(email);
