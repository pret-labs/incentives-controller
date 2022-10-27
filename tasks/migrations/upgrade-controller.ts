import { isAddress } from 'ethers/lib/utils';
import { task } from 'hardhat/config';
import { ZERO_ADDRESS } from '../../helpers/constants';
import {
  deployPullRewardsIncentivesController,
  deployInitializableAdminUpgradeabilityProxy,
} from '../../helpers/contracts-accessors';
import { getFirstSigner, getSigner } from '../../helpers/contracts-helpers';
import { waitForTx } from '../../helpers/misc-utils';
import { InitializableAdminUpgradeabilityProxy__factory } from '../../types';

task(
  `dev:upgrade`,
  `Deploy and initializes the PullRewardsIncentivesController contract`
)
  .addParam('token')
  .addParam('proxy')
  .setAction(
    async ({ token, proxy, }, localBRE) => {
      await localBRE.run('set-DRE');
      const deployer = await getFirstSigner();
      const proxyAdmin = await (await getSigner(1)).getAddress();
      const emissionManager = deployer.address;


      const incentivesControllerImpl = await deployPullRewardsIncentivesController(
        [token, emissionManager],
        false
      );

      const proxyContract = InitializableAdminUpgradeabilityProxy__factory.connect(
          proxy,
          await getSigner(1), 
      );

      await waitForTx(
          await proxyContract.upgradeTo(incentivesControllerImpl.address)
      );
      console.log(`upgraded.`);
    }
  );
