import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import 'hardhat-deploy';
import * as dotenv from 'dotenv';
dotenv.config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || '';
const PRIVATE_KEY = process.env.PRIVATE_KEY! || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY || '';

const config: HardhatUserConfig = {
	// solidity: '0.8.18',
	solidity: {
		compilers: [{ version: '0.6.6' }, { version: '0.8.18' }],
	},
	defaultNetwork: 'hardhat',
	networks: {
		sepolia: {
			url: SEPOLIA_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 11155111,
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
	gasReporter: {
		enabled: true,
		outputFile: 'gas-reporter.txt',
		noColors: true,
		currency: 'GBP',
		coinmarketcap: COINMARKET_API_KEY,
		token: 'ETH',
	},
	namedAccounts: {
		deployer: {
			default: 0,
		},
	},
};

export default config;
