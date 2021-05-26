import axios from "axios";

const host = "https://vapi.vnappmob.com";

export const fetchData = () => {
  const result = localStorage.getItem('data')
  return JSON.parse(result);
};

const save = (data) => {
  localStorage.setItem('data', JSON.stringify(data))
}

export const fetchProvince = async () => {
  const res = axios.get(`${host}/api/province`).then((res) => res.data).catch(error => console.log('error: ', error));
  return res;
};

export const fetchDistrict = async (id) => {
  const res = axios
    .get(`${host}/api/province/district/${id}`)
    .then((res) => res.data).catch(error => console.log('error: ', error));
  return res;
};

export const fetchDataById = (id) => {
  const data = JSON.parse(localStorage.getItem('data')) 
  const userAddress = data.find(item => item.id.toString() === id)
  return userAddress
}

export const createData = (userAddress) => {
  const data = JSON.parse(localStorage.getItem('data')) 
  const userAddressInformation = {
    ...userAddress,
    id: data.length + 1
  }
  data.push(userAddressInformation)
  save(data)
}

export const editData = (dataEdit) => {
  const data = JSON.parse(localStorage.getItem('data')) 
  data.forEach(item => {
    if(item.id === dataEdit.id) {
      item.typeOfAddress = dataEdit.typeOfAddress
      item.province = dataEdit.province
      item.district = dataEdit.district
      item.address = dataEdit.address
    }
  })
  save(data)
}

export const deleteData = (id) => {
  const data = JSON.parse(localStorage.getItem('data')) 
  data.forEach((item,index) => {
    if(item.id === id) {
      data.splice(index, 1)
    }
  })
  save(data)
}