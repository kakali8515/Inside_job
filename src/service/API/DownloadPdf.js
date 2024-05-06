import axios from "axios";

const getExcel = async (id) => {
    return axios
      .get(`/resignation/pdf-generate/${id}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };


export const DownloadPdfService = {
    getExcel
};
