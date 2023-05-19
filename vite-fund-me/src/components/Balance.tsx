import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../constants';
import Button from '@mui/joy/Button';

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
			<Button id='balanceButton' onClick={() => getBalance()}>
				GET BALANCE
			</Button>
		</>
	);
};
export default Balance;
