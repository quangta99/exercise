import { Pagination } from "@material-ui/lab";

import { paginate } from "../../Services";

const PaginationComponent = ({ setDataHandle, total, dataHandle }) => {
  const handleChange = (e, value) => {
    setDataHandle((pre) => ({
      ...pre,
      data: paginate(value > 1 ? (value - 1) * 5 : 0, dataHandle.dataBackup),
    }));
  };
  return <Pagination count={total} onChange={handleChange} />;
};
export default PaginationComponent;
