"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var Select_1 = require("./components/Select");
var Option = Select_1.default.Option;
ReactDOM.render(React.createElement("div", { style: { margin: '100px' } },
    React.createElement(Select_1.default, { style: { width: 200 }, placeholder: 321, mode: "combobox", 
        // defaultValue="1"
        onChange: function (value, text) {
            console.log(value);
            console.log(text);
        }, clear: true, selectClassName: "select", optionClassName: "option", trigger: function () { console.log(123); }, inputChange: function (text) { console.log(text); } },
        React.createElement(Option, { value: "1", disabled: true }, "123"),
        React.createElement(Option, { value: "2", title: "312312" }, "134"),
        React.createElement(Option, { value: "3" }, "13235"),
        React.createElement(Option, { value: "4" }, "1236"),
        React.createElement(Option, { value: "5" }, "1237"),
        React.createElement(Option, { value: "6" }, "1238"),
        React.createElement(Option, { value: "7" }, "1239"))), document.getElementById("app"));
//# sourceMappingURL=index.js.map