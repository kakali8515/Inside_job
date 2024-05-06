import axios from "axios";

const careerList = async () => {
  return axios
    .get("/career/career-list")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const addCareer = async (data) => {
  return axios
    .post("/career/add-career", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const careerDetails = async (id) => {
  return axios
    .put(`/career/career-detail-prefield/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const editCareer = async (id,data) => {
  return axios
    .put(`/career/edit-career/${id}`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const deleteCareer = async (id) => {
  return axios
    .delete(`/career/career-delete/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const careerServices = {
  careerList,
  addCareer,
  deleteCareer,
  editCareer,
  careerDetails,
};
