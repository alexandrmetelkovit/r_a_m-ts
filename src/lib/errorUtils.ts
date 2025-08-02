import axios from 'axios';

export const getErrorMessage = (error: unknown): string => {
  let errorMessage = 'Произошла ошибка при загрузке данных: ';

  if (axios.isAxiosError(error)) {
    const axiosError = error;

    if (axiosError.response) {
      errorMessage = `Ошибка сервера ${axiosError.response.status} - ${axiosError.response.data.message}`;
    } else if (axiosError.request) {
      errorMessage = 'Нет ответа от сервера';
    } else {
      errorMessage = `Ошибка: ${axiosError.message}`;
    }
  } else if (error instanceof Error) {
    errorMessage = `Ошибка: ${error.message}`;
  }

  return errorMessage;
};
