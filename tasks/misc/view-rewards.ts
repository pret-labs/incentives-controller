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
        await localBRE.ethers.provider.send('evm_mine', []);

        const incentivesProxy = PullRewardsIncentivesController__factory
            .connect(proxy, signer);

        const res = await incentivesProxy.getRewardsBalance(
            [asset],
            user
        );

        console.log('reward is');
        console.log(res.toString());
    });
