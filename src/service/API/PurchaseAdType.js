import axios from "axios";

const purchaseAdList = async () => {
   return await axios
  .get(`/ad/ad-list`)
};

const adStorageList = async () => {
  return await axios
 .get(`/ad/ad-paid-list`)
};

const saveJob = async (data) => {
  return await axios
 .post(`/job/add`, data)
};

export const PurchaseAdTypeService = {
    purchaseAdList,
    adStorageList,
    saveJob
   
};
