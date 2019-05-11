export const config = {
  API_KEY: process.env.SEND_GRID_API_KEY || 'SEND_GRID_API_KEY',
  from: process.env.SEND_GRID_FROM_MAIL || 'no-reply@eventy.com',
};
