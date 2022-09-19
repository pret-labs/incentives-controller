import { task } from 'hardhat/config';
import { getFirstSigner } from '../../helpers/contracts-helpers';
import { PullRewardsIncentivesController__factory } from '../../types';

task('rewards', 'Review rewards')
    .addParam('proxy', 'controller proxy address')
    .addParam('asset', 'query asset address')
    .addParam('user', 'query user address')
    .setAction(async ({ proxy, user, asset }, localBRE) => {
        await localBRE.run('set-DRE');
        const signer = await getFirstSigner();

        // increase timestamp by 1 sec
        // await localBRE.ethers.provider.send('evm_increaseTime', [1]);
        // await localBRE.ethers.provider.send('evm_mine', []);

        const incentivesProxy = PullRewardsIncentivesController__factory
            .connect(proxy, signer);

        const token = await incentivesProxy.REWARD_TOKEN();

        const totalRewards = await incentivesProxy.getRewardsBalance(
            [asset],
            user
        );
        const claimableRewards = await incentivesProxy.getCurrentClaimableBalance(
            [asset],
            user
        );

        console.log('reward token is');
        console.log(token);
        console.log('total reward is');
        console.log(totalRewards.toString());
        console.log('current claimable reward is');
        console.log(claimableRewards.toString());

        const assetData = await incentivesProxy.getAssetData(asset);
        console.log('assetData');
        console.log(assetData.map(d => d.toBigInt()));
    });
