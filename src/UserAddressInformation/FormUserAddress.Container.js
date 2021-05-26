import { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";

import "./FormUserAddress.css";

import { fetchProvince, fetchDistrict } from "../Services";
import SelectTypeAddress from "../Components/SelectTypeAddress.Component";
import SelectProvinceDistrict from "./SelectProvinceDistrict.Component";

const FormUserAddress = ({ data, setData, validation, setValidation }) => {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetchProvince();
      setProvince(res);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (data.province.province_id !== undefined) {
        const res = await fetchDistrict(data.province.province_id);
        setDistrict(res);
      }
    })();
  }, [data.province.province_id]);

  const handleInputChange = (e) => {
    setData((pre) => ({ ...pre, address: e.target.value }));
    setValidation((pre) => ({ ...pre, address: false }));
  };

  return (
    <div className="">
      <div className="mb-2">
        <TextField
          label="Address"
          className="address"
          variant="filled"
          value={data.address}
          onChange={handleInputChange}
          error={validation.address}
        />
      </div>
      <div className="mb-2">
        <SelectTypeAddress
          error={validation.typeOfAddress}
          setValidation={setValidation}
          data={data}
          setData={setData}
        />
      </div>
      <div className="mb-2">
        <SelectProvinceDistrict
          values={province}
          lable="Select Province"
          type="province_edit"
          data={data}
          setData={setData}
          setDistrict={setDistrict}
          error={validation.province}
          setValidation={setValidation}
        />
      </div>
      <div className="mb-2">
        <SelectProvinceDistrict
          values={district}
          lable="Select District"
          type="district_edit"
          setData={setData}
          data={data}
          error={validation.district}
          setValidation={setValidation}
          setDistrict={setDistrict}
        />
      </div>
    </div>
  );
};
export default FormUserAddress;
