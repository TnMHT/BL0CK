import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { network } from 'hardhat';
import { networkConfig } from '../helper.hardhat.config';

export const deployMock: DeployFunction = async (
	hre: HardhatRuntimeEnvironment
) => {
	const { getNamedAccounts, deployments, network } = hre;
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;

	const ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed'];

	const fundMe = await deploy('Fu ndMe', {
		from: deployer,
		args: [],
		log: true,
	});
};
