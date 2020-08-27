import { defineMessages } from 'react-intl';

const errorMessages = defineMessages({
  minLength: {
    id: 'error.min_length',
    defaultMessage: 'Значение должно быть больше или равно {min} {min, plural, one {символа} other {символов}}'
  },
  maxLength: {
    id: 'error.max_length',
    defaultMessage: 'Значение должно быть меньше или равно {max, number} {max, plural, one {символа} other {символов}}'
  },
  required: {
    id: 'error.required',
    defaultMessage: 'Обязательное поле'
  },
  userNotFound: {
    id: 'error.userNotFound',
    defaultMessage: 'Пользователь не найден'
  },
  incorrectPassword: {
    id: 'error.incorrectPassword',
    defaultMessage: 'Неверный пароль'
  },
  internalError: {
    id: 'error.internalError',
    defaultMessage: 'Произошла непредвиденная ошибка',
  }
});

export default errorMessages;
