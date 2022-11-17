import React from "react"

const TaskContext = React.createContext({
    categories: [],
    tasksInAllCategories: 0,
    addCategory: category => {},
    removeCategory: categoryId => {},
})

export default TaskContext