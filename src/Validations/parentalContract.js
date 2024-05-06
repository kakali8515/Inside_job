import validator from "validator";

const ParentalAuthorityValidation = (data) => {
  let errors = {};

  const {
    email,
    type,
    business_owner_name,
    name_of_parent,
    address_of_parental_authority,
    contact_information_of_parental,
    age_of_worker,
    address_of_young_worker,
    contact_information_of_youngworker,
    name_of_worker,
    image,
    termsOfservice,
    relationship_with_youngworkers,
    pageState,
  } = data;

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

  if (checkEmpty(name_of_parent)) {
    errors.require = true
    errors.parentName = "필수 입력항목입니다.";
  }

  if (checkEmpty(address_of_parental_authority)) {
    errors.require = true
    errors.parentAddress = "필수 입력항목입니다.";
  }

  if (checkEmpty(contact_information_of_parental)) {
    errors.require = true
    errors.contactInfoParent = "필수 입력항목입니다.";
  } else if (
    !validator.isInt(contact_information_of_parental) ||
    contact_information_of_parental.length !== 11
  ) {
    errors.contactInfoParent = "연락처를 올바르게 입력해 주세요";
  }

  if (checkEmpty(age_of_worker)) {
    errors.require = true
    errors.ageOfWorker = "필수 입력항목입니다.";
  } else if (!validator.isInt(age_of_worker, { max: 100 })) {
    errors.ageOfWorker = "올바른 나이를 입력해주세요.";
  }

  if (checkEmpty(address_of_young_worker)) {
    errors.require = true
    errors.youngWorkerAddress = "필수 입력항목입니다.";
  }

  if (checkEmpty(contact_information_of_youngworker)) {
    errors.require = true
    errors.youngWorkerContact = "필수 입력항목입니다.";
  } else if (
    !validator.isInt(contact_information_of_youngworker) ||
    contact_information_of_youngworker.length !== 11
  ) {
    errors.youngWorkerContact = "올바른 연락처를 입력해주세요.";
  }

  if (checkEmpty(name_of_worker)) {
    errors.require = true
    errors.name_of_worker = "필수 입력항목입니다.";
  }

  if (checkEmpty(relationship_with_youngworkers)) {
    errors.require = true
    errors.relationship_with_youngworkers = "필수 입력항목입니다.";
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

export default ParentalAuthorityValidation;
