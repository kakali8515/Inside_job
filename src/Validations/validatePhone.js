import validator from "validator";

const phoneValidation = data => {
  let errors = {};

  const { phone } = data;

  if (validator.isEmpty(phone)) {
    errors.phone = "필수 입력항목입니다.";
  }
  else if (!validator.isMobilePhone(phone)) {
    errors.phone = "핸드폰번호를 올바르게 입력해주세요.";
  } 
  else if (phone.length != 11) {
    errors.phone = "핸드폰번호를 올바르게 입력해주세요.";
  }


  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default phoneValidation;
