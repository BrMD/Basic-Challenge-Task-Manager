import Header from "../components/Header/Header"
import Task from "../components/Task/Task"
import "react-responsive-modal/styles.css"

import styles from "./TaskManger.module.css"
import { useAppSelector } from "../app/hooks"
import { useMemo, useState } from "react"
import { selectTask } from "./tasksSlice"
const TaskManager = () => {
  const tasks = useAppSelector(selectTask)
  const [searchTask, setSearchTask] = useState("")
  const [checkboxCompletedTasks, setCheckboxCompletedTasks] = useState(false)
  const filtered = useMemo(() => filterArray(), [filterArray])
  const counterTasks = tasks.filter((task) => task.status === false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function filterArray() {
    let filtered = tasks.filter((task) =>
      task.name.toLowerCase().includes(searchTask.toLowerCase()),
    )
    if (checkboxCompletedTasks === true) {
      filtered = filtered.filter((task) => task.status === true)
    }

    return filtered
  }

  function changeCheckbox() {
    setCheckboxCompletedTasks(
      (checkboxCompletedTasks) => !checkboxCompletedTasks,
    )
  }

  return (
    <div className={styles.containerTaskManager}>
      <div>
        <h1 className={styles.title}>Task Manager</h1>
      </div>
      <Header
        onSearchTask={setSearchTask}
        onCheckboxCompletedTasks={changeCheckbox}
        lastId={tasks.length >= 1 ? tasks[tasks.length - 1].id : -1}
        counter={counterTasks.length}
      />
      {
        //this part can be confusing but its just for get the next id number if the array is empty the system will give the number -1 for the next task has the id of 0
      }
      {filtered.length > 0 ? (
        filtered.map((task) => {
          return (
            <Task
              name={task.name}
              id={task.id}
              complete={task.status}
              key={task.id}
            >
              {task.name}
            </Task>
          )
        })
      ) : (
        <div className={styles.divNoItemsFound}>No items Found!</div>
      )}
    </div>
  )
}

export default TaskManager
