import axios from "axios";

const purchaseAdList = async () => {
   return await axios
  .get(`/ad/ad-paid-product-purchase-list`)
};

const adStorageList = async () => {
  return await axios
 .get(`/ad/ad-paid-list`)
};

const savePaidProductPurchase = async (data) => {
  return await axios
 .post(`/ad/ad-paid-product-purchase-save`, data)
};


export const PaidProductPurchaseService = {
    purchaseAdList,
    adStorageList,
    savePaidProductPurchase
   
};
