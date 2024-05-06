import axios from "axios";

const detail = async () => {
    return await axios
        .get(`/terms/terms-and-privacy`, {
        })
        .then((res) => res)
        .catch((err) => err);
};

export const TermsAndPrivacy = {
    detail,
};