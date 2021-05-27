import { Pagination } from "@material-ui/lab";

const PaginationComponent = ({ total, setPage }) => {
  const handleChange = (e, value) => {
    setPage(Number(value))
  };
  return <Pagination count={total} onChange={handleChange} />;
};
export default PaginationComponent;
