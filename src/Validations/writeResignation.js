import validator from "validator";

const writeRegValidation = (data) => {
  let errors = {};

  const { position, reason,date,sign } = data;

  if (validator.isEmpty(position)) {
    errors.position = "이 필드를 채우십시오.";
    errors.require = true
  }
  if (validator.isEmpty(reason)) {
    errors.reason = "이 필드를 채우십시오.";
    errors.require = true
  }
  if (validator.isEmpty(date)) {
    errors.date = "이 날짜를 채우십시오.";
    errors.require = true
  }
  if (validator.isEmpty(sign)) {
    errors.sign = "서명을 업로드하려면 버튼을 클릭하십시오.";
    errors.require = true
  }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default writeRegValidation;
