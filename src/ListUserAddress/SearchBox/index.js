import { useState, useEffect } from "react";

import { Paper, Button, TextField, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { fetchProvince, fetchDistrict } from "../../Services";

import SelectProvinceDistrict from "./SelectProvinceDistrict.Component";
import SelectTypeAddress from "../../Components/SelectTypeAddress.Component";
import { filter } from "../../Services";
import CustomAutoComplete from "../../Components/CustomAutoComplete/CustomAutoComplete.Component";
// import FilteringTag from "./FilteringTag.Component";

const SearchBox = ({ dataHandle, setDataHandle }) => {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  // const [showTag, setShowTag] = useState(false);
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
    address: "",
  });

  // useEffect(() => {
  //   (() => {
  //     if (search.isSearch) {
  //       const result = filter(search, dataHandle.dataBackup);
  //       setDataHandle((pre) => ({
  //         ...pre,
  //         dataSearch: result,
  //         data: result,
  //       }));
  //     }
  //   })();
  // }, [dataHandle.dataBackup, search, setDataHandle]);

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
    // setShowTag(true);
  };

  return (
    <Paper className="p-4 mt-4">
      <CustomAutoComplete data={province}/>
      <div className="row justiy-content-between">
        <div className="row col-lg-10 col-md-10">
          <div className="col-md-2 p-2">
            <TextField
              label="Address"
              value={search.address}
              onChange={handleChangeInput}
              variant="outlined"
              className="w-100"
            />
          </div>
          <div className="col-md-2 p-2">
            <SelectTypeAddress
              error={false}
              data={search}
              setData={setSearch}
            />
          </div>
          <div className="col-md-3 p-2">
            <SelectProvinceDistrict
              lable="Select City"
              values={province}
              type="province"
              setSearch={setSearch}
              setDistrict={setDistrict}
              search={search}
            />
          </div>
          <div className="col-md-3 p-2">
            <SelectProvinceDistrict
              lable="Select District"
              values={district}
              type="district"
              setSearch={setSearch}
              setDistrict={setDistrict}
              search={search}
            />
          </div>
          <div className="col-md-1 p-2">
            <IconButton
              color="inherit"
              onClick={handleClear}
              className="h-100"
              variant="contained"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 d-flex align-items-center justify-content-end p-2">
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
      {/* {showTag && (
        <FilteringTag
          search={search}
          setDataHandle={setDataHandle}
          setSearch={setSearch}
          handleSubmit={handleSubmit}
        />
      )} */}
    </Paper>
  );
};
export default SearchBox;
