import React, { Component } from "react";
import ReactDOM from "react-dom";

import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

import { Provider } from "react-redux";

import { createStore, combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import ReduxToastr, { toastr } from "react-redux-toastr";
import axios from "axios";

const reducers = {
  toastr: toastrReducer
};
const reducer = combineReducers(reducers);
const store = createStore(reducer);

const ajaxCall = () => {
  axios.get("https://jsonplaceholder.typicode.com/todos/1").then(json => {
    console.log(json);
    toastr.success("The title", "The message");
  });
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <button
            type="button"
            onClick={() => {
              ajaxCall();
            }}
          >
            CLICK
          </button>

          <button
            style={{ float: "right" }}
            type="button"
            onClick={() => {
              toastr.success("NON BLOCKIN TOASTR");
            }}
          >
            CLICK NON BLOCKING
          </button>

          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-left"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
        </div>
      </Provider>
    );
  }
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
