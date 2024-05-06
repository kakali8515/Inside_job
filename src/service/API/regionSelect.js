import axios from "axios";

const regionPrimary = async () => {
  return axios
    .get("master-data/region-1st-level")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const regionSecondary = async (id) => {
  return axios
    .get(`/master-data/region-2nd-level/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const regionTertiary = async (id) => {
  return axios
    .get(`/master-data/region-3rd-level/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const regionService = {
  regionPrimary,
  regionSecondary,
  regionTertiary,
};
