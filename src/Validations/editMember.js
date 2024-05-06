import validator from "validator";

const validate = (data) => {
  let errors = {};

  const { name, age, gender, phone_number, address, postal_code } = data;
  // if (validator.isEmpty(name)) {
  //   errors.name = "필수 입력항목입니다.";
  // }

  // if (age != null) {
  //   if (validator.isEmpty(age)) {
  //     errors.age = "필수 입력항목입니다.";
  //   }
  // }

  // if (validator.isEmpty(gender)) {
  //   errors.gender = "필수 입력항목입니다.";
  // }

  if (validator.isEmpty(phone_number)) {
    errors.phone_number = "필수 입력항목입니다.";
    errors.require = true
  }

  if (phone_number.length !== 0 && phone_number.length != 11) {
    errors.phone_number = "핸드폰번호 11자리를 입력해 주세요.";
  }

  if (validator.isEmpty(address)) {
    errors.address = "필수 입력항목입니다.";
    errors.require = true
  }

  if (validator.isEmpty(postal_code)) {
    errors.postal_code = "필수 입력항목입니다.";
    errors.require = true
  }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default validate;
