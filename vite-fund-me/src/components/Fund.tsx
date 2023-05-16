import { ethers } from 'ethers';
import { ABI, CONTRACT_ADDRESS } from '../constants';

const Fund = () => {
	// READ ONLY CONNECTION TO THE BLOCKCHAIN
	const ethAmount = '.00000007';
	const fundWallet = async () => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			// WRAPS ALL OPERATIONS TO INTERACT WITH ACCOUNT
			const signer = await provider.getSigner();
			console.log(signer);
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const transactionResponse = await contract.fund({
				value: ethers.parseEther(ethAmount.toString()),
			});
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<>
			<button onClick={() => fundWallet()}>FUND</button>
		</>
	);
};

export default Fund;
