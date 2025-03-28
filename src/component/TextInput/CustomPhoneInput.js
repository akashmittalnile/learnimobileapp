import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CountryPicker from 'react-native-country-picker-modal';
import {Colors} from '../../global';
import ArrowDown from 'assets/images/arrow-down.svg';
import {USMobileNumberFormatHandler} from '../../global/Methos';

const CustomPhoneInput = ({
  placeholder,
  style,
  cca2,
  callingCode,
  number,
  onSelectCountryCode,
  onChangeNumber,
  maxLength,
  numberFieldContainerStyle,
}) => {
  const [showCountryModal, setShowCountryModal] = useState(false);

  const countryModalHandler = () => {
    setShowCountryModal(value => !value);
  };

  const countryCodeHandler = value => {
    onSelectCountryCode && onSelectCountryCode(value);
    setShowCountryModal(false);
  };

  const onChangeTextHandler = value => {
    onChangeNumber && onChangeNumber(value);
  };
console.log({cca2})
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.countryCode]}>
        <TouchableOpacity style={styles.touch} onPress={countryModalHandler}>
          <CountryPicker
            visible={showCountryModal}
            countryCode={cca2 ? cca2 : 'US'}
            withFlag
            withCallingCode
            withFilter
            onSelect={countryCodeHandler}
            containerButtonStyle={styles.countryPicker}
            onClose={() => {
              setShowCountryModal(false);
            }}
          />
          <Text style = {{color:'black'}}>+{callingCode ? callingCode : '1'}</Text>
          <ArrowDown />
        </TouchableOpacity>
      </View>
      <View style={[styles.input, numberFieldContainerStyle]}>
        <TextInput
          value={USMobileNumberFormatHandler(number)}
          onChangeText={onChangeTextHandler}
          placeholder={placeholder}
          placeholderTextColor="#8F93A0"
          maxLength={4 + maxLength}
          style={{...styles.textInput}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: responsiveHeight(7),
    width: '100%',
    backgroundColor: 'white',
  },
  countryCode: {
    height: '100%',
    maxWidth: '33%',
    backgroundColor: 'white',
    shadowColor: Colors.LIGHT_PURPLE,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    borderColor: Colors.LIGHT_PURPLE,
    borderWidth: responsiveWidth(0.23),
    borderRadius: responsiveWidth(1.5),
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(1),
    height: '100%',
    width: '100%',
  },
  countryPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  input: {
    flex: 1,
    marginLeft: responsiveWidth(2),
    backgroundColor: 'white',
    shadowColor: Colors.LIGHT_PURPLE,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    borderColor: Colors.LIGHT_PURPLE,
    borderWidth: responsiveWidth(0.23),
    borderRadius: responsiveWidth(1.5),
  },
  iconContainer: {
    marginLeft: responsiveWidth(2),
  },
  textInput: {
    height: '100%',
    width: '100%',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Poppins-Regular',
    color: 'black',
    paddingHorizontal: responsiveWidth(2),
  },
});

export default CustomPhoneInput;
