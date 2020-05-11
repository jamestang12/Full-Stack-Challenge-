import React, { useContext } from "react";
import JobContext from "../../context/job/jobContext";

export const MaterialItem = ({ material }) => {
  const jobContext = useContext(JobContext);
  const {
    deleteCurrentMaterial,
    addRemoveList,
    setCurrentMaterial,
  } = jobContext;
  const onDelete = () => {
    deleteCurrentMaterial(material);
    addRemoveList(material);
    console.log(material);
  };

  const onEdit = () => {
    setCurrentMaterial(material);
  };
  return (
    <li className="collection-item">
      <div>
        <a
          href="#edit-material-modal"
          className="modal-trigger blue-text"
          onClick={onEdit}
        >
          Item number: {material.itemNumber}
        </a>
        <br />
        <span className="grey-text">
          <span className="black-text">Parts: {material.part}</span>
        </span>
        <br />
        <span className="grey-text">
          <span className="black-text">Qity: {material.quantity}</span>
        </span>
        <a onClick={onDelete} className="secondary-content">
          <i className="fas fa-trash-alt"></i>
        </a>
      </div>
    </li>
  );
};

export default MaterialItem;
