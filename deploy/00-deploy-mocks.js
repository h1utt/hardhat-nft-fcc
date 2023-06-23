const { developmentChains } = require("../helper-hardhat-config")

module.exports = async function (hre) {
    const { deployments, getNamedAccounts, network, ethers } = hre

    const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium. It costs 0.25 LINK per request
    const GAS_PRICE_LINK = 1e9 // 1000000000 // link per gas

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const { args } = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: [BASE_FEE, GAS_PRICE_LINK],
        })

        log("Mocks Deployed!")
        log("---------------------------------------")
    }
}
module.exports.tags = ["all", "mocks"]
