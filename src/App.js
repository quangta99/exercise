import { StoreProvider } from "easy-peasy";

import "./App.css";

import { store } from "./Store";
import ListUserAddress from "./ListUserAddress";

function App() {
  return (
    <StoreProvider store={store}>
      <ListUserAddress />
    </StoreProvider>
  );
}
export default App;
