import axios from "axios";

const pendingList = async (pageNo, limit) => {
  return axios
    .get(`contract/pending-list-seeker?page=${pageNo}&limit=${limit}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const recruiterPendingList = async (pageNo, limit) => {
  return axios
    .get(`contract/pending-list-recruiter?page=${pageNo}&limit=${limit}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const approvedList = async (pageNo, limit) => {
  return axios
    .get(`contract/approved-list-seeker?page=${pageNo}&limit=${limit}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const recruiterApprovedList = async (pageNo, limit) => {
  return axios
    .get(`contract/approved-list-recruiter?page=${pageNo}&limit=${limit}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const pdfContractDetails = async (id) => {
  return axios
    .get(`contract/pdf-generate/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const contractApproved = async (data) => {
  return axios
    .post("contract/accept", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const contractRejected = async (data) => {
  return axios
    .post("contract/reject", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const contractDetails = async (id) => {
  return axios
    .get(`contract/contract-details/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const contractSendEmail = async (id, data) => {
  return axios
    .post(`contract/email-send/${id}`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const contractAdd = async (data) => {
  return axios
    .post("contract/add", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const formDetails = async (id) => {
  return axios
    .get(`contract/view/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

const contractEdit = async (id,data) => {
  return axios
    .put(`contract/edit/${id}`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export const employmentService = {
  pendingList,
  recruiterPendingList,
  approvedList,
  recruiterApprovedList,
  pdfContractDetails,
  contractRejected,
  contractApproved,
  contractDetails,
  contractSendEmail,
  contractAdd,
  formDetails,
  contractEdit,
};
