import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./index.css";

import { deleteData, paginate } from "../../Services";
import { SortField } from "./Sort";
import PaginationComponent from "./Pagination.Component";

const TableData = ({ dataHandle, setDataHandle }) => {
  const [type, setType] = useState(true);
  const handleSort = (sortField, sortFieldSub) => {
    setDataHandle((pre) => ({
      ...pre,
      data: SortField(dataHandle.dataBackup, sortField, type, sortFieldSub),
    }));
    setType(!type);
  };

  useEffect(() => {
    (() => {
      if (dataHandle.data.length >= 5) {
        const res = paginate(0, dataHandle.dataBackup);
        setDataHandle((pre) => ({ ...pre, data: res }));
      }
    })();
  }, [dataHandle.data.length, dataHandle.dataBackup, setDataHandle]);

  const handleDelete = (id) => {
    deleteData(id);
    setDataHandle((pre) => ({
      ...pre,
      fetchAgain: true,
    }));
  };

  return (
    <div>
      <div className="mt-4 mb-4" style={{ minHeight: 425 }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "black" }}>
                <TableCell
                  className="table-cell"
                  onClick={() => handleSort("address")}
                >
                  <p className="table-header-title">Address</p>
                </TableCell>
                <TableCell
                  className="table-cell"
                  onClick={() => handleSort("typeOfAddress")}
                >
                  <p className="table-header-title">Type of Address</p>
                </TableCell>
                <TableCell
                  className="table-cell"
                  onClick={() => handleSort("province", "province_name")}
                >
                  <p className="table-header-title">Province</p>
                </TableCell>
                <TableCell
                  className="table-cell"
                  onClick={() => handleSort("district", "district_name")}
                >
                  <p className="table-header-title">District</p>
                </TableCell>
                <TableCell className="table-cell"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataHandle.data &&
                dataHandle.data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.typeOfAddress}</TableCell>
                    <TableCell align="left">
                      {row.province.province_name}
                    </TableCell>
                    <TableCell align="left">
                      {row.district.district_name}
                    </TableCell>
                    <TableCell align="left">
                      <div className="flex align-items-center">
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/${row.id}`}
                        >
                          <Button
                            variant="text"
                            color="primary"
                            className="p-2"
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="text"
                          color="secondary"
                          className="p-2"
                          onClick={() => handleDelete(row.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!dataHandle.data?.length && (
          <div className="no-data text-center">No Data</div>
        )}
      </div>
      <div className="w-100 d-flex justify-content-end mt-4">
        <PaginationComponent
          total={Math.ceil(dataHandle.dataBackup.length / 5)}
          setDataHandle={setDataHandle}
          dataHandle={dataHandle}
        />
      </div>
    </div>
  );
};
export default TableData;
