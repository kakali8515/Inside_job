import validator from "validator";

const workinginfoValidation = data => {
  let errors = {};

  const { wType, wPeriod,wdays,wrkHrfrm,wrkHrto,salary,pWorkHr} = data;
  if (validator.isEmpty(wType)) {
    errors.wType = "근무 기간을 입력해 주세요.";
  }
  if (validator.isEmpty(wPeriod)) {
    errors.wPeriod = "근무 기간을 입력해 주세요.";
  }
  if (validator.isEmpty(wdays)) {
    errors.wdays = "요일을 선택해 주세요.";
  }
  if (validator.isEmpty(wrkHrfrm) || validator.isEmpty(wrkHrto)) {
    errors.wrkHrfrm = "필수 입력란 입니다.";
  }
  // if (validator.isEmpty(wrkHrto)) {
  //   errors.wrkHrto = "필수 입력란 입니다.";
  // }
  if (validator.isEmpty(salary)) {
    errors.salary = "필수 입력란 입니다.";
  }
  if (validator.isEmpty(pWorkHr)) {
    errors.pWorkHr = "필수 입력란 입니다.";
  }
  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default workinginfoValidation;
