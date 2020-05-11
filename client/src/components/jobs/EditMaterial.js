import React, { useContext, useEffect, useState } from "react";
import JobContext from "../../context/job/jobContext";
import M from "materialize-css/dist/js/materialize.min.js";

export const EditMaterial = () => {
  const jobContext = useContext(JobContext);
  const { materialCurrentState, updateCurrentMaterial } = jobContext;
  const [part, setPart] = useState("");
  const [itemNumber, setItemNumber] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    if (materialCurrentState) {
      setPart(materialCurrentState.part);
      setItemNumber(materialCurrentState.itemNumber);
      setQuantity(materialCurrentState.quantity);
    }
  }, [materialCurrentState]);

  const onsubmit = () => {
    if (part === "" || itemNumber === "" || quantity === "") {
      M.toast({ html: "Field cannot be empty" });
      M.toast({ html: "Edit fail" });
    } else {
      const newMaterial = {
        part,
        itemNumber,
        quantity,
        _id: materialCurrentState._id,
      };
      updateCurrentMaterial(newMaterial);
      M.toast({ html: "Material updated" });
      setPart("");
      setItemNumber("");
      setQuantity("");
    }
  };

  return (
    <div id="edit-material-modal" className="modal">
      <div className="modal-content">
        <h4>Edit Material</h4>
        <br />
        <div className="row">
          <p>Item number</p>
          <div className="input-field">
            <input
              type="text"
              name="itemNumber"
              value={itemNumber}
              onChange={(e) => setItemNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <p>Part</p>
          <div className="input-field">
            <input
              type="text"
              name="part"
              value={part}
              onChange={(e) => setPart(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <p>Quantity</p>
          <div className="input-field">
            <input
              type="text"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            onClick={onsubmit}
            className="modal-close waves-effect blue white-text btn btn-extend"
          >
            Enter
          </a>
        </div>
      </div>
    </div>
  );
};

export default EditMaterial;
