import axios from "axios";

const occupationPrimary = async () => {
  return axios
    .get("/master-data/occupation-1st-level")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      alert(err)
      return err;
    });
};

const occupationSecondary = async (id) => {
  return axios
    .get(`/master-data/occupation-2nd-level/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const occupationTertiary = async (id) => {
  return axios
    .get(`/master-data/occupation-3rd-level/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const occupationService = {
  occupationPrimary,
  occupationSecondary,
  occupationTertiary,
};
