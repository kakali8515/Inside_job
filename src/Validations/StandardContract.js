import validator from "validator";
import moment from "moment";

const StandardContractValidation = (data) => {
  let errors = {};

  const {
    email,
    type,
    business_owner_name,
    term_start_date,
    term_end_date,
    place_of_work,
    business_information,
    working_hours_from,
    working_hours_end,
    break_time_from,
    break_time_end,
    working_days,
    days_off,
    pay_type,
    salary,
    wage_payment_type,
    wage_payment_date_monthly,
    payment_method,
    social_ins_cover,
    name_of_worker,
    image,
    termsOfservice,
    pageState,
    working_day_validate_no,
  } = data;
  const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  const checkEmpty = (itemTovalidate) => {
    if(itemTovalidate == null) {
      return true;
    } else if (validator.isEmpty(itemTovalidate, { ignore_whitespace: true })) {
      return true;
    }
  } 

  if (checkEmpty(email)) {
    errors.require = true 
    errors.email = "필수 입력항목입니다.";
  } else if (!validator.isEmail(email)) {
    errors.email = "올바르지 않은 이메일 형식입니다.";
  }

  if (checkEmpty(business_owner_name)) {
    errors.require = true 
    errors.businessOwner = "필수 입력항목입니다.";
  }

  if (
    checkEmpty(term_start_date) || term_start_date === '--'
    // ||
    // checkEmpty(term_end_date)
  ) {
    errors.require = true 
    errors.term_date = "필수 입력항목입니다.";
  } else if (
    !moment(term_start_date, 'YYYY-M-D', true).isValid()
    )
    // ||
    // validator.isDate(term_end_date, new Date(), {
    //   format: "YYYY-M-D",
    //   delimiters: ["-"],
    // })
   {
    errors.term_date = "올바른 일자를입력해주세요.";
  }
  // if(!checkEmpty(term_end_date) && !moment(term_end_date, 'YYYY-M-D', true).isValid()){
  if(term_end_date !== '' && !moment(term_end_date, 'YYYY-M-D',true).isValid()){
    errors.term_date = "올바른 일자를입력해주세요.";
  }

  if (checkEmpty(place_of_work)) {
    errors.require = true
    errors.place_of_work = "필수 입력항목입니다.";
  }

  if (checkEmpty(business_information)) {
    errors.require = true
    errors.business_information = "필수 입력항목입니다.";
  }

  if (
    checkEmpty(working_hours_from) ||
    checkEmpty(working_hours_end)
  ) {
    errors.require = true
    errors.working_hours_from = "필수 입력항목입니다.";
  } else if (
    !timeRegex.test(working_hours_from) ||
    !timeRegex.test(working_hours_end)
  ) {
    errors.working_hours_from = "올바른 시간을 입력해주세요.";
  }

  if (
    !checkEmpty(break_time_from) ||
    !checkEmpty(break_time_end)
  ) {
    if (!timeRegex.test(break_time_from) || !timeRegex.test(break_time_end)) {
      errors.break_time_from = "올바른 시간을 입력해주세요.";
    }
  }
  if (checkEmpty(working_days)) {
    errors.require = true
    errors.working_days = "필수 입력항목입니다.";
  }

  // if (working_days != "everyday") {
  //   if (days_off.length <= 0) {
  //     errors.days_off = "필수 입력항목입니다.";
  //   } 
  //   else if ( String(days_off.length) != working_day_validate_no) {
  //     errors.days_off = "요일을 정확하게 선택해 주세요.";
  //   }
  // }

  if (checkEmpty(pay_type) || checkEmpty(salary)) {
    errors.require = true
    errors.pay_type = "필수 입력항목입니다.";
  } else if (!validator.isInt(salary, { min: 0})) {
    errors.pay_type = "급여를 올바르게 입력해주세요.";
  }

  if (checkEmpty(wage_payment_type)) {
    errors.require = true
    errors.wage_payment_type = "필수 입력항목입니다.";
  }

  if (
    wage_payment_type == "monthly" &&
    checkEmpty(wage_payment_date_monthly)
  ) {
    errors.require = true
    errors.wage_payment_date = "필수 입력항목입니다.";
  } else if (
    wage_payment_type == "monthly" &&
    !validator.isInt(wage_payment_date_monthly, { min: 1, max: 31 })
  ) {
    errors.wage_payment_date = "올바른 일자를 입력해주세요.";
  }

  if (checkEmpty(payment_method)) {
    errors.require = true
    errors.payment_method = "필수 입력항목입니다.";
  }

  if (social_ins_cover.length <= 0) {
    errors.require = true
    errors.social_ins_cover = "필수 입력항목입니다.";
  }

  if (checkEmpty(name_of_worker)) {
    errors.require = true
    errors.name_of_worker = "필수 입력항목입니다.";
  }

  if (pageState == "add") {
    if (image == {} || image == null) {
      errors.require = true
      errors.signature = "필수 입력항목입니다.";
    }
  }

  if (!termsOfservice) {
    errors.require = true
    errors.terms = "필수 입력항목입니다.";
  }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default StandardContractValidation;
