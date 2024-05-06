import validator from "validator";

const findIdValidate = (data) => {
  let errors = {};

  const { phone, otp } = data;

  if (validator.isEmpty(phone)) {
    errors.phone = "필수 입력항목입니다.";
  } else if (!validator.isMobilePhone(phone)) {
    errors.phone = "핸드폰번호를 올바르게 입력해주세요.";
  }
  if (validator.isEmpty(otp)) {
    errors.otp = "필수 입력항목입니다.";
  } else if (!validator.isInt(otp)) {
    errors.otp = "인증번호가 일치하지 않습니다"
  }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default findIdValidate;
