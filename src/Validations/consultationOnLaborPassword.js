import validator from "validator";

const consultationOnLaborPasswordValidate = data => {
  let errors = {};

  const {password} = data;
  const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

  if (validator.isEmpty(password)) {
    errors.password = "필수 입력항목입니다.";
  }
  // else if (!passRegex.test(password)) {
  //   errors.password = "비밀번호는 영문/숫자/특수문자 포함 8자 이상 16자 미만으로 설정해주세요.";
  // }
  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default consultationOnLaborPasswordValidate;
