import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ABI, CONTRACT_ADDRESS } from '../constants';

const Fund = (ethAmount: number) => {
	const [signer, setSigner] = useState<null | ethers.JsonRpcSigner>(null);

	useEffect(() => {
		const initializeSigner = async () => {
			const provider = new ethers.JsonRpcProvider();
			const signer = await provider.getSigner();
			setSigner(signer);
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const transactionResponse = await contract.fund({
				value: ethers.utils.parseEther(ethAmount),
			});
		};
		initializeSigner();
	}, []);

	const fundWallet = async () => {
		try {
			console.log('');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<button onClick={fundWallet}>FUND</button>
		</>
	);
};

export default Fund;
