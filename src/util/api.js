export async function getCategories() {
	const response = await fetch(
		'https://react-todo-f2603-default-rtdb.europe-west1.firebasedatabase.app/categories.json'
	);

	if (!response.ok) {
		throw new Response('failed to fetch data', { status: 500 });
	}

	return response.json();
}
