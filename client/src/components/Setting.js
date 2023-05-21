import {
  faEdit,
  faEllipsisV,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteQues } from "../service/api";

export default function Setting({ id, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  const navigate = useNavigate();
  const edit = (id) => {
    navigate(`/editQuestion/${id}`);
  };
  const del = async (id) => {
    await deleteQues(id);
    onDelete(id);
  };
  return (
    <div className="setting">
      <button
        className="dropdown-toggle"
        onClick={toggleMenu}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon style={{ height: "1.3vw" }} icon={faEllipsisV} />
        {isOpen && (
          <div className="dropdown-menu">
            <button className="edit" onClick={() => edit(id)}>
              <FontAwesomeIcon
                style={{ height: "1vw", paddingBottom: ".3vh" }}
                icon={faEdit}
              />
              <p className="drop">Edit</p>
            </button>
            <button className="del" onClick={() => del(id)}>
              <FontAwesomeIcon
                style={{ height: "1vw", paddingBottom: ".3vh" }}
                icon={faTrash}
              />
              <p className="drop">Delete</p>
            </button>
          </div>
        )}
      </button>
    </div>
  );
}
