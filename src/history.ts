import { createBrowserHistory, createMemoryHistory } from 'history';

const history = process.env.SSR ? createMemoryHistory() : createBrowserHistory();

export default history;
