import './App.css';
import { ethers } from 'ethers';
import Balance from './components/Balance';
import Connect from './components/Connect';
import Withdraw from './components/Withdraw';
import Fund from './components/Fund';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';

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
			<Typography color='primary' level='h1' fontSize='md' sx={{ mb: 1.5 }}>
				ETH WIDGET
			</Typography>
			<Card variant='outlined' sx={{ width: 320 }}>
				<Stack
					spacing={{ xs: 1, sm: 2 }}
					direction='row'
					useFlexGap
					flexWrap='wrap'
				>
					<Connect />
					<Balance />
					<Fund listenForTransactionMine={listenForTransactionMine} />
					<Grid xs='auto' direction='row' justifyContent='space-between'>
						<Withdraw listenForTransactionMine={listenForTransactionMine} />
					</Grid>
				</Stack>
			</Card>
		</>
	);
};

export default App;
