import { electrumServers } from './electrum/servers';
import { MAX_VERIFICATION } from '../constants/constants'
import Colors from '../../globals/colors'
import { coinsList } from './CoinsList'
import { DLIGHT_PRIVATE, ELECTRUM, ERC20, GENERAL, WYRE_SERVICE } from '../constants/intervalConstants';

import { ENABLE_VERUS_IDENTITIES } from '../../../env/index'

import CoinLogoIcons from '../../images/cryptologo/index'
import { ETHERS } from '../constants/web3Constants';
import { getDefaultSubWallets } from '../defaultSubWallets';
import {
  WALLET_APP_CONVERT,
  WALLET_APP_OVERVIEW,
  WALLET_APP_RECEIVE,
  WALLET_APP_SEND,
  WALLET_APP_MANAGE
} from "../constants/apps";

const getDefaultApps = (coinObj) => {
  const coinName = coinObj.display_name
  let subwallets = getDefaultSubWallets(coinObj)

  let data = [
    {
      screen: "Overview",
      icon: "format-list-bulleted",
      name: "Overview",
      key: WALLET_APP_OVERVIEW,
      color: Colors.primaryColor,
      //Verus Blue
    },
    {
      screen: "SendCoin",
      icon: "arrow-up",
      name: "Send",
      key: WALLET_APP_SEND,
      color: Colors.infoButtonColor,
      //Orange
    },
    {
      screen: "ReceiveCoin",
      icon: "arrow-down",
      name: "Receive",
      key: WALLET_APP_RECEIVE,
      color: Colors.verusGreenColor,
      //Green
    },
    {
      screen: "ConvertCoin",
      icon: "swap-horizontal-circle",
      name: "Convert",
      key: WALLET_APP_CONVERT,
      color: Colors.primaryColor,
    },
    {
      screen: "ManageCoin",
      icon: "bank-transfer",
      name: "Manage",
      key: WALLET_APP_MANAGE,
      color: Colors.primaryColor
    }
  ];

  return {
    default_app: "wallet",
    apps: {
      wallet: {
        title: coinName + " Wallet",
        data: data.filter((app) => {
          for (const subwallet of subwallets) {
            if (subwallet.compatible_apps.includes(app.key)) return true;
          }

          return false;
        }),
      },
    },
  };
}

const identityApp = {
  identity: {
    title: 'Identity App',
    data: [
      {
        screen: 'Home',
        icon: 'account-balance-wallet',
        name: 'Identity',
        key: 'Home',
        color: Colors.primaryColor
        //Verus Blue
      },
      {
        screen: 'Home',
        icon: 'account-balance-wallet',
        name: 'Personal Information',
        key: 'Personal information',
        color: Colors.primaryColor
      },
    ]
  }
}

export const explorers = {
  KMD: 'https://kmdexplorer.io',
  OOT: 'https://explorer.utrum.io',
  VRSC: 'https://explorer.veruscoin.io',
  ETH: 'https://etherscan.io',
  RFOX: 'https://etherscan.io',
  BAT: 'https://etherscan.io',
  DAI: 'https://etherscan.io',
  DAIW: 'https://etherscan.io',
  BAL: 'https://etherscan.io',
  BNT: 'https://etherscan.io',
  HOT: 'https://etherscan.io',
  LINK: 'https://etherscan.io',
  NEXO: 'https://etherscan.io',
  UNI: 'https://etherscan.io',
  VEN: 'https://etherscan.io',
  YFI: 'https://etherscan.io',
  ZRX: 'https://etherscan.io',
  TST: 'https://ropsten.etherscan.io',
  BTC: 'https://www.blockchain.com/btc',
  DOGE: 'https://dogeblocks.com/'
}

export const CoinLogos = {
  // btc protocol
  bch: CoinLogoIcons.btc.BCH,
  vrsc: CoinLogoIcons.btc.VRSC,
  dash: CoinLogoIcons.btc.DASH,
  oot: CoinLogoIcons.btc.OOT,
  btc: CoinLogoIcons.btc.BTC,
  testnet: CoinLogoIcons.btc.BTC,
  dgb: CoinLogoIcons.btc.DGB,
  doge: CoinLogoIcons.btc.DOGE,
  kmd: CoinLogoIcons.btc.KMD,
  zec: CoinLogoIcons.btc.ZEC,
  zectest: CoinLogoIcons.btc.ZECTEST,
  zilla: CoinLogoIcons.btc.ZILLA,
  ltc: CoinLogoIcons.btc.LTC,
  ccl: CoinLogoIcons.btc.CCL,

  // web3 protocol
  bat: CoinLogoIcons.web3.BAT,
  tst: CoinLogoIcons.web3.ETH,
  dai: CoinLogoIcons.web3.DAI,
  daiwyre: CoinLogoIcons.web3.DAI,
  eth: CoinLogoIcons.web3.ETH,
  bal: CoinLogoIcons.web3.BAL,
  bnt: CoinLogoIcons.web3.BNT,
  hot: CoinLogoIcons.web3.HOT,
  link: CoinLogoIcons.web3.LINK,
  nexo: CoinLogoIcons.web3.NEXO,
  uni: CoinLogoIcons.web3.UNI,
  ven: CoinLogoIcons.web3.VEN,
  yfi: CoinLogoIcons.web3.YFI,
  zrx: CoinLogoIcons.web3.ZRX,
  rfox: CoinLogoIcons.web3.RFOX,
  usdt: CoinLogoIcons.web3.USDT,
  usdc: CoinLogoIcons.web3.USDC,
  usdtwyre: CoinLogoIcons.web3.USDT,
  usdcwyre: CoinLogoIcons.web3.USDC,
  aave: CoinLogoIcons.web3.AAVE,
  crv: CoinLogoIcons.web3.CRV,
  sushi: CoinLogoIcons.web3.SUSHI,
  mkr: CoinLogoIcons.web3.MKR,
  wbtc: CoinLogoIcons.web3.WBTC,

  // fiat "protocol"
  usd: CoinLogoIcons.fiat.USD,
  aud: CoinLogoIcons.fiat.AUD,
  eur: CoinLogoIcons.fiat.EUR,
  chf: CoinLogoIcons.fiat.CHF,
  mxn: CoinLogoIcons.fiat.MXN,
  clp: CoinLogoIcons.fiat.CLP,
  zar: CoinLogoIcons.fiat.ZAR,
  vnd: CoinLogoIcons.fiat.VND,
  ils: CoinLogoIcons.fiat.ILS,
  hkd: CoinLogoIcons.fiat.HKD,
  dkk: CoinLogoIcons.fiat.DKK,
  cad: CoinLogoIcons.fiat.CAD,
  myr: CoinLogoIcons.fiat.MYR,
  nok: CoinLogoIcons.fiat.NOK,
  czk: CoinLogoIcons.fiat.CZK,
  sek: CoinLogoIcons.fiat.SEK,
  ars: CoinLogoIcons.fiat.ARS,
  inr: CoinLogoIcons.fiat.INR,
  thb: CoinLogoIcons.fiat.THB,
  krw: CoinLogoIcons.fiat.KRW,
  jpy: CoinLogoIcons.fiat.JPY,
  pln: CoinLogoIcons.fiat.PLN,
  gbp: CoinLogoIcons.fiat.GBP,
  php: CoinLogoIcons.fiat.PHP,
  isk: CoinLogoIcons.fiat.ISK,
  cop: CoinLogoIcons.fiat.COP,
  sgd: CoinLogoIcons.fiat.SGD,
  nzd: CoinLogoIcons.fiat.NZD,
  brl: CoinLogoIcons.fiat.BRL,
};

//To make flatlist render faster we make these lists here, once
export const fullCoinList = Object.values(coinsList).map(function(coin) {
  return coin.id;
});

export const supportedCoinList = fullCoinList.filter(x => x !== 'OOT' && x !== 'ZILLA' && x !== 'RFOX');

export const disabledNameList = supportedCoinList.filter(x => {
  return coinsList[x.toLowerCase()].compatible_channels.includes(WYRE_SERVICE);
});

export const enabledNameList = supportedCoinList.filter(
  x => !disabledNameList.includes(x),
);

export const coinExistsInWallet = (coinTicker) => {
  let index = 0;

  while (index < fullCoinList.length && fullCoinList[index] !== coinTicker) {
    index++;
  }

  if (index < fullCoinList.length) {
    return true;
  } else {
    return false;
  }
};

export const getCoinFromActiveCoins = (coinTicker, activeCoinsForUser) => {
  let index = 0;

  while (
    index < activeCoinsForUser.length &&
    activeCoinsForUser[index].id !== coinTicker
  ) {
    index++;
  }

  if (index < fullCoinList.length) {
    return activeCoinsForUser[index];
  } else {
    return false;
  }
};

export const findCurrencyByImportId = (importObj) => {
  const allCoins = Object.values(coinsList)

  const coinObj = allCoins.find(coin => {
    return (
      coin.system_id === importObj.system_id &&
      coin.currency_id === importObj.currency_id
    );
  })

  return coinObj
}

export const getCoinIdFromSystemId = (systemId) => {
  switch (systemId) {
    case "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV":
      return "VRSC"
    default:
      throw new Error("Could not find coin for system id " + systemId)
  }
}

export const findCoinObj = (key, userName, useSystemId = false) => {
  const id = useSystemId ? getCoinIdFromSystemId(key) : key;
  let coinObj = coinsList[id.toLowerCase()]

  if (coinObj) {
    coinObj.electrum_endpoints = coinObj.compatible_channels.includes(ELECTRUM) ? electrumServers[id.toLowerCase()].serverList : []
    coinObj.users = userName != null ? [userName] : [];
    
    if (!coinObj.compatible_channels.includes(DLIGHT_PRIVATE)) {
      coinObj.overrideCoinSettings = {
        privateAddrs: 0
      }
    }
    
    if (!coinObj.apps || Object.keys(coinObj.apps).length === 0) {
      const DEFAULT_APPS = getDefaultApps(coinObj)
      
      if (ENABLE_VERUS_IDENTITIES && (coinObj.id === 'VRSC' || coinObj.id === 'ZECTEST')) {
        coinObj.apps = {...identityApp, ...DEFAULT_APPS.apps};
      } else {
        coinObj.apps = DEFAULT_APPS.apps;
      }
      if (!coinObj.default_app) coinObj.default_app = DEFAULT_APPS.default_app
    } else if (!coinObj.default_app) {
      coinObj.default_app = Object.keys(coinObj.apps)[0]
    }
  }
  else {
    throw new Error(id + " not found in coin list!")
  }

  return coinObj;
}

export const getCoinObj = (coinList, coinId) => {
  return coinList.find(coinObj => {
    return coinObj.id === coinId
  })
}

export const getCoinLogo = (id) => {
  const idLc = id.toLowerCase()
  
  if (coinsList[idLc]) return CoinLogos[idLc]
  else return null
}