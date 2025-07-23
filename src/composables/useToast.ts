import { useToast as useVueToast, POSITION } from "vue-toastification";

interface ToastOptions {
  timeout?: number;
  position?: POSITION;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  hideProgressBar?: boolean;
  icon?: boolean | string;
}

const defaultOptions: ToastOptions = {
  timeout: 3000,
  position: POSITION.BOTTOM_RIGHT,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  hideProgressBar: false,
};

export function useToast() {
  const toast = useVueToast();

  const success = (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options } as any);
  };

  const error = (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...options } as any);
  };

  const info = (message: string, options?: ToastOptions) => {
    toast.info(message, { ...defaultOptions, ...options } as any);
  };

  const warning = (message: string, options?: ToastOptions) => {
    toast.warning(message, { ...defaultOptions, ...options } as any);
  };

  return {
    success,
    error,
    info,
    warning,
  };
}
