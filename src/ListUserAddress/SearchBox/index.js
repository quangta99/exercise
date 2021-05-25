import { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import _cloneDeep from "lodash/cloneDeep";

import { Paper, Button, TextField } from "@material-ui/core";
import { fetchProvince, fetchDistrict } from "../../Services";

import SelectProvinceDistrict from "./SelectProvinceDistrict.Component";
import SelectTypeAddress from "./SelectTypeAddress.Component";
import { filter } from "./Filter";

const SearchBox = () => {
  const setData = useStoreActions((actions) => actions.dataUser.setData);
  const data = useStoreState((state) => state.dataUser.data);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [search, setSearch] = useState({
    typeOfAddress: "",
    province: "",
    district: "",
    address: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchProvince();
        setProvince(res.results);
      } catch {
        console.log("error");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (search.province !== 0) {
        try {
          const res = await fetchDistrict(search.province);
          setDistrict(res.results);
        } catch {
          console.log("error");
        }
      }
    })();
  }, [search.province]);

  const handleChangeInput = (e) => {
    setSearch((pre) => ({ ...pre, address: e.target.value }));
  };

  const handleSubmit = () => {
    const temp = _cloneDeep(data);
    const result = filter(search, temp);
    setData(result);
  };

  return (
    <Paper className="p-4 mt-4">
      <div className="row justiy-content-between">
        <div className="row col-md-9">
          <div className="col-md-3 p-2">
            <TextField
              placeholder="Address"
              value={search.address}
              onChange={handleChangeInput}
              variant="filled"
              className="w-100"
            />
          </div>
          <div className="col-md-3 p-2">
            <SelectTypeAddress search={search} setSearch={setSearch} />
          </div>
          <div className="col-md-3 p-2">
            <SelectProvinceDistrict
              lable="Select City"
              values={province}
              type="province"
              setSearch={setSearch}
              setDistrict={setDistrict}
            />
          </div>
          <div className="col-md-3 p-2">
            <SelectProvinceDistrict
              lable="Select District"
              values={district}
              type="district"
              setSearch={setSearch}
              setDistrict={setDistrict}
            />
          </div>
        </div>
        <div className="col-md-3 d-flex align-items-center">
          <Button onClick={handleSubmit} variant="outlined">
            Search
          </Button>
        </div>
      </div>
    </Paper>
  );
};
export default SearchBox;
