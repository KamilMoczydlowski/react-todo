import { useCallback } from 'react';

const useHttp = () => {
	const getData = useCallback(async (requestConfig, applyData) => {
		try {
			const response = await fetch(
                requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : 'GET',
				headers: requestConfig.headers ? requestConfig.headers : {},
				body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Could not fetch data.');
			}

            applyData(data)
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	return getData;
};

export default useHttp;
