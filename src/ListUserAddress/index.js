import { Button, Container } from "@material-ui/core";
import TableData from "./Table";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";

const ListUserAddress = ({ dataHandle, setDataHandle }) => {
  return (
    <div>
      <Container>
        <SearchBox dataHandle={dataHandle} setDataHandle={setDataHandle} />
        <div className="w-100 d-flex justify-content-end mt-4">
          <Link style={{ textDecoration: "none" }} to="/create">
            <Button
              style={{ marginRight: 38 }}
              color="primary"
              variant="contained"
            >
              Create
            </Button>
          </Link>
        </div>
        <TableData dataHandle={dataHandle} setDataHandle={setDataHandle} />
      </Container>
    </div>
  );
};
export default ListUserAddress;
