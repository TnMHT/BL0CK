import { ethers } from 'ethers';
import { ABI, CONTRACT_ADDRESS } from '../constants';
import { useState } from 'react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';

interface FundProps {
	listenForTransactionMine: (
		transactionResponse: { hash: any },
		provider: ethers.BrowserProvider
	) => Promise<void>;
}

const Fund: React.FC<FundProps> = ({ listenForTransactionMine }) => {
	// READ ONLY CONNECTION TO THE BLOCKCHAIN
	const [ethData, setEthData] = useState<{
		amount: string;
		status: 'initial' | 'loading' | 'failure' | 'sent';
	}>({
		amount: '0.00000007',
		status: 'initial',
	});
	const fundWallet = async () => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			// WRAPS ALL OPERATIONS TO INTERACT WITH ACCOUNT
			const signer = await provider.getSigner();
			console.log(signer);
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const transactionResponse = await contract.fund({
				value: ethers.parseEther(ethData.amount.toString()),
			});
			// LISTEN FOR TRANSACTION TO BE MINED
			// HEY - WAIT FOR TRANSACTION TO FINISH
			await listenForTransactionMine(transactionResponse, provider);
			console.log('DONE.');
		} catch (err) {
			console.error(err);
		}
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setEthData((current) => ({ ...current, status: 'loading' }));
		try {
			setTimeout(() => {
				setEthData({ amount: '0.00000007', status: 'sent' });
				fundWallet();
			}, 1500);
		} catch (error) {
			setEthData((current) => ({ ...current, status: 'failure' }));
		}
	};

	return (
		<form onSubmit={handleSubmit} id='fundForm'>
			<FormControl>
				<FormLabel
					htmlFor='fund'
					sx={(theme) => ({
						'--FormLabel-color': theme.vars.palette.primary.plainColor,
					})}
				>
					ETH AMOUNT
				</FormLabel>

				<Input
					color='primary'
					disabled={false}
					required
					variant='outlined'
					id='ethAmount'
					placeholder='Enter an ETH amount..'
					value={ethData.amount}
					onChange={(e) =>
						setEthData({ amount: e.target.value, status: 'initial' })
					}
					error={ethData.status === 'failure'}
					defaultValue='Oh no, error found!'
					endDecorator={
						<Button variant='solid' color='primary' type='submit'>
							FUND
						</Button>
					}
				/>
				{ethData.status === 'failure' && (
					<FormHelperText
						sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
					>
						Oops! something went wrong, please try again later.
					</FormHelperText>
				)}
				{ethData.status === 'sent' && (
					<FormHelperText
						sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
					>
						You are all set!
					</FormHelperText>
				)}
			</FormControl>
		</form>
	);
};

export default Fund;
