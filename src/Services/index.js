import axios from "axios";

const data = [
  {
    typeOfAddress: "home",
    province: {
      province_id: 92,
      province_name: "Hà Nội",
    },
    district: {
      district_id: 917,
      district_name: "",
    },
    address: "298 Nguyễn Văn A",
  },
  {
    typeOfAddress: "work",
    province: {
      province_id: 92,
      province_name: "Hà Nội",
    },
    district: {
      district_id: 917,
      district_name: "",
    },
    address: "297 Nguyễn Văn A",
  },
  {
    typeOfAddress: "work",
    province: {
      province_id: 92,
      province_name: "Hà Nội",
    },
    district: {
      district_id: 917,
      district_name: "",
    },
    address: "297 Nguyễn Văn A",
  },
  {
    typeOfAddress: "work",
    province: {
      province_id: 92,
      province_name: "Hà Nội",
    },
    district: {
      district_id: 917,
      district_name: "",
    },
    address: "297 Nguyễn Văn A",
  },
];

const host = "https://vapi.vnappmob.com";

export const fetchData = () => {
  return data;
};

export const fetchProvince = async () => {
  const res = axios.get(`${host}/api/province`).then((res) => res.data);
  return res;
};

export const fetchDistrict = async (id) => {
  const res = axios
    .get(`${host}/api/province/district/${id}`)
    .then((res) => res.data);
  return res;
};
