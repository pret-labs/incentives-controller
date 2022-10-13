  import { task } from 'hardhat/config';
import { getFirstSigner } from '../../helpers/contracts-helpers';
import { waitForTx } from '../../helpers/misc-utils';
import { PullRewardsIncentivesController__factory } from '../../types';

  // total amount of rewards that each incentives controller would distribute
  const totalRewards = ['100000000000000000000000', '20000000000000000000000'];

  // rewards duration in days
  const durationInDays = [20, 20];

  const assetConfigs = {
    WNEAR: {
      aToken: '0xE964aC8d20010762954d874cAD376a36c818024e',
      vToken: '0x76483560FED67C531caC0F736E9d73C6f64E7653',
      aTokenEPS: ['11574074074074100', '925925925925926'],
      vTokenEPS: ['5787037037037040', '462962962962963']
    },
    LINEAR: {
      aToken: '0x66fFA568f14603512240605402947AE915dd671a',
      vToken: '0x7AD2F15dEdfb112F3D49564BbB14d363B388fE34',
      aTokenEPS: ['17361111111111100', '1388888888888890'],
      vTokenEPS: ['0', '0']
    },
    // WETH: {
    //   aToken: '0x44840c7a7d5Fa806bE2429F42F3C683FAfdCa7ff',
    //   vToken: '0x1db13f2465389f4d340eCEb0351e957202187381',
    //   aTokenEPS: ['1446759259259260000000', '11574074074074100000000'],
    //   vTokenEPS: ['192901234567901000000', '11574074074074100000000']
    // },
    USDC: {
      aToken: '0xae9A4Bf674987E13a36aBF7a9525151fF5E4213e',
      vToken: '0x661D98cCe61422Cf1F039a6e25E6a96DC32233c7',
      aTokenEPS: ['5787037037037040', '462962962962963'],
      vTokenEPS: ['5787037037037040', '462962962962963']
    },
    USDT: {
      aToken: '0x6BC4D40347dEC5AF9cD19562C3a5Ee5a699a36cD',
      vToken: '0x70aEd57801bc79C1341299645F5e8124A4BfdD90',
      aTokenEPS: ['5787037037037040', '462962962962963'],
      vTokenEPS: ['5787037037037040', '462962962962963']
    },
    // DAI: {
    //   aToken: '0xd85E6F93Ea0feA6ee0d8Afe2c03645b723e7e6EA',
    //   vToken: '0x19E3465646FC5f9F18158B30e90a5cf0167ea758',
    //   aTokenEPS: ['482253086419753000000', '11574074074074100000000'],
    //   vTokenEPS: ['482253086419753000000', '11574074074074100000000']
    // },
    // WBTC: {
    //   aToken: '0xAd0EC8806224337A4ce906bA203B6344c15e6def',
    //   vToken: '0xaee214895cbc9eab00024DDE06f86E7440E93a91',
    //   aTokenEPS: ['241126543209877000000', '5787037037037000000000'],
    //   vTokenEPS: ['48225308641975300000', '5787037037037000000000']
    // },
  };

  task(
    `config-assets`,
    `Config the PullRewardsIncentivesController contract`
  )
    .addParam('proxy')
    .addParam('index')
    .setAction(
      async ({ proxy, index }, localBRE) => {
        await localBRE.run('set-DRE');
        const deployer = await getFirstSigner();

        const incentivesProxy = PullRewardsIncentivesController__factory
          .connect(proxy, deployer);

        // config assets
        for (const assetSymbol of Object.keys(assetConfigs)) {
          const config = assetConfigs[assetSymbol];
          const { aToken, vToken, aTokenEPS, vTokenEPS } = config;

          const assets = [
            aToken,
            vToken
          ];
          const assetsEps = [
            aTokenEPS[index],
            vTokenEPS[index]
          ];
          await waitForTx(
            await incentivesProxy.configureAssets(
              assets,
              assetsEps
            )
          );

          console.log(`${assetSymbol} configured.`)
        }

        // TODO make it configurable
        const distributionEnd = Math.floor(Date.now() / 1000) + (durationInDays[index] * 24 * 3600); 
        await waitForTx(
          await incentivesProxy.setDistributionEnd(distributionEnd)
        );
        console.log(`Distribution end set to ${distributionEnd}`);

        await waitForTx(
          await incentivesProxy.setTotalRewards(totalRewards[index])
        );
        console.log(`Total reward token amount set to ${totalRewards[index]}`);
      }
    );
