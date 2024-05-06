import axios from "axios";

const AiList = async (userData) => {
  return axios
    .post(`ai-recommendation/ai-recommendation-list`,userData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const add = async (userData) => {
  return axios
    .post(`/ai-recommendation/add`, userData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const details = async () => {
  return axios
    .get(`/ai-recommendation/ai-recommendation-details`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const editDetails = async (userData) => {
  return axios
    .put(`/ai-recommendation/edit-recommendation`,userData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const AiServices = {
  AiList,
  details,
  add,
  editDetails
}
