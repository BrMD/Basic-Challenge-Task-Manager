import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { createTask } from "../../features/tasksSlice"

import Button from "../Button/Button"
import styles from "./Header.module.css"
import Modal from "react-responsive-modal"
//Modal imported from https://react-responsive-modal.leopradel.com click the link to see documentation if it is needed

const Header = ({
  lastId,
  counter,
  onSearchTask,
  onCheckboxCompletedTasks,
}: {
  lastId: number
  counter: number
  onSearchTask: Function
  onCheckboxCompletedTasks: Function
}) => {
  const [createModal, setCreateModal] = useState(false)
  const [nameTaskState, setnameTaskState] = useState("")

  const dispatch = useAppDispatch()

  function createTaskModalChangeState() {
    setCreateModal((createModal) => !createModal)
  }
  function createTaskFunction() {
    dispatch(createTask({ id: lastId + 1, name: nameTaskState, status: false }))
    setCreateModal(false)
    setnameTaskState("")
  }

  return (
    <div className={styles.containerHeader}>
      <div className={styles.createButton}>
        <Button
          nameClass="createButton"
          onClickFunction={createTaskModalChangeState}
          completed={false}
        >
          Create task
        </Button>
      </div>
      <div className={styles.checkboxDiv}>
        <label>Completed Tasks</label>
        <input type="checkbox" onChange={() => onCheckboxCompletedTasks()} />
      </div>
      <div className={styles.checkboxDiv}>
        <label>{counter} tasks remaining</label>
      </div>
      <div className={styles.divInput}>
        <input onChange={(e) => onSearchTask(e.target.value)} type="text" />
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
        open={createModal}
        onClose={createTaskModalChangeState}
      >
        <div className={styles.formCreateModal}>
          <h3>Create Task</h3>
          <div className={styles.divInput}>
            <label>Task Name: </label>
            <input
              onChange={(e) => setnameTaskState(e.target.value)}
              type="text"
            />
          </div>
          <Button
            completed={false}
            onClickFunction={createTaskFunction}
            nameClass="createButton"
          >
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Header
