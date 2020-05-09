import React, { useContext, useEffect } from "react";
import TaskContext from "../../context/task/taskContext";

export const TaskItem = ({ task }) => {
  const taskContext = useContext(TaskContext);
  const { deleteCurrentTask, setCurrentTask } = taskContext;

  const onDelete = () => {
    deleteCurrentTask(task.jobId);
  };

  return (
    <li className="collection-item">
      <div>
        <a
          href="#edit-task-modal"
          className=" modal-trigger blue-text"
          onClick={() => setCurrentTask(task)}
        >
          Job No: {task.jobNumber}
        </a>
        <br />
        <span className="grey-text">
          <span className="black-text">Serial No: {task.SerialNumber}</span>
        </span>
        <br />
        <span className="grey-text">
          <span className="black-text">Instructment : {task.instructment}</span>
        </span>
        <a onClick={onDelete} className="secondary-content">
          <i className="fas fa-trash-alt"></i>
        </a>
      </div>
    </li>
  );
};

export default TaskItem;
