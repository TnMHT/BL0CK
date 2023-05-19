import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../constants';

const Balance = () => {
	const getBalance = async () => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const balance = await provider.getBalance(CONTRACT_ADDRESS);
			console.log(ethers.formatEther(balance));
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<>
			<button id='balanceButton' onClick={() => getBalance()}>
				GET BALANCE
			</button>
		</>
	);
};
export default Balance;
