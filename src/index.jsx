import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import DataProvider from './store/DataProvider';
import AuthProvider from './store/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<DataProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</DataProvider>
	</React.StrictMode>
);
