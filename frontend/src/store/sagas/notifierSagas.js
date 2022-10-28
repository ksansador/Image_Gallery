import {takeEvery} from 'redux-saga/effects';
import {addNotification} from "../actions/notifierActions";
import {toast} from "react-toastify";

export function* addNotificationSaga({payload}) {
    const {message, variant, options} = payload;
    const defaultOptions = {
        position: "bottom-left",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
        switch (variant) {
            case 'info':
                yield toast.info(message, { ...defaultOptions, ...options });
                break;
            case 'success':
                yield toast.success(message, { ...defaultOptions, ...options });
                break;
            case 'warn':
                yield toast.warn(message, { ...defaultOptions, ...options });
                break;
            case 'error':
                yield toast.error(message, { ...defaultOptions, ...options });
                break;
            default:
                console.error('Wrong type');
        }
}

const notifierSagas = [
    takeEvery(addNotification, addNotificationSaga)
];

export default notifierSagas;