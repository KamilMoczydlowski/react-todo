import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import TaskProvider from './store/TaskProvider';

// import WelcomePage, {loader as WelcomeLoader} from './pages/WelcomePage';

import MainPage from './pages/MainPage';
import AddNewTaskPage from './pages/AddNewTaskPage';
import AddNewCategoryPage from './pages/AddNewCategoryPage';
import CategoryBigCardPage from './pages/CategoryBigCardPage';

const router = createBrowserRouter([
	{ path: '/', element: <MainPage /> },
	{ path: '/bigCard', element: <CategoryBigCardPage /> },
	{ path: '/addNewTask', element: <AddNewTaskPage /> },
	{ path: '/addNewCategory', element: <AddNewCategoryPage /> },
]);

function App() {
	return (
		<TaskProvider>
			<RouterProvider router={router} />
		</TaskProvider>
	);
}

export default App;
