import axios from "axios";
//Inside Job error check
// export const errCheck = (err) => {
//   if (err.response.data.statusCode == "401") {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   }
// };
export default class mapService {
  async joblist(data) {
    return await axios
      .post(`/job/around-list`,data)
      .then((res) => res)
      // .catch((err) => {
      //   errCheck(err);
      // });
  }
  //Search by region
  async joblistRegion(data) {
    return await axios
      .post(`/home/region-search`,data)
      .then((res) => res)
  }
  async addscarp(data) {
    return await axios
      .post(`/scrap/add/`,data)
      .then((res) => res)
  }
  async deletescarp(data) {
    return await axios
      .delete(`/scrap/delete/`,{data})
      .then((res) => res)
      
  }
}
