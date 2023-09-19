import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { deleteTask, completeTask, editTask } from "../../features/tasksSlice"

import Button from "../Button/Button"
import Modal from "react-responsive-modal"

import styles from "./Task.module.css"

const Task = ({
  id,
  complete,
  name,
  children,
}: {
  id: number
  complete: boolean
  name: string
  children: React.ReactNode
}) => {
  const [editModal, setEditModal] = useState(false)
  const [editInput, setEditInput] = useState(name)

  const dispatch = useAppDispatch()

  function editTaskModalChangeState() {
    setEditModal((editModal) => !editModal)
  }
  function completeDispatchFunctionCallback() {
    dispatch(completeTask(id))
  }
  function deleteDispatchFunctionCallback() {
    dispatch(deleteTask(id))
  }
  function editDispatchFunctionCallback() {
    setEditModal(false)
    dispatch(editTask({ id: id, name: editInput, status: complete }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.nameTask}>
        <span>{children}</span>
      </div>
      <div className={styles.completionTask}>
        <span className={`${complete && styles.completetionTaskComplete}`}>
          {complete ? "Complete" : "Not Complete"}
        </span>
      </div>
      <div className={styles.buttonTask}>
        <Button
          completed={false}
          nameClass={"deleteButton"}
          onClickFunction={() => {
            deleteDispatchFunctionCallback()
          }}
        >
          Delete
        </Button>
        <Button
          completed={false}
          nameClass={"editTask"}
          onClickFunction={() => {
            editTaskModalChangeState()
          }}
        >
          Edit
        </Button>
        <Button
          nameClass={"completeButton"}
          onClickFunction={() => {
            completeDispatchFunctionCallback()
          }}
          completed={complete}
        >
          Complete
        </Button>
      </div>
      <Modal
        styles={{
          closeIcon: { display: "none" },
          modal: {
            background: "#000",
            borderRadius: "10px",
            fontFamily: "'Inclusive Sans', sans-serif",
          },
        }}
        open={editModal}
        onClose={editTaskModalChangeState}
      >
        <div className={styles.formEditModal}>
          <h3>Create Task</h3>
          <div className={styles.divInput}>
            <label>Task Name: </label>
            <input
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              type="text"
            />
          </div>
          <Button
            completed={false}
            onClickFunction={editDispatchFunctionCallback}
            nameClass="editTask"
          >
            Edit
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Task
