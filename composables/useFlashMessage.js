const flashMessages = reactive({
    success: '',
    info: '',
    warning: '',
    danger: '',
});

function setFlashMessage(type, message) {
    if (type in flashMessages) {
        flashMessages[type] = message;
    } else {
        console.warn(`Unknown flash message type: ${type}`);
    }
}

function clearFlashMessages() {
    Object.keys(flashMessages).forEach((key) => {
        flashMessages[key] = '';
    });
}

export function useFlashMessage() {
    clearFlashMessages();

    return {
        flashMessages: readonly(flashMessages),
        setFlashMessage,
        clearFlashMessages,
    };
}
