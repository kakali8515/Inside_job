import validator from "validator";

const signUpsteponeValidation = data => {
  let errors = {};
  function isValidDate(dateString) {
    const year = parseInt(dateString.substr(0, 4), 10);
    const month = parseInt(dateString.substr(4, 2), 10) - 1;
    const day = parseInt(dateString.substr(6, 2), 10);
    const testDate = new Date(year, month, day);

    return testDate.getFullYear() === year &&
      testDate.getMonth() === month &&
      testDate.getDate() === day;
  }
  function isFutureDate(idate) {
    var today = new Date().getTime()
    // idate = idate.split("/");
    const year = parseInt(idate.substr(0, 4), 10);
    const month = parseInt(idate.substr(4, 2), 10) - 1;
    const day = parseInt(idate.substr(6, 2), 10);
    const testDate = new Date(year, month, day);
    idate = new Date(year, month, day).getTime();
    return (today - idate) < 0 ? true : false;
  }
  const { name, age, phone, isVisible, isAppaleId } = data;
  if (validator.isEmpty(name, {ignore_whitespace: true})) {
    errors.name = "이름을 입력해 주세요.";
    errors.require = true
  }
  console.log(isVisible, isAppaleId, name, age, phone, "visibility");

  if (isAppaleId ? isVisible : true) {
    if (validator.isEmpty(age, {ignore_whitespace: true})) {
      errors.age = "생년월일을 입력해 주세요.";
      errors.require = true
    } else {
      if (age.length === 8) {
        if (!isValidDate(age)) {
          errors.age = "유효하지 않은 날짜입니다.";
        }
        else if (isFutureDate(age)) {
          errors.age = "유효하지 않은 날짜입니다.";
        }
      } else if (age.length < 8) {
        errors.age = "다음 포맷으로 입력해주세요: YYYYMMDD";
      }
    }
  }
  if (isAppaleId ? isVisible : true) {
    if (validator.isEmpty(phone, {ignore_whitespace: true})) {
      errors.require = true
      errors.phone = "필수 입력항목입니다.";
    }
    else if (!validator.isMobilePhone(phone)) {
      errors.phone = "핸드폰번호를 올바르게 입력해주세요";
    }
  }
  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default signUpsteponeValidation;
