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
  .setAction(
    async ({ token, }, localBRE) => {
      await localBRE.run('set-DRE');
      const deployer = await getFirstSigner();
      const proxyAdmin = await (await getSigner(1)).getAddress();
      const emissionManager = deployer.address;


      const incentivesControllerImpl = await deployPullRewardsIncentivesController(
        [token, emissionManager],
        false
      );

      const proxy = InitializableAdminUpgradeabilityProxy__factory.connect(
          '0x2765849c86659Ad03c7f80c37395043c327aE383',
          await getSigner(1), 
      );

      await waitForTx(
          await proxy.upgradeTo(incentivesControllerImpl.address)
      );
      console.log(`upgraded.`);
    }
  );
