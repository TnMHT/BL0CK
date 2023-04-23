import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { network } from 'hardhat';
import { developmentChains, networkConfig } from '../helper.hardhat.config';

const deployFundMe: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
	const { getNamedAccounts, deployments, network } = hre;
	const { deploy, log, get } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;

	let ethUsdPriceFeedAddress;
	if (developmentChains.includes(network.name)) {
		const ethUsdAggregator = await get('MockV3Aggregator');
		ethUsdPriceFeedAddress = ethUsdAggregator.address;
	} else {
		ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed'];
	}

	const fundMe = await deploy('FundMe', {
		from: deployer,
		args: [ethUsdPriceFeedAddress],
		log: true,
	});

	log('----------------------------------------------------------------');
};
export default deployFundMe;
module.exports.tags = ['all', 'fundme'];
