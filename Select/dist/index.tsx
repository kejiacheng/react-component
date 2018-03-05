import * as React from "react";
import * as ReactDOM from "react-dom";
import Select from "./components/Select";
import Index from './containers/test'
let Option = Select.Option

ReactDOM.render(
    <div style={{margin: '100px'}}>
        <Index/>
    </div>,
    document.getElementById("app")
);