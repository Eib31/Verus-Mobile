import BigNumber from 'bignumber.js';
import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { Avatar, Card, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { CoinLogos } from '../../../utils/CoinData/CoinData';
import { USD } from '../../../utils/constants/currencies';
import { GENERAL } from '../../../utils/constants/intervalConstants';
import { truncateDecimal } from '../../../utils/math';
import { formatCurrency } from "react-native-format-currency";
import SubWalletsLogo from '../../../images/customIcons/SubWallets.svg'
import { extractDisplaySubWallets } from '../../../utils/subwallet/extractSubWallets';

const CurrencyWidget = props => {
  const { currencyBalance, coinObj } = props;
  const { width } = Dimensions.get('window');

  const coinIdLc = coinObj.id.toLowerCase();
  const Logo = CoinLogos[coinIdLc] ? CoinLogos[coinIdLc].light : null;
  const themeColor = coinObj.theme_color ? coinObj.theme_color : '#1C1C1C'
  
  const allSubwallets = useSelector(state => extractDisplaySubWallets(state))
  const displayCurrency = useSelector(state =>
    state.settings.generalWalletSettings.displayCurrency
      ? state.settings.generalWalletSettings.displayCurrency
      : USD,
  );

  const uniRate = useSelector(state =>
    state.ledger.rates[GENERAL] && state.ledger.rates[GENERAL][coinObj.id]
      ? state.ledger.rates[GENERAL][coinObj.id][displayCurrency]
      : null,
  );

  const [uniValueDisplay, setUniValueDisplay] = useState("-");
  
  // Recalculate fiat value
  useEffect(() => {
    if (uniRate != null && currencyBalance != null && displayCurrency != null) {
      const price = BigNumber(uniRate);

      const displayValueRaw = Number((BigNumber(currencyBalance).multipliedBy(price)).toFixed(2));

      const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
        formatCurrency({amount: displayValueRaw, code: displayCurrency});

      setUniValueDisplay(valueFormattedWithSymbol)
    }
  }, [currencyBalance, uniRate, displayCurrency]);

  const displayedName = coinObj.display_name.length > 8 ? coinObj.display_ticker : coinObj.display_name

  return (
    <Card
      style={{
        height: 110,
        width: width / 2 - 16,
        borderRadius: 10,
        backgroundColor: themeColor,
      }}
      mode="elevated"
      elevation={5}>
      <Card.Content>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: "visible"
            }}>
            {Logo == null ? (
              <Avatar.Icon
                icon="wallet"
                color={themeColor}
                style={{backgroundColor: 'white'}}
                size={26}
              />
            ) : (
              <Logo
                style={{
                  alignSelf: 'center',
                }}
                width={26}
                height={26}
              />
            )}
            <Paragraph
              style={{fontSize: 16, marginLeft: 8, fontWeight: 'bold', maxWidth: 100}}
              numberOfLines={1}>
              {displayedName}
            </Paragraph>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: -10,
              marginTop: -12
            }}>
            <Paragraph style={{fontSize: 12}}>
              {allSubwallets[coinObj.display_ticker]
                ? allSubwallets[coinObj.display_ticker].length
                : 0}
            </Paragraph>
            <SubWalletsLogo />
          </View>
        </View>
        <Paragraph style={{ fontSize: 16, paddingTop: 8, fontWeight: "500" }}>
          {uniValueDisplay === '-' ? `${currencyBalance == null ? '-' : truncateDecimal(currencyBalance, 8)} ${
              coinObj.display_ticker
            }` : uniValueDisplay}
        </Paragraph>
        <Paragraph style={{ fontSize: 12 }}>
          {
            uniValueDisplay === '-' ? uniValueDisplay : `${currencyBalance == null ? '-' : truncateDecimal(currencyBalance, 8)} ${
              coinObj.display_ticker
            }`
          }
        </Paragraph>
      </Card.Content>
    </Card>
  );
};



export default CurrencyWidget;