import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

const Connect = () => {
	const [hasProvider, setHasProvider] = useState<boolean | null>(null);
	const initialState = { accounts: [] };
	const [wallet, setWallet] = useState(initialState);

	useEffect(() => {
		const getProvider = async () => {
			const provider = await detectEthereumProvider({ silent: true });
			console.log(provider);
			setHasProvider(Boolean(provider));
		};
		getProvider();
	}, []);

	const connectWallet = async () => {
		try {
			let accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
				params: [],
			});
			setWallet({ accounts });
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<>
			{!hasProvider ? (
				<>METAMASK NOT DETECTED</>
			) : hasProvider ? (
				<button onClick={connectWallet}>Connect MetaMask</button>
			) : (
				<>NOT CONNECTED</>
			)}
			{hasProvider && wallet.accounts.length > 0 && (
				<div>Wallet Accounts : {wallet.accounts[0]}</div>
			)}
		</>
	);
};
export default Connect;
