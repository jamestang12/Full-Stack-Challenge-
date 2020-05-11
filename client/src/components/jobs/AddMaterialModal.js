import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import M from "materialize-css/dist/js/materialize.min.js";
import JobContext from "../../context/job/jobContext";

export const AddMaterialModal = () => {
  const jobContext = useContext(JobContext);
  const { addCurrentMaterial, jobDataId } = jobContext;

  useEffect(() => {
    M.AutoInit();
  }, []);
  const [itemNumber, setItemNumber] = useState("");
  const [part, setPart] = useState("");
  const [quantity, setQuantity] = useState("");
  const _id = uuidv4();
  const job = jobDataId;

  const onsubmit = () => {
    if (itemNumber === "" || part === "" || quantity === "") {
      M.toast({ html: "Please fill out all field" });
    } else {
      const newMaterial = {
        itemNumber,
        part,
        quantity,
        _id,
        job,
      };
      console.log(`22222 ${newMaterial}`);
      addCurrentMaterial(newMaterial);
      setItemNumber("");
      setPart("");
      setQuantity("");
      M.toast({ html: "Material added" });
    }
  };

  return (
    <div id="add-material-modal" className="modal">
      <div className="modal-content">
        <h4>Add new material</h4>
        <br />
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="itemNumber"
              value={itemNumber}
              onChange={(e) => setItemNumber(e.target.value)}
            />
            <label htmlFor="itemNumber" className="active">
              Item Number
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="part"
              value={part}
              onChange={(e) => setPart(e.target.value)}
            />
            <label htmlFor="itemNumber" className="active">
              Part
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <label htmlFor="itemNumber" className="active">
              Quantity
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect blue white-text btn btn-extend"
            onClick={onsubmit}
          >
            Enter
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddMaterialModal;
