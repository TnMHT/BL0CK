import './App.css';
import Connect from './components/Connect';
import Fund from './components/Fund';

const App = () => {
	return (
		<>
			<Connect />
			<Fund ethAmount={77} />
		</>
	);
};

export default App;
