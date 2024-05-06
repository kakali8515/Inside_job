import validator from "validator";

const validateChangePass = data => {
  let errors = {};

  const { password, confirm_password } = data;
  const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

  if (validator.isEmpty(password)) {
    errors.password = "필수 입력항목입니다.";
    // errors.require = true
  }
  // validator.isStrongPassword(password, {minUppercase:0})
  else if (!passRegex.test(password)) {
    errors.password = "비밀번호는 영문/숫자/특수문자 포함 8자 이상 16자 미만으로 설정해주세요.";
  }

  if (validator.isEmpty(confirm_password)) {
    errors.confirmPassword = "필수 입력항목입니다.";
    // errors.require = true
  } 
  else if (!validator.equals(password, confirm_password)) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다."
  }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default validateChangePass;
