import strings from '../i18n/strings';

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{1,}$/;

const nameRegex = /^([\w]{1,})+([\w\s]{0,})+$/i;

const phoneNumRegex = /^\+?[1-9][0-9]{7,14}$/;

// Name validation
const validateName = name => {
  if (!name) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return nameRegex.test(name)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validName,
        };
  }
};

//Email validation
const validateEmail = email => {
  if (!email) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return emailRegex.test(email)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validEmail,
        };
  }
};

//Password validation
const validatePassword = (pass, isConfrimPass, password) => {
  if (!pass) {
    return {
      status: false,
      msg: strings.plsEnterPassword,
    };
  } else if (pass.length < 8) {
    return {
      status: false,
      msg: strings.validatePassword,
    };
  } else {
    if (passwordRegex.test(pass)) {
      if (isConfrimPass && password != pass) {
        return {
          status: false,
          msg: strings.confirmPassValidString,
        };
      }
      return {status: true, msg: ''};
    } else {
      return {
        status: false,
        msg: strings.validatePassword,
      };
    }
  }
};

const validatePhoneNum = phoneNum => {
  if (!phoneNum) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return phoneNumRegex.test(phoneNum)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validateNumber,
        };
  }
};

export {validateEmail, validatePassword, validateName, validatePhoneNum};
