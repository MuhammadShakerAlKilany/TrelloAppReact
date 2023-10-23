"use client";
import React, { useEffect } from "react";
import FormUpdateTask from "../FormUpdateTask/FormUpdateTask";
import styles from "./Task.module.css";

export default function Task({ task, deleteTask, refetch }) {
  const id = task._id;

  return (

    <div className={styles.theTask}>
    <h2>{task.title}</h2>
    <div>
      <p ><strong>Description:</strong> {task.description}</p>
    </div>
    <div>
      <p><strong>Status</strong>: {task.status}</p>
    </div>
    <div><strong>Deadline</strong>: {task.deadline}</div>
    <button
    className="btn btn-danger "
      type="button"
      onClick={() => {
        deleteTask(id);
      }}
    >
    Delete
    </button>
    <div className={styles.disapper}>
      <FormUpdateTask refetch={refetch} task={task} />
    </div>
  </div>
  );
}
