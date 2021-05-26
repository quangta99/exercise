import { thunk, action } from "easy-peasy";
import { fetchData } from "../Services";

const dataUser = {
  data: [],
  setData: action((state, payload) => {
    state.data = payload;
    state.loadingData = false;
  }),
  fetchDataUserAddress: thunk(async (actions) => {
    actions.setLoadingData(true);
    const res = await fetchData();
    actions.setData(res);
  }),
};
export default dataUser;
