import { toast } from 'react-toastify';

export const showToast = (
  message: string,
  type: 'info' | 'success' | 'warning' | 'error' = 'info',
  toastId?: string
) => {
  const id = toastId || message;

  switch (type) {
    case 'success':
      toast.success(message, { toastId: id });
      break;
    case 'warning':
      toast.warning(message, { toastId: id });
      break;
    case 'error':
      toast.error(message, { toastId: id });
      break;

    default:
      toast.info(message, { toastId: id });
      break;
  }
};
