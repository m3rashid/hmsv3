import { instance } from 'api/instance';

export const getConfig = async () => {
  const res = await instance.get('/admin/config');
  return res.data.config;
};
