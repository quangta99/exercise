import { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import { Paper } from "@material-ui/core";

import SelectProvinceDistrict from "./SelectProvinceDistrict.Component";

const SearchBox = () => {
  const fetchProvince = useStoreActions(
    (actions) => actions.dataUser.fetchProvince
  );
  const fetchDistrict = useStoreActions(
    (actions) => actions.dataUser.fetchDistrict
  );
  const province = useStoreState((state) => state.dataUser.province);
  const district = useStoreState((state) => state.dataUser.district);
  const [search, setSearch] = useState({
    typeOfAddress: "",
    province: 0,
    district: 0,
    address: "",
  });

  useEffect(() => {
    (async () => {
      await fetchProvince();
    })();
  }, [fetchProvince]);

  useEffect(() => {
    (async () => {
      if (search.province !== 0) {
        await fetchDistrict(search.province);
      }
    })();
  }, [fetchDistrict, search.province]);

  return (
    <Paper className="p-4 mt-4">
      <div className="row">
        <div className="col-md-6">
          <SelectProvinceDistrict
            lable="Select City"
            values={province}
            type="province"
            setSearch={setSearch}
          />
        </div>
        <div className="col-md-6">
          <SelectProvinceDistrict
            lable="Select District"
            values={district}
            type="district"
            setSearch={setSearch}
          />
        </div>
      </div>
    </Paper>
  );
};
export default SearchBox;
