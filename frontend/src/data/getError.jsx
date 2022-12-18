import errors from './response_errors.json';

const getError = (list, key) => {
    if (!list.includes(key)) return;
    return errors[key] ?? 'Error no registrado';
}

export default getError;