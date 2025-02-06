import http from '@services/_http';

const VITE_BASE_URL_SERVICES_JSON_PLACEHOLDER_API = import.meta.env.VITE_BASE_URL_SERVICES_JSON_PLACEHOLDER_API;

export default {
  getList: (queryParams: string): Promise<any> => {
    return http.requestToServer({
      baseURL: VITE_BASE_URL_SERVICES_JSON_PLACEHOLDER_API,
      url: `/users?${ queryParams }`,
      method: 'GET'
    }, true);
  }
};
