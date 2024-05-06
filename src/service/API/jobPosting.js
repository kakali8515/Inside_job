import axios from "axios";
export default class jobPostingService {
  async getRecuiterDetails() {
    return await axios
      .get(`/user/details`)
      .then((res) => res);
  }
  async getJobDetails(id) {
    return await axios
      .get(`job/details/${id}`)
      .then((res) => res);
  }
  async saveJob(data) {
    return await axios
      .post(`/job/add`, data)
      .then((res) => res);
    
  }
  async editJob(id,data) {
    return await axios
      .put(`/job/edit/${id}`, data)
      .then((res) => res);
    
  }
  async saveBgImage(data) {
    return await axios
      .post(`job/upload-background-image`, data)
      .then((res) => res);
    
  }
  async saveThumnailImage(data) {
    return await axios
      .post(`job/upload-thumbnail`, data)
      .then((res) => res);
  }
}
