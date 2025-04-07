import aspida from '@aspida/fetch';
import api from 'api/$api';
import { NEXT_PUBLIC_API_BASE_PATH } from './envValues';

export const apiClient = api(
  aspida(undefined, {
    baseURL: NEXT_PUBLIC_API_BASE_PATH,
    throwHttpErrors: true,
  }),
);
