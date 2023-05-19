import { ethers } from 'ethers';
import { ABI, CONTRACT_ADDRESS } from '../constants';

interface WithdrawProps {
	listenForTransactionMine: (
		transactionResponse: { hash: any },
		provider: ethers.BrowserProvider
	) => Promise<void>;
}

const Withdraw: React.FC<WithdrawProps> = ({ listenForTransactionMine }) => {
	const goWithdraw = async () => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			// WRAPS ALL OPERATIONS TO INTERACT WITH ACCOUNT
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const transactionResponse = await contract.withdraw();
			await listenForTransactionMine(transactionResponse, provider);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<>
			<button id='balanceButton' onClick={() => goWithdraw()}>
				WITHDRAW
			</button>
		</>
	);
};
export default Withdraw;
