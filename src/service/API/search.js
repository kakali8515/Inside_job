import axios from "axios";

const searchList = async (page, limit, searchVal) => {
  return axios
    .get(`global-job/search/?page=${page}&limit=${limit}&search_term=${searchVal}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const search = {
    searchList,
}
