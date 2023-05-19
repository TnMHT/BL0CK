import { ethers } from 'ethers';
import { ABI, CONTRACT_ADDRESS } from '../constants';
import { useState } from 'react';

const Fund = () => {
	// READ ONLY CONNECTION TO THE BLOCKCHAIN
	const [ethAmount, setEthAmount] = useState('0.00000007');
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
			// LISTEN FOR TRANSACTION TO BE MINED
			// HEY - WAIT FOR TRANSACTION TO FINISH
			await listenForTransactionMine(transactionResponse, provider);
			console.log('DONE.');
		} catch (err) {
			console.error(err);
		}
	};
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
			<button onClick={() => fundWallet()}>FUND</button>
			<label htmlFor='fund'>ETH AMOUNT</label>
			<input
				type='text'
				id='ethAmount'
				placeholder='.00000007'
				value={ethAmount}
				onChange={(e) => setEthAmount(e.target.value)}
			/>
		</>
	);
};

export default Fund;
