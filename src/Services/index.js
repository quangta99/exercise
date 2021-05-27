import axios from "axios";

const host = "https://vapi.vnappmob.com";

export const fetchData = () => {
  const result = localStorage.getItem("data");
  return JSON.parse(result);
};

const save = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};

export const fetchProvince = async () => {
  const res = await axios
    .get(`${host}/api/province`)
    .then((res) => res.data)
    .catch((error) => console.log("error: ", error));

  const formatted = res.results.map((item) => {
    return { province_id: item.province_id, province_name: item.province_name };
  });

  return formatted;
};

export const fetchDistrict = async (id) => {
  const res = await axios
    .get(`${host}/api/province/district/${id}`)
    .then((res) => res.data)
    .catch((error) => console.log("error: ", error));
  const formatted = res.results.map((item) => {
    return { district_id: item.district_id, district_name: item.district_name };
  });
  return formatted;
};

export const fetchWard = async (id) => {
  const res = await axios
    .get(`${host}/api/province/ward/${id}`)
    .then((res) => res.data)
    .catch((error) => console.log("error: ", error));
  const formatted = res.results.map((item) => {
    return { ward_id: item.ward_id, ward_name: item.ward_name };
  });
  return formatted;
};

export const fetchDataById = (id) => {
  const data = JSON.parse(localStorage.getItem("data"));
  const userAddress = data.find((item) => item.id.toString() === id);
  return userAddress;
};

export const createData = (userAddress) => {
  const data = JSON.parse(localStorage.getItem("data")) || [];
  const userAddressInformation = {
    ...userAddress,
    id: data ? data.length + 1 : 1,
  };
  data.push(userAddressInformation);
  save(data);
};

export const editData = (dataEdit) => {
  const data = JSON.parse(localStorage.getItem("data"));
  data.forEach((item) => {
    if (item.id === dataEdit.id) {
      item.typeOfAddress = dataEdit.typeOfAddress;
      item.province = dataEdit.province;
      item.district = dataEdit.district;
      item.address = dataEdit.address;
    }
  });
  save(data);
};

export const deleteData = (id) => {
  const data = JSON.parse(localStorage.getItem("data"));
  data.forEach((item, index) => {
    if (item.id === id) {
      data.splice(index, 1);
    }
  });
  save(data);
};

export const paginate = (page, data) => {
  const pagi = data.slice(page, page + 5);
  return pagi;
};

export const filter = (search, data) => {
  data = data.filter((item) =>
    item.address.toLowerCase().includes(search.address.toLowerCase())
  );
  if (search.typeOfAddress) {
    data = data.filter(
      (item) => item.typeOfAddress.toString() === search.typeOfAddress
    );
  }
  if (search.province.province_id !== undefined) {
    data = data.filter(
      (item) => item.province.province_id === search.province.province_id
    );
  }
  if (search.district.district_id !== undefined) {
    data = data.filter(
      (item) => item.district.district_id === search.district.district_id
    );
  }
  if (search.ward.ward_id !== undefined) {
    data = data.filter((item) => item.ward.ward_id === search.ward.ward_id);
  }
  return data;
};
