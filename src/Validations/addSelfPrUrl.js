import validator from "validator";

const validateUrl = (data) => {
  let errors = {};

  const { documentType, url } = data;
  if (documentType === undefined) {
    errors.documentType = "필수 입력항목입니다.";
  }

  if (validator.isEmpty(url)) {
    errors.url = "필수 입력항목입니다.";
  }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default validateUrl;