import './App.css';
import Balance from './components/Balance';
import Connect from './components/Connect';
import Fund from './components/Fund';

const App = () => {
	return (
		<>
			<Connect />
			<Fund />
			<Balance />
		</>
	);
};

export default App;
