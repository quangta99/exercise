import { useState, useEffect } from "react";

import { Paper, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";

import "./SearchBox.css";

import { fetchProvince, fetchDistrict, fetchWard } from "../../Services";
import SelectTypeAddress from "./SelectTypeAddress.Component";
import { filter } from "../../Services";
import CustomAutoComplete from "./CustomAutoComplete/CustomAutoComplete.Component";

const SearchBox = ({ dataHandle, setDataHandle }) => {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [search, setSearch] = useState({
    isSearch: false,
    typeOfAddress: "",
    province: {
      province_id: undefined,
      province_name: "",
    },
    district: {
      district_id: undefined,
      district_name: "",
    },
    ward: {
      ward_id: undefined,
      ward_name: "",
    },
    address: "",
  });

  useEffect(() => {
    (async () => {
      const res = await fetchProvince();
      setProvince(res);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (search.province.province_id !== undefined) {
        const res = await fetchDistrict(search.province.province_id);
        setDistrict(res);
      }
    })();
  }, [search.province.province_id]);

  useEffect(() => {
    (async () => {
      if (search.district.district_id !== undefined) {
        const res = await fetchWard(search.district.district_id);
        setWard(res);
      }
    })();
  }, [search.district.district_id]);

  const handleChangeInput = (e) => {
    setSearch((pre) => ({ ...pre, address: e.target.value }));
  };

  const handleClear = () => {
    setSearch({
      isSearch: false,
      typeOfAddress: "",
      province: {
        province_id: undefined,
        province_name: "",
      },
      district: {
        district_id: undefined,
        district_name: "",
      },
      address: "",
    });
    setDataHandle((pre) => ({ ...pre, fetchAgain: true }));
  };
  const handleSubmit = async () => {
    const result = filter(search, dataHandle.dataBackup);
    setDataHandle((pre) => ({
      ...pre,
      dataSearch: result,
      data: result,
    }));
  };

  return (
    <Paper className="p-4 mt-4">
      <div className="row justiy-content-between">
        <div className="row col-lg-11 col-md-11">
          <div className="col-md-2 p-2 input">
            <input
              label="Address"
              value={search.address}
              onChange={handleChangeInput}
              className="w-100 h-100 input-area"
              placeholder="Address"
            />
          </div>
          <div className="col-md-1 p-2">
            <SelectTypeAddress data={search} setData={setSearch} />
          </div>
          <div className="col-md-3 col-lg-3 p-2">
            <CustomAutoComplete
              lable="Select Province"
              values={province}
              type="province"
              setSearch={setSearch}
              setDistrict={setDistrict}
              setWard={setWard}
              search={search}
            />
          </div>
          <div className="col-md-3 col-lg-3 p-2">
            <CustomAutoComplete
              lable="Select District"
              values={district}
              type="district"
              setSearch={setSearch}
              setDistrict={setDistrict}
              setWard={setWard}
              search={search}
            />
          </div>
          <div className="col-md-3 col-lg-3 p-2">
            <CustomAutoComplete
              lable="Select Ward"
              values={ward}
              type="ward"
              setSearch={setSearch}
              setDistrict={setDistrict}
              setWard={setWard}
              search={search}
            />
          </div>
        </div>
        <div className="col-lg-1 col-md-1 d-flex align-items-center justify-content-end p-2">
          <div className="p-2">
            <IconButton
              color="inherit"
              onClick={handleClear}
              className="h-100"
              variant="contained"
            >
              <CloseIcon />
            </IconButton>
          </div>
          <IconButton
            color="primary"
            onClick={handleSubmit}
            className="h-100"
            variant="contained"
          >
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
};
export default SearchBox;
