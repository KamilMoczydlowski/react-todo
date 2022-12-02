import { useContext } from 'react';

import {
	Route,
	Navigate,
	BrowserRouter,
	Routes,
} from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';

import MainPage from './pages/MainPage';
import AddNewTaskPage from './pages/AddNewTaskPage';
import AddNewCategoryPage from './pages/AddNewCategoryPage';
import CategoryBigCardPage from './pages/CategoryBigCardPage';

import AuthContext from './store/auth-context';

function App() {
	const authCtx = useContext(AuthContext);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/auth'
					element={
						authCtx.isLoggedIn ? (
							<Navigate replace to='/main' />
						) : (
							<WelcomePage />
						)
					}
				/>
				<Route
					path='/main'
					element={
						authCtx.isLoggedIn ? <MainPage /> : <Navigate replace to='/auth' />
					}
				/>
				<Route
					path='/main/:id'
					element={
						authCtx.isLoggedIn ? (
							<CategoryBigCardPage />
						) : (
							<Navigate replace to='/auth' />
						)
					}
				/>
				<Route
					path='/addNewTask'
					element={
						authCtx.isLoggedIn ? (
							<AddNewTaskPage />
						) : (
							<Navigate replace to='/auth' />
						)
					}
				/>
				<Route
					path='/addNewCategory'
					element={
						authCtx.isLoggedIn ? (
							<AddNewCategoryPage />
						) : (
							<Navigate replace to='/auth' />
						)
					}
				/>
				<Route path='/*' element={<Navigate replace to='/auth' />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
