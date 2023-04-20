import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-etherscan';
import * as dotenv from 'dotenv';
import { blockNumber } from './tasks/blockNumber';
import 'hardhat-gas-reporter';
dotenv.config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || '';
const PRIVATE_KEY = process.env.PRIVATE_KEY! || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY || '';

const config: HardhatUserConfig = {
	solidity: '0.8.18',
	defaultNetwork: 'hardhat',
	networks: {
		sepolia: {
			url: SEPOLIA_RPC_URL,
			accounts: [PRIVATE_KEY],
		},
		localhost: {
			url: 'http://127.0.0.1:8545/',
			chainId: 31337,
		},
	},
	etherscan: {
		// Your API key for Etherscan
		// Obtain one at https://etherscan.io/
		apiKey: ETHERSCAN_API_KEY,
	},
	tasks: {
		blockNumber,
	},
	gasReporter: {
		enabled: true,
		outputFile: 'gas-reporter.txt',
		noColors: true,
		currency: 'GBP',
		coinmarketcap: COINMARKET_API_KEY,
		token: 'ETH',
	},
};

export default config;
