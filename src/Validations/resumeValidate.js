import validator from "validator";

const resumeValidate = (data) => {
  let errors = {};

  const {
    resume_title,
    last_educational_background,
    career_type,
    work_places,
    occupations,
    working_days,
    working_periods,
    working_hours,
    employment_type,
    self_introduction,
  } = data;

  if (validator.isEmpty(resume_title)) {
    errors.resume_title = "필수 입력항목입니다.";
    errors.require = true
  }

  if (last_educational_background == null) {
    // if (validator.isEmpty(last_educational_background)) {
      errors.last_educational_background = "필수 입력항목입니다.";
      errors.require = true
    // }
  }

  if (validator.isEmpty(career_type)) {
    errors.career_type = "필수 입력항목입니다.";
    errors.require = true
  }

  if (validator.isEmpty(self_introduction, { ignore_whitespace: true })) {
    errors.self_introduction = "필수 입력항목입니다.";
    errors.require = true
  }
    if (work_places.length == 0) {
      errors.work_places = "필수 입력항목입니다.";
      errors.require = true
    }

  if (occupations.length == 0) {
    errors.occupations = "필수 입력항목입니다.";
    errors.require = true
  }

  if (working_days.length == 0) {
    errors.working_days = "필수 입력항목입니다.";
    errors.require = true
  }

  if (working_periods.length == 0) {
    errors.working_periods = "필수 입력항목입니다.";
    errors.require = true
  }

  if (working_hours.length == 0) {
    errors.working_hours = "필수 입력항목입니다.";
    errors.require = true
  }

  if (employment_type.length == 0) {
    errors.employment_type = "필수 입력항목입니다.";
    errors.require = true
  }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default resumeValidate;
