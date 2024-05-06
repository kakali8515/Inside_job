import axios from "axios";

const positionOfferList = async (page, limit) => {
  return await axios
  .get(`/talent/position-offered-list?page=${page}&limit=${limit}`)
  .then((res) => res)
  .catch((err) => err);
};

const positionOfferSettings = async (data) => {
  return await axios
    .post(`/talent/position-offer-settings`, data)
    // .then((res) => res)
    // .catch((err) => err);
};

const positionOfferDetails = async () => {
  return await axios
  .get(`/user/details`)
  .then((res) => res)
  .catch((err) => err);
};

export const PositionOfferService = {
    positionOfferList,
    positionOfferSettings,
    positionOfferDetails
};
