import validator from "validator";

const consultationOnlaborValidate = (data) => {
  let errors = {};

  const {
    title,
    consultation
  } = data;

  if (validator.isEmpty(title)) {
    errors.title = "필수 입력항목입니다.";
  } else if (title.length > 30) {
    errors.title = "30자까지 입력 가능합니다.";
  }

  if (validator.isEmpty(consultation)) {
    errors.consultation = "필수 입력항목입니다.";
  }

  // if (validator.isEmpty(career_type)) {
  //   errors.password = "필수 입력항목입니다.";
  // }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default consultationOnlaborValidate;
