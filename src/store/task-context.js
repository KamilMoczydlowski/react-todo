import React from "react"

const TaskContext = React.createContext({
    categories: [],
    addCategory: category => {},
    removeCategory: categoryId => {},
})

export default TaskContext