import { thunk, action } from "easy-peasy";
import { fetchData, fetchProvince, fetchDistrict } from "../Services";
import _get from "lodash/get";

const dataUser = {
  data: [],
  province: [],
  district: [],
  loadingData: false,
  loadingProvice: false,
  setLoadingProvice: action((state, payload) => {
    state.loadingProvice = payload;
  }),
  setLoadingData: action((state, payload) => {
    state.data = payload;
  }),
  setData: action((state, payload) => {
    state.data = payload;
    state.loadingData = false;
  }),
  setProvince: action((state, payload) => {
    state.province = payload;
    state.loadingProvice = false;
  }),
  setDistrict: action((state, payload) => {
    state.district = payload;
    state.loadingProvice = false;
  }),
  fetchDataUserAddress: thunk(async (actions) => {
    actions.setLoadingData(true);
    const res = await fetchData();
    actions.setData(res);
  }),
  fetchProvince: thunk(async (actions) => {
    actions.setLoadingProvice(true);
    const res = await fetchProvince();
    actions.setProvince(res.results);
  }),
  fetchDistrict: thunk(async (actions, id) => {
    actions.setLoadingProvice(true);
    try {
      const res = await fetchDistrict(id);
      actions.setDistrict(res.results);
    } catch {
      console.log("error :>> ");
    }
  }),
};
export default dataUser;
