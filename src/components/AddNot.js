import React from "react";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import qs from "qs";
import "./AddNot.css";
import { Button } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const AddNot = (props) => {
  const inputTitleHandler = (e) => {
    props.setinputTitle(e.target.value);
  };
  const inputContentHandler = (e) => {
    props.setinputContent(e.target.value);
  };

  const exitEditModeHandler = () => {
    props.setEditMode(false);
    props.setinputContent("");
    props.setinputTitle("");
  };

  function listNots() {
    trackPromise(
      axios({
        type: "get",
        headers: { Authorization: "Bearer " + props.token },
        url: props.apiUrl + "api/Nots",
      })
        .then((response) => {
          props.setnots(response.data);
        })
        .catch((error) => {})
    );
  }

  const submitFormHandler = (e) => {
    e.preventDefault();
    trackPromise(
      axios({
        method: "post",
        url: props.apiUrl + "api/Nots",
        headers: {
          Authorization: "Bearer " + props.token,
        },
        data: qs.stringify({
          Title: props.inputTitle,
          Content: props.inputContent,
        }),
      })
        .then((response) => {
          props.setinputTitle("");
          props.setinputContent("");
          props.setnots([...props.nots, response.data]);
        })
        .catch((error) => {})
    );
  };

  const submitEditFormHandler = (e) => {
    e.preventDefault();
    trackPromise(
      axios({
        method: "put",
        url: props.apiUrl + "api/Nots/" + props.editId,
        headers: {
          Authorization: "Bearer " + props.token,
        },
        data: qs.stringify({
          Id: props.editId,
          Title: props.inputTitle,
          Content: props.inputContent,
        }),
      })
        .then((response) => {
          listNots();
          props.setinputContent("");
          props.setinputTitle("");
          exitEditModeHandler();
        })
        .catch((error) => {})
    );
  };
  return (
    <form className="add-form">
      <input
        value={props.inputTitle}
        id="titleInputId"
        required="required"
        onChange={inputTitleHandler}
        placeholder="Not title"
        type="text"
        className="component-form-shadow"
      />
      <textarea
        id="textareaId"
        value={props.inputContent}
        required="required"
        onChange={inputContentHandler}
        placeholder="Not content"
        className="mt-5 component-form-shadow"
        type="text"
        rows="15"
      ></textarea>
      <br />
      {props.editMode === false ? (
        <Button
          className="mt-3 btn-success rounded-0"
          onClick={submitFormHandler}
        >
          <AddIcon />
        </Button>
      ) : (
        <div>
          <Button
            className="mt-3 w-25 btn-success rounded-0"
            onClick={submitEditFormHandler}
          >
            <SaveIcon />
          </Button>
          <Button
            onClick={exitEditModeHandler}
            className="mt-3 w-25 btn-danger ml-2 rounded-0"
          >
            <ArrowBackIcon/>
          </Button>
        </div>
      )}
    </form>
  );
};

export default AddNot;
