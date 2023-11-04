export function showToast(state, { message, type }) {
    state.toast.show = true;
    state.toast.message = message;
    state.toast.type = type;
}

export function hideToast(state) {
    state.toast.show = false;
    state.toast.message = '';
    state.toast.type = '';
}