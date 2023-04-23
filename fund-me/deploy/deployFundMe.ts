import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { network } from 'hardhat';
import { developmentChains, networkConfig } from '../helper.hardhat.config';
import { verify } from '../utils/verify';

const deployFundMe: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
	const { getNamedAccounts, deployments, network } = hre;
	const { deploy, log, get } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId: number = network.config.chainId!;

	let ethUsdPriceFeedAddress;
	if (developmentChains.includes(network.name)) {
		const ethUsdAggregator = await get('MockV3Aggregator');
		ethUsdPriceFeedAddress = ethUsdAggregator.address;
	} else {
		ethUsdPriceFeedAddress = networkConfig[network.name].ethUsdPriceFeed!
	}
	const args = [ethUsdPriceFeedAddress];
	const fundMe = await deploy('FundMe', {
		from: deployer,
		args: args,
		log: true,
		waitConfirmations:6 , 
	});

	if (
		!developmentChains.includes(network.name) &&
		process.env.ETHERSCAN_API_KEY
	) {
		await verify(fundMe.address, args );
	}

	log('----------------------------------------------------------------');
};
export default deployFundMe;
module.exports.tags = ['all', 'fundme'];
