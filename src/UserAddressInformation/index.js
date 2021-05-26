import { Paper, Button } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

import { fetchDataById, editData, createData } from "../Services";
import { validate } from "./Validate";
import FormUserAddress from "./FormUserAddress.Container";

const UserAddressInformation = ({ setDataHandle }) => {
  const { id } = useParams();
  const history = useHistory();
  const [validation, setValidation] = useState({});
  const [data, setData] = useState({
    id: "",
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

  useEffect(() => {
    (async () => {
      if (id !== "create") {
        const res = await fetchDataById(id);
        setData(res);
      }
    })();
  }, [id]);

  const handleSubmit = () => {
    const error = validate(data);
    if (
      !error.address &&
      !error.typeOfAddress &&
      !error.province &&
      !error.district
    ) {
      if (id !== "create") {
        editData(data);
        history.push("/");
        setDataHandle((pre) => ({ ...pre, fetchAgain: true }));
      } else {
        createData(data);
        history.push("/");
        setDataHandle((pre) => ({ ...pre, fetchAgain: true }));
      }
    }
    setValidation(error);
  };

  const handleClear = () => {
    setData({
      id: "",
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
  };

  return (
    <div className="container w-50">
      <Link to="/" style={{ textDecoration: "none" }}>
        Back
      </Link>
      <h4 className="mb-4 mt-2">
        {id !== "create" ? "Edit Information 🪛" : "Create Information 🔨"}
      </h4>
      <Paper className="p-4">
        <FormUserAddress
          setValidation={setValidation}
          data={data}
          setData={setData}
          setDataHandle={setDataHandle}
          validation={validation}
        />
      </Paper>
      <div className="button-submit p-4">
        <div className="p-1">
          <Button color="secondary" variant="contained" onClick={handleClear}>
            Clear
          </Button>
        </div>
        <div className="p-1">
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            {id !== "create" ? "Edit" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default UserAddressInformation;
