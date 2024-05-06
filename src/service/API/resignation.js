import axios from "axios";
//Inside Job error check
// export const errCheck = (err) => {
//   if (err.response.data.statusCode == "401") {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   }
// };
// let userType = localStorage.getItem("login_type");
export default class resignService {
  async processlist(page, limit) {
    return await axios
      .get(
        `/resignation/${
          localStorage.getItem("login_type") === "job_seeker"
            ? "seeker-progesslist"
            : "recruiter-progesslist"
        }?page=${page}&limit=${limit}`
      )
      .then((res) => res);
  }
  async completelist(page, limit) {
    return await axios
      .get(
        `/resignation/${
          localStorage.getItem("login_type") === "job_seeker"
            ? "seeker-completeslist"
            : "recruiter-completedlist"
        }?page=${page}&limit=${limit}`
      )
      .then((res) => res);
  }
  async employerRatingDetails(id) {
    return await axios
      .get(`/resignation/employer-rating-details/${id}`)
      .then((res) => res);
  }
  // resignation/save-rating-employer
  async setEmployerRating(data) {
    return await axios
      .post(
        `/resignation/${
          localStorage.getItem("login_type") === "job_seeker"
            ? "save-rating-seeker"
            : "save-rating-employer"
        }`,
        data
      )
      .then((res) => res);
    // .catch((err) => {
    //   errCheck(err);
    // });
  }
  async writeResignation(data) {
    return await axios.post(`/resignation/add`, data).then((res) => res);
    // .catch((err) => {
    //   errCheck(err);
    // });
  }
  async sendResignationEmail(id, data) {
    return await axios
      .post(`resignation/email-send/${id}`, data)
      .then((res) => res);
  }
  async approveResignation(data) {
    return await axios
      .post(`resignation/approve-resignation/`, data)
      .then((res) => res);
  }
  async resignationDetails(ids) {
    return await axios
      .get(
        `/resignation/${
          localStorage.getItem("login_type") == "job_seeker"
            ? "seeker-resignation-details"
            : "recruiter-resignation-details"
        }/${ids}`
      )
      .then((res) => res);
    // .catch((err) => {
    //   errCheck(err);
    // });
  }
  async resignationDetailsRecruiter(ids) {
    return await axios
      .get(`/resignation/recruiter-resignation-details/${ids}`)
      .then((res) => res);
  }
  // async getExcel(id) {
  //   return await axios({
  //     url: `/resignation/pdf-generate/${id}`,
  //     method: "get",
  //     responseType: "blob", // important
  //   })
  //     .then((res) => res)
  //     .catch((err) => {
  //       errCheck(err);
  //     });
  // }
  async getExcel(id) {
    return await axios
      .get(`/resignation/pdf-generate/${id}`)
      .then((res) => res);
  }
}
