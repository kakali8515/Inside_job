import axios from "axios";

const getPushNotificationdetail = async (paginate) => {
  return await axios
    .get(`/user/view-pushnotification`, {
      params: paginate,
    })
    .then((res) => res)
    .catch((err) => err);
};

const updatePushnotificationDeatils = async (paginate) => {
  return await axios
    .post(`/user/toogle-pushnotification`,
       paginate)
    .then((res) => res)
    .catch((err) => err);
};



export const JobSeekerPushnotification = {
    getPushNotificationdetail,
    updatePushnotificationDeatils
    
  
};