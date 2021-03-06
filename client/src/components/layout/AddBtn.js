import React from "react";

export const AddBtn = () => {
  return (
    <div className="fixed-action-btn">
      <a
        href="#add-job-modal"
        className="btn-floating btn-large blue darken-2 modal-trigger"
        style={{ marginBottom: "100px", marginRight: "20px" }}
      >
        <i className="fas fa-plus large"></i>
      </a>
    </div>
  );
};

export default AddBtn;
