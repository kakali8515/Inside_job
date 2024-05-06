import validator from "validator";

const validate = (data) => {
  let errors = {};

  const { documentType, image } = data;
  if (documentType === undefined) {
    errors.documentType = "필수 입력항목입니다.";
  }

  if (image == 0) {
    errors.image = "필수 입력항목입니다.";
  }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default validate;