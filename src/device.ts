/**
 * Test whether the browser is on mobile
 * 
 * @returns 
 */
export const isMobile = (): boolean => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent);
