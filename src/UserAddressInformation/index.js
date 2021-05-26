import { Paper } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";

import { fetchDataById } from "../Services";
import FormUserAddress from "./FormUserAddress.Container";

const UserAddressInformation = ({setDataHandle}) => {
  const { id } = useParams();
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
      if (id !== 'create') {
        const res = await fetchDataById(id);
        setData(res);
      }
    })();
  }, [id]);

  return (
    <div className="container">
      <h4 className="mb-4">{id !=='create' ? "Edit Information" : "Create Information"}</h4>
      <Paper className="p-4">
        <FormUserAddress data={data} setData={setData} setDataHandle={setDataHandle} />
      </Paper>
    </div>
  );
};
export default UserAddressInformation;
