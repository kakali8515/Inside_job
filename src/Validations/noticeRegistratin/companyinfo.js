import validator from "validator";

const companyinfoValidation = data => {
  let errors = {};

  const { mName, mContact,mEmail,cPIN,cAddr } = data;
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (validator.isEmpty(mName)) {
    errors.mName = "이 필드(관리자 이름)를 작성하십시오.";
  }
  if (validator.isEmpty(mContact)) {
    errors.mContact = "이 필드(관리자 연락처)를 작성하십시오.";
  }
  if (validator.isEmpty(mEmail)) {
    errors.mEmail = "이 필드(관리자 이메일)를 작성하십시오.";
  }
  else if (!emailRegex.test(mEmail)) { 
    errors.mEmail = "올바른 이메일을 입력해주세요."; 
  }
  if (validator.isEmpty(cPIN)) {
    errors.cPIN = "이 필드(우편번호)를 작성하십시오.";
    // errors.cPIN = "필수 입력란 입니다.";우편번호 
  }
  if (validator.isEmpty(cAddr)) {
    errors.cAddr = "이 필드(주소)를 작성하십시오.";
    // errors.cAddr = "필수 입력란 입니다.";
  }
 
  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default companyinfoValidation;
