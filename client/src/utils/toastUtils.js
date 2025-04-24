import { toast } from 'react-toastify';

/**
 * Show a success toast notification
 * @param {string} message - The message to display
 */
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

/**
 * Show an error toast notification
 * @param {string} message - The message to display
 */
export const showErrorToast = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

/**
 * Show an info toast notification
 * @param {string} message - The message to display
 */
export const showInfoToast = (message) => {
  toast.info(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

/**
 * Show a warning toast notification
 * @param {string} message - The message to display
 */
export const showWarningToast = (message) => {
  toast.warning(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
