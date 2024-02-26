import "./App.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./assets/routes";
import { Provider } from "react-redux";
import { myStore } from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={myStore}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
