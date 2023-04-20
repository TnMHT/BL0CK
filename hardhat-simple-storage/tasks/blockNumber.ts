import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

export const blockNumber = task(
	'block-number',
	'Print the current block number'
).setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
	const blockNumber = await hre.ethers.provider.getBlockNumber();
	console.log(`BLOCK NUMBER ${blockNumber}`);
});
