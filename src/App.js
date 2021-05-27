import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import Routes from "./routes";
import { fetchData } from "./Services";

function App() {
  const [dataHandle, setDataHandle] = useState({
    data: [],
    dataBackup: [],
    dataSearch: undefined,
    fetchAgain: false,
  });

  useEffect(() => {
    (async () => {
      const res = await fetchData();
      setDataHandle((pre) => ({
        ...pre,
        data: res,
        dataBackup: res,
        dataSearch: undefined,
        fetchAgain: false,
      }));
    })();
  }, [dataHandle.fetchAgain]);

  return (
    <Router>
      <Routes dataHandle={dataHandle} setDataHandle={setDataHandle} />
    </Router>
  );
}
export default App;
