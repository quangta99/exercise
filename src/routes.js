import { Switch, Route } from "react-router-dom";
import ListUserAddress from "./ListUserAddress";
import UserAddressInformation from "./UserAddressInformation";

const Routes = ({ dataHandle, setDataHandle }) => {
  return (
    <Switch>
      <Route exact path="/">
        <ListUserAddress
          dataHandle={dataHandle}
          setDataHandle={setDataHandle}
        />
      </Route>
      <Route exact path="/:id">
        <UserAddressInformation setDataHandle={setDataHandle} />
      </Route>
    </Switch>
  );
};
export default Routes;
