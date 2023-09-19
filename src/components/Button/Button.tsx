import React from "react"
import styles from "./Button.module.css"

const Button = ({
  nameClass,
  onClickFunction,
  completed,
  children,
}: {
  nameClass: string
  onClickFunction: Function
  children: React.ReactNode
  completed: Boolean
}) => {
  return (
    <button
      onClick={() => onClickFunction()}
      className={`${styles.button} ${styles[nameClass]} ${
        completed && styles.completeButtonActive
      }`}
    >
      {children}
    </button>
  )
}

export default Button
