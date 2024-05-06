import validator from "validator";

const validateCompany = (data) => {
  let errors = {};

  const { company_name, industry, no_of_employees,company_contact_person,company_address,company_postal_code } = data;
  if (validator.isEmpty(company_name)) {
    errors.company_name = "필수 입력항목입니다.";
  }

  // if (validator.isEmpty(industry)) {
  //   errors.industry = "필수 입력항목입니다.";
  // }

  // if (validator.isEmpty(no_of_employees)) {
  //   errors.no_of_employees = "필수 입력항목입니다.";
  // }

  // if (validator.isEmpty(company_introduction)) {
  //   errors.company_introduction = "필수 입력항목입니다.";
  // }

  if (validator.isEmpty(company_address)) {
    errors.company_address = "필수 입력항목입니다.";
  }

  if (validator.isEmpty(company_postal_code)) {
    errors.company_postal_code = "필수 입력항목입니다.";
  }

  if (validator.isEmpty(company_contact_person)) {
    errors.company_contact_person = "필수 입력항목입니다.";
  }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default validateCompany;