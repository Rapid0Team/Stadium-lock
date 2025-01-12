import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { Box} from "./redux/Store";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={Box} >
        <App/>
    </Provider>
    
)