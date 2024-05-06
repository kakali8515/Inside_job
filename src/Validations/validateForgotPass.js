import validator from "validator";

const forgotPassValidation = data => {
  let errors = {};

  const { phone_number, email, otp } = data;

  if(validator.isEmpty(email)) {
    errors.email = "필수 입력항목입니다.";
  } else if (!validator.isEmail(email)) {
    errors.email = "올바른 값을 입력해주세요. ";
  }
  if (validator.isEmpty(phone_number)) {
    errors.phone = "필수 입력항목입니다.";
  }
  else if (!validator.isMobilePhone(phone_number)) {
    errors.phone = "핸드폰번호를 올바르게 입력해주세요";
  }
  if(otp != "null") {
    if(validator.isEmpty(otp)) {
      errors.otp = "필수 입력항목입니다.";
    } else if(!validator.isInt(otp)) {
      errors.otp = "invalid otp"
    }
  } 


  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default forgotPassValidation;
