import React, { useEffect, useState } from "react";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";

import Not from "../components/Not";
import "./Nots.css";
import Navbarown from "../components/Navbarown";
import AddNot from "../components/AddNot";


const Nots = (props) => {
  useEffect(() => {
    const listNots = () => {
      trackPromise(
        axios({
          type: "get",
          headers: { Authorization: "Bearer " + props.token },
          url: props.apiUrl + "api/Nots",
        })
          .then((response) => {
            setnots(response.data);
          })
          .catch((error) => {})
      );
    };
    listNots()
  }, []);

  

  const [nots, setnots] = useState([]);
  const [inputTitle, setinputTitle] = useState("");
  const [inputContent, setinputContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(0);

  
  const editNotHandler = (editItem) => {
    setEditMode(true);
    setinputTitle(editItem.title ? editItem.title : "");
    setinputContent(editItem.content ? editItem.content : "");
    setEditId(editItem.id);
  };

  return (
    <React.Fragment>
      <Navbarown email={props.uName} />
      <div className="row mr-0 not-row">
        <div className="col-md-5">
          <AddNot
            apiUrl={props.apiUrl}
            editId={editId}
            editMode={editMode}
            setEditMode={setEditMode}
            inputTitle={inputTitle}
            setinputTitle={setinputTitle}
            inputContent={inputContent}
            setinputContent={setinputContent}
            token={props.token}
            nots={nots}
            setnots={setnots}
          />
        </div>
        <div className="col-md-7 pr-0 bakalim">
          <ul className="nots">
            {nots.map((not) => (
              <li className="not" key={not.Id}>
                <Not
                  apiUrl={props.apiUrl}
                  setnots={setnots}
                  nots={nots}
                  onYansit={editNotHandler}
                  inputTitle={inputTitle}
                  setinputTitle={setinputTitle}
                  inputContent={inputContent}
                  setinputContent={setinputContent}
                  id={not.Id}
                  date={not.Date}
                  title={not.Title}
                  content={not.Content}
                  token={props.token}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Nots;
