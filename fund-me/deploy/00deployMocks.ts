import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { DECIMALS, INITIAL_PRICE } from '../helper.hardhat.config';

export const deployMocks: DeployFunction = async (
	hre: HardhatRuntimeEnvironment
) => {
	const { deployments, getNamedAccounts, network } = hre;
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;

	if (chainId == 31337) {
		log('LOCAL NETWORK DETECTED. DEPLOY MOCKS!');
		await deploy('MockV3Aggregator', {
			contract: 'MockV3Aggregator',
			from: deployer,
			log: true,
			args: [DECIMALS, INITIAL_PRICE],
		});
		log('MOCKS DEPLOYED.');
		log('----------------------------------------------------------------');
	}
};
export default deployMocks;
deployMocks.tags = ['all', 'mocks'];
