import {
    useQuasar
} from 'quasar'

const q = useQuasar()

const defaultOptions = {
    position: 'top-right'
}

const defaultOptionsError = {
    ...defaultOptions,
    color: '#D32F2F'
}

export function showErrorNotification(message) {
    q.notify({
        message: message,
        ...defaultOptionsError
    })
}