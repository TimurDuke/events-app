import {toast} from "react-toastify";

export const addNotificationSuccess = message => {
    return toast.success(message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
};