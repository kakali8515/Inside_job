import validator from "validator";

const talentinfoValidation = data => {
  let errors = {};

  const { jobSelect, jobRequirement,responsibility,qualification, max_exper, min_exper, carrer, regardlessAny } = data;
  if (validator.isEmpty(jobSelect)) {
    errors.jobSelect = "직무를 선택해 주세요";
    // errors.jobSelect = "버튼을 클릭하여 작업을 선택하십시오.";
  }
  if (validator.isEmpty(jobRequirement)) {
    errors.jobRequirement = "필수 입력란 입니다.";
  }
  if (validator.isEmpty(responsibility)) {
    errors.responsibility = "필수 입력란 입니다.";
  }
  if (carrer === 'experience' && regardlessAny !== true) {
    if (max_exper === null || min_exper === null) {
      errors.max_exper_min_exper = "필수 입력란 입니다.";
    }
  }
  if (validator.isEmpty(qualification)) {
    // errors.qualification = "필수 입력란 입니다 (자격).";
    errors.qualification = "필수 입력란 입니다.";
  }
  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default talentinfoValidation;
