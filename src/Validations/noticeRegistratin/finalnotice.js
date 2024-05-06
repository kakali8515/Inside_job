import validator from "validator";

const finalValidation = data => {
  let errors = {};

  const { atitle, nPeriod, today, today2, direct_Input_center } = data;
  if (validator.isEmpty(atitle)) {
    errors.atitle = "공고 제목을 입력해 주세요.";
  }
  if (validator.isEmpty(nPeriod)) {
    errors.nPeriod = "공고 기간을 입력해 주세요.";
  }
  if ((today === '' || today === null) && direct_Input_center) {
    errors.today = "공고 기간을 입력해 주세요.";
  }
  if ((today2 === '' || today2 === null) && direct_Input_center) {
    errors.today2 = "공고 기간을 입력해 주세요.";
  }
  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default finalValidation;
