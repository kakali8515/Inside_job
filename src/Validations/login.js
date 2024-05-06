import validator from "validator";

const logInValidation = (data) => {
  let errors = {};

  const { email, password } = data;
  const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

  if (validator.isEmpty(email, { ignore_whitespace: true })) {
    errors.email = "필수 입력항목입니다.";
  } else if (!validator.isEmail(email)) {
    errors.email = "올바른 이메일을 입력해주세요. ";
  }

  if (validator.isEmpty(password, { ignore_whitespace: true })) {
    errors.password = "필수 입력항목입니다.";
  } 
  // else if (!passRegex.test(password)) {
  //   errors.password =
  //     "비밀번호는 영문/숫자/특수문자 포함 8자 이상 16자 미만으로 설정해주세요.";
  // }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default logInValidation;
