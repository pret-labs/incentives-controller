import BigNumber from 'bignumber.js';

export interface SymbolMap<T> {
  [symbol: string]: T;
}

export type eNetwork = eEthereumNetwork | ePolygonNetwork | eXDaiNetwork | eAvalancheNetwork | eAuroraNetwork;

export enum eContractid {
  DistributionManager = 'DistributionManager',
  AaveIncentivesController = 'AaveIncentivesController',
  MintableErc20 = 'MintableErc20',
  ATokenMock = 'ATokenMock',
  IERC20Detailed = 'IERC20Detailed',
  StakedTokenIncentivesController = 'StakedTokenIncentivesController',
  MockSelfDestruct = 'MockSelfDestruct',
  StakedAaveV3 = 'StakedAaveV3',
  PullRewardsIncentivesController = 'PullRewardsIncentivesController',
}

export enum eEthereumNetwork {
  buidlerevm = 'buidlerevm',
  kovan = 'kovan',
  ropsten = 'ropsten',
  main = 'main',
  coverage = 'coverage',
  hardhat = 'hardhat',
  tenderlyMain = 'tenderlyMain',
}

export enum ePolygonNetwork {
  matic = 'matic',
  mumbai = 'mumbai',
}

export enum eAuroraNetwork {
  aurora = 'aurora'
}

export enum eXDaiNetwork {
  xdai = 'xdai',
}

export enum eAvalancheNetwork {
  fuji = 'fuji',
  avalanche = 'avalanche',
}

export enum EthereumNetworkNames {
  kovan = 'kovan',
  ropsten = 'ropsten',
  main = 'main',
  matic = 'matic',
  mumbai = 'mumbai',
  xdai = 'xdai',
}

export type iParamsPerNetwork<T> =
  | iEthereumParamsPerNetwork<T>
  | iPolygonParamsPerNetwork<T>
  | iXDaiParamsPerNetwork<T>
  | iAuroraParamsPerNetwork<T>
  | iAvalancheParamsPerNetwork<T>;

export interface iEthereumParamsPerNetwork<T> {
  [eEthereumNetwork.coverage]: T;
  [eEthereumNetwork.buidlerevm]: T;
  [eEthereumNetwork.kovan]: T;
  [eEthereumNetwork.ropsten]: T;
  [eEthereumNetwork.main]: T;
  [eEthereumNetwork.hardhat]: T;
  [eEthereumNetwork.tenderlyMain]: T;
}

export interface iPolygonParamsPerNetwork<T> {
  [ePolygonNetwork.matic]: T;
  [ePolygonNetwork.mumbai]: T;
}

export interface iXDaiParamsPerNetwork<T> {
  [eXDaiNetwork.xdai]: T;
}

export interface iAuroraParamsPerNetwork<T> {
  [eAuroraNetwork.aurora]: T;
}

export interface iAvalancheParamsPerNetwork<T> {
  [eAvalancheNetwork.fuji]: T;
  [eAvalancheNetwork.avalanche]: T;
}

export type tEthereumAddress = string;
export type tStringTokenBigUnits = string; // 1 ETH, or 10e6 USDC or 10e18 DAI
export type tBigNumberTokenBigUnits = BigNumber;
export type tStringTokenSmallUnits = string; // 1 wei, or 1 basic unit of USDC, or 1 basic unit of DAI
export type tBigNumberTokenSmallUnits = BigNumber;
