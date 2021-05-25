import axios from "axios";

const data = [
  {
    typeOfAddress: "home",
    province: {
      province_id: 79,
      province_name: "HCM",
    },
    district: {
      district_id: 787,
      district_name: "Cần giờ",
    },
    address: "298 Nguyễn Văn A",
  },
  {
    typeOfAddress: "work",
    province: {
      province_id: 48,
      province_name: "Đà Nẵng",
    },
    district: {
      district_id: 497,
      district_name: "Hoà Vang",
    },
    address: "297 Nguyễn Văn A",
  },
  {
    typeOfAddress: "work",
    province: {
      province_id: 31,
      province_name: "Hải Phòng",
    },
    district: {
      district_id: 312,
      district_name: "An Dương",
    },
    address: "298 Nguyễn Văn A",
  },
  {
    typeOfAddress: "work",
    province: {
      province_id: 1,
      province_name: "Hà Nội",
    },
    district: {
      district_id: 271,
      district_name: "Ba Vì",
    },
    address: "299 Nguyễn Văn A",
  },
  {
    typeOfAddress: "work",
    province: {
      province_id: 48,
      province_name: "Đà Nẵng",
    },
    district: {
      district_id: 498,
      district_name: "Hoàng Sa",
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
