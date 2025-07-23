import Toast, { POSITION, TYPE } from "vue-toastification";
import type { App } from "vue";
import "vue-toastification/dist/index.css";

const toastOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
  toastClassName: "custom-toast",
  bodyClassName: "custom-toast-body",
  containerClassName: "custom-toast-container",
  toastDefaults: {
    [TYPE.SUCCESS]: {
      containerClassName: "black-toast",
      toastClassName: "black-toast",
    },
    [TYPE.ERROR]: {
      containerClassName: "black-toast",
      toastClassName: "black-toast",
    },
    [TYPE.WARNING]: {
      containerClassName: "black-toast",
      toastClassName: "black-toast",
    },
    [TYPE.INFO]: {
      containerClassName: "black-toast",
      toastClassName: "black-toast",
    },
    [TYPE.DEFAULT]: {
      containerClassName: "black-toast",
      toastClassName: "black-toast",
    },
  },
};

export function setupToast(app: App) {
  app.use(Toast, toastOptions);
}
