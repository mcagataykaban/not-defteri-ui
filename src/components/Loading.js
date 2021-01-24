import React from "react";
import { usePromiseTracker } from "react-promise-tracker";


import './Loading.css'
const Loading = (props) => {
    const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && 
    <div className="loading">
      <div className="spinner-border text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
