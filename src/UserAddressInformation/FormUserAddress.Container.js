import { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useParams, useHistory } from "react-router";

import "./FormUserAddress.css";

import { fetchProvince, fetchDistrict, editData, createData } from "../Services";
import SelectTypeAddress from "../Components/SelectTypeAddress.Component";
import SelectProvinceDistrict from "./SelectProvinceDistrict.Component";

const FormUserAddress = ({ data, setData, setDataHandle }) => {
  const { id } = useParams();
  const history = useHistory()
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetchProvince();
      setProvince(res.results);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (data.province.province_id !== undefined) {
        const res = await fetchDistrict(data.province.province_id);
        setDistrict(res.results);
      }
    })();
  }, [data.province.province_id]);

  const handleInputChange = (e) => {
    setData((pre) => ({...pre,
        address: e.target.value
    }))
  }

  const handleSubmit = () => {
      if(id !== 'create') {
        editData(data)
        history.push('/')
        setDataHandle((pre) => ({...pre, fetchAgain: true}))
      }
      else {
        createData(data)
        history.push('/')
        setDataHandle((pre) => ({...pre, fetchAgain: true}))
      }
  };

  return (
    <div className="form">
      <div className="mb-2">
        <TextField
          label="Address"
          className="address"
          variant="filled"
          value={data.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
        <SelectTypeAddress data={data} setData={setData} />
      </div>
      <div className="mb-2">
        <SelectProvinceDistrict
          values={province}
          lable="Select Province"
          type="province_edit"
          data={data}
          setData={setData}
          setDistrict={setDistrict}
        />
      </div>
      <div className="mb-2">
        <SelectProvinceDistrict
          values={district}
          lable="Select District"
          type="district_edit"
          setData={setData}
          data={data}
          setDistrict={setDistrict}
        />
      </div>
      <div className="button-submit">
        <Button color="primary" variant="contained" onClick={handleSubmit}>{id !== "create" ? "Edit" : "Create"}</Button>
      </div>
    </div>
  );
};
export default FormUserAddress;
