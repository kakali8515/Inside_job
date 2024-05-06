import axios from "axios";

const addDevice = async (data) => {
    return await axios.post(`/device`, data).then((res) => res).catch((err) => err);
};

const removeDevice = async (uuid) => {
  return await axios.delete(`/device/${uuid}`).then((res) => res).catch((err) => err);
};


export const DeviceInfo = {
  addDevice,
  removeDevice,
};