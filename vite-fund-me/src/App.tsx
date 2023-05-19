import './App.css';
import { ethers } from 'ethers';
import Balance from './components/Balance';
import Connect from './components/Connect';
import Withdraw from './components/Withdraw';
import Fund from './components/Fund';

const App = () => {
	const listenForTransactionMine = (
		transactionResponse: { hash: any },
		provider: ethers.BrowserProvider
	) => {
		console.log(`MINING ${transactionResponse.hash}....`);
		// CREATE A LISTENER FOR THE BLOCKCHAIN
		return new Promise<void>((resolve, reject) => {
			provider.once(transactionResponse.hash, (transactionReceipt) => {
				console.log(
					`COMPLETED WITH ${transactionReceipt.confirmations} CONFIRMATIONS `
				);
				resolve();
			});
		});
	};

	return (
		<>
			<Connect />
			<Fund listenForTransactionMine={listenForTransactionMine} />
			<Withdraw listenForTransactionMine={listenForTransactionMine} />
			<Balance />
		</>
	);
};

export default App;
