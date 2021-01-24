import React from "react";
import Moment from 'react-moment';
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import '../pages/Nots.css'
import DeleteIcon from '@material-ui/icons/Delete';

const Not = (props) => {
  const editItemHandler =()=>{
    const editItem = {id:props.id, title: props.title, content: props.content};
    props.onYansit(editItem)
  }
  
  const deleteSubmitHandler =(e)=>{
    e.preventDefault();
    trackPromise(
      axios({
        method: "delete",
        url: props.apiUrl + "api/Nots/" + props.id,
        headers: {
          Authorization: "Bearer " + props.token,
        }
      })
        .then((response) => {
          props.setnots(props.nots.filter((not)=>not.Id!==response.data.Id))
        })
        .catch((error) => {
        })
    );
  };
  
  return (
    <div>
        <div className="post-it">
          <div className="clickable" onClick={editItemHandler} onMouseEnter={editItemHandler}>
          <h2>{props.title ? props.title.substr(0,19) : null}...</h2>
          <p><Moment format="LL">{props.date}</Moment></p>
          </div>
         <DeleteIcon className="sil-button" onClick={deleteSubmitHandler}/>
        </div>
    </div>
  );
};

export default Not;
