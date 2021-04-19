import axios from 'axios';

const config = {
  baseURL: '/api',
  headers: {},
};

if (process.env.NODE_ENV === 'development') {
  config.baseURL = 'http://localhost:8080/api';
}

const api = axios.create(config);

const onSuccess = response => {
  if (response.status === 200 && response.data.data) {
    response.data = response.data.data;
  }
  return response;
};

const mapValidationErrorsToFields = details => {
  const errors = details.reduce((acc, detail) => {
    const fieldName = detail.field || '_error';
    const fieldErrors = acc[fieldName] || [];
    fieldErrors.push(detail.message);
    acc[fieldName] = fieldErrors;
    return acc;
  }, {});

  return errors;
};

const nodeDoesNotExistError = error => error.response.data.details.some(d => d.code === 'NodesExist');

const BAD_REQUEST = 400;

const onError = error => {
  const { response: errorResponse } = error;
  if (errorResponse && errorResponse.status === BAD_REQUEST && !nodeDoesNotExistError(error)) {
    const { details } = error.response.data;
    errorResponse.validationErrors = mapValidationErrorsToFields(details);
    return Promise.resolve(errorResponse);
  }
  return Promise.reject(error);
};

api.interceptors.response.use(onSuccess, onError);

export default api;
