import { lazy, Suspense, useContext } from 'react';

import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';

import AuthContext from './store/auth-context';

const MainPage = lazy(() => import('./pages/MainPage'));
const AddNewCategoryPage = lazy(() => import('./pages/AddNewCategoryPage'));
const AddNewTaskPage = lazy(() => import('./pages/AddNewTaskPage'));
const CategoryBigCardPage = lazy(() => import('./pages/CategoryBigCardPage'));
const AddColorsAndIconsPage = lazy(() =>
	import('./pages/AddColorsAndIconsPage')
);

const router = authCtx =>
	createBrowserRouter([
		{
			path: '/auth',
			element: authCtx.isLoggedIn ? (
				<Navigate replace to='/main' />
			) : (
				<WelcomePage />
			),
		},
		{
			path: '/main',
			element: authCtx.isLoggedIn ? (
				<Suspense fallback={<p>Loading...</p>}>
					<MainPage />
				</Suspense>
			) : (
				<Navigate replace to='/auth' />
			),
		},
		{
			path: '/main/:id',
			element: authCtx.isLoggedIn ? (
				<Suspense fallback={<p>Loading...</p>}>
					<CategoryBigCardPage />
				</Suspense>
			) : (
				<Navigate replace to='/auth' />
			),
		},
		{
			path: '/addNewTask',
			element: authCtx.isLoggedIn ? (
				<Suspense fallback={<p>Loading...</p>}>
					<AddNewTaskPage />
				</Suspense>
			) : (
				<Navigate replace to='/auth' />
			),
		},
		{
			path: '/addNewCategory',
			element: authCtx.isLoggedIn ? (
				<Suspense fallback={<p>Loading...</p>}>
					<AddNewCategoryPage />
				</Suspense>
			) : (
				<Navigate replace to='/auth' />
			),
		},
		{
			path: '/addColorsAndIcons',
			element: (
				<Suspense fallback={<p>Loading...</p>}>
					<AddColorsAndIconsPage />
				</Suspense>
			),
		},
		{
			path: '/*',
			element: <Navigate replace to='/auth' />,
		},
	]);

function App() {
	const authCtx = useContext(AuthContext);

	return <RouterProvider router={router(authCtx)} />;
}

export default App;
