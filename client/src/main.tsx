import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</RecoilRoot>
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
