// import validator from "validator";

const validate = (data) => {
    let errors = {};

    // const { salary } = data;

    if (data === '' || data === null) errors.salary = '필수 입력항목입니다.';

    

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validate ;
