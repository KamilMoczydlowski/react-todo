import { useCallback, useEffect, useState } from 'react';

const useFetchedData = () => {
	const [fetchedCategories, setFetchedCategories] = useState([]);

	const fetchHandler = useCallback(async () => {
		try {
			const response = await fetch(
				'https://react-todo-f2603-default-rtdb.europe-west1.firebasedatabase.app/categories.json'
			);

			if (!response.ok) {
				throw new Response('failed to fetch data', { status: 500 });
			}

			const data = await response.json();

			const loadedCategories = [];

			const calcAllTasks = tasks => {
				let counter = 0;

				tasks.forEach(task => {
					counter++;
				});

				return counter;
			};

			const calcDoneTasks = tasks => {
				let counter = 0;

				tasks.forEach(task => {
					if (task.isDone === true) {
						counter++;
					}
				});

				return counter;
			};

			for (const key in data) {
				loadedCategories.push({
					key: key,
					id: key,
					color: data[key].color,
					icon: data[key].icon,
					tasks: data[key].tasks,
					tasksDone: calcDoneTasks(data[key].tasks),
					allTasks: calcAllTasks(data[key].tasks),
				});
			}

			setFetchedCategories(loadedCategories);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		fetchHandler();
	}, [fetchHandler]);

	return fetchedCategories;
};

export default useFetchedData;
