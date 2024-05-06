import validator from "validator";

const signUpsteptwoValidation = (data) => {
  let errors = {};

  const { password, confirm_password, email, addr1, addr2, isVisible,pInfoperiod } = data;
  const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

  if (validator.isEmpty(password)) {
    errors.password = "필수 입력항목입니다.";
    errors.require = true
  } else if (!passRegex.test(password)) {
    errors.password =
      // "비밀번호는 영문/숫자/특수문자 포함 8자 이상 16자 미만으로 설정해주세요.";
      "비밀번호를 확인해 주세요.";
  }

  if (validator.isEmpty(confirm_password)) {
    errors.confirmPassword = "필수 입력항목입니다.";
    errors.require = true
  } else if (!validator.equals(password, confirm_password)) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  }
  if (validator.isEmpty(email)) {
    errors.email = "이메일 주소를 입력해주세요";
    errors.require = true
  }
  if (!validator.isEmail(email)) {
    errors.email = "유효한 이메일을 입력해주세요";
  }
  if (isVisible) {
    if (validator.isEmpty(addr1)) {
      errors.addr1 = "우편번호를 입력해 주세요.";
      errors.require = true
    }
    if (validator.isEmpty(addr2)) {
      errors.addr2 = "주소를 입력해 주세요.";
      errors.require = true
    }
  }
  if (validator.isEmpty(pInfoperiod)) {
    errors.pInfoperiod = "필수 입력란 입니다.";
    errors.require = true
  }
  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default signUpsteptwoValidation;
