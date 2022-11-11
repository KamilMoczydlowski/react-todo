import './App.css';

import Main from './components/Main';
// import AddNewTask from './components/AddNewTask';
import TaskProvider from './store/TaskProvider';

function App() {
	return (
		<TaskProvider>
				<Main />
				{/* <AddNewTask /> */}
		</TaskProvider>
	);
}

export default App;
