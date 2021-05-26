import { useState, useEffect } from "react";

import { Paper, Button, TextField, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { fetchProvince, fetchDistrict } from "../../Services";

import SelectProvinceDistrict from "./SelectProvinceDistrict.Component";
import SelectTypeAddress from "../../Components/SelectTypeAddress.Component";
import { filter } from "./Filter";

const SearchBox = ({ dataHandle, setDataHandle }) => {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [search, setSearch] = useState({
    typeOfAddress: "",
    province: undefined,
    district: undefined,
    address: "",
  });

  useEffect(() => {
    (async () => {
      const res = await fetchProvince();
      setProvince(res.results);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (search.province !== undefined) {
        const res = await fetchDistrict(search.province);
        setDistrict(res.results);
      }
    })();
  }, [search.province]);

  const handleChangeInput = (e) => {
    setSearch((pre) => ({ ...pre, address: e.target.value }));
  };

  const handleClear = () => {
    setSearch({
      typeOfAddress: "",
      province: undefined,
      district: undefined,
      address: "",
    });
    setDataHandle((pre) => ({ ...pre, fetchAgain: true }));
  };
  const handleSubmit = () => {
    console.log(search)
    const result = filter(search, dataHandle.dataBackup);
    setDataHandle((pre) => ({ ...pre, data: result }));
  };

  return (
    <Paper className="p-4 mt-4">
      <div className="row justiy-content-between">
        <div className="row col-md-10">
          <div className="col-md-3 p-2">
            <TextField
              label="Address"
              value={search.address}
              onChange={handleChangeInput}
              variant="filled"
              className="w-100"
            />
          </div>
          <div className="col-md-3 p-2">
            <SelectTypeAddress data={search} setData={setSearch} />
          </div>
          <div className="col-md-3 p-2">
            <SelectProvinceDistrict
              lable="Select City"
              values={province}
              type="province"
              setData={setSearch}
              setDistrict={setDistrict}
              search={search}
            />
          </div>
          <div className="col-md-3 p-2">
            <SelectProvinceDistrict
              lable="Select District"
              values={district}
              type="district"
              setData={setSearch}
              setDistrict={setDistrict}
              search={search}
            />
          </div>
        </div>
        <div className="col-md-2 d-flex align-items-center justify-content-end p-2">
          <IconButton
            color="inherit"
            onClick={handleClear}
            className="h-100"
            variant="contained"
          >
            <CloseIcon />
          </IconButton>
          <Button
            color="primary"
            onClick={handleSubmit}
            className="h-100"
            variant="contained"
          >
            Search
          </Button>
        </div>
      </div>
    </Paper>
  );
};
export default SearchBox;
