export const createHttpExceptionBody = (message: object | string, error?: string, statusCode?: number) => {
  if (!message) {
    return { statusCode, error };
  }
  return { statusCode, error, message };
};
