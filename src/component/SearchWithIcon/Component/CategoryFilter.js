//react components
import React, {useRef, useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';

// global
import {Colors} from 'global/index';
//third parties
import moment from 'moment';
import Toast from 'react-native-toast-message';
//styles
import {styles} from './CategoryFilterStyle';
import Dropdown from 'component/DropDown/DropDown';
import MyButton from 'component/MyButton/MyButton';
import MyMultiSelect from 'component/MyMultiSelect/MyMultiSelect';
import RadioInactive from 'assets/images/radioInactive.svg';
import RadioActive from 'assets/images/radioActive.svg';
const TrendingFiltersModal = ({
  visible,
  setVisibility,

  courseCategries,
  tempSelectedCourseCategries,
  setTempSelectedCourseCategries,
  priceFilterValues,
  tempSelectedPriceFilter,
  setTempSelectedPriceFilter,
  tempSelectedRatingValues,
  setTempSelectedRatingValues,
  applyFilters,
  resetFilter,
}) => {
  //function : modal function
  const [allRatingValues] = useState(['4', '3', '2', '1']);
  const closeModal = () => {
    setVisibility(false);
  };
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={closeModal} style={{flex: 1}}>
          {/* <Image
            source={require('assets/images/back-arrow.png')}
            style={styles.backImage}
          /> */}
        </TouchableOpacity>
        <View style={styles.titleView}>
          <MyText
            text="Filters"
            textColor={Colors.DARK_GREY}
            textAlign="center"
            fontSize={16}
            fontFamily="medium"
          />
        </View>
        <View style={{flex: 1}} />
      </View>
    );
  };
  const addRating = value => {
    // if clicked on already selected rating, remove it
    if (tempSelectedRatingValues?.includes(value)) {
      let tempSelectedRatingValuesCopy = [...tempSelectedRatingValues];
      tempSelectedRatingValuesCopy = tempSelectedRatingValuesCopy.filter(
        el => el !== value,
      );
      setTempSelectedRatingValues([...tempSelectedRatingValuesCopy]);
    } else {
      // if clicked on unselected rating, add it
      const tempSelectedRatingValuesCopy = [...tempSelectedRatingValues];
      tempSelectedRatingValuesCopy.push(value);
      setTempSelectedRatingValues([...tempSelectedRatingValuesCopy]);
    }
  };
  //UI
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade"
      onShow={() => {}}
      transparent>
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <ScrollView>
            {renderHeader()}
            <MyText
              text={'Choose Tags'}
              textColor={Colors.DARK_GREY}
              fontSize={16}
              fontFamily="medium"
              marginBottom={10}
              marginTop={20}
            />
            <MyMultiSelect
              data={courseCategries?.map(el => ({
                label: el.name,
                value: el.name,
              }))}
              value={tempSelectedCourseCategries}
              setValue={setTempSelectedCourseCategries}
              placeholder={'Select Categories'}
              style={{marginBottom: 0}}
            />
            {/* <Dropdown
              // data={developerData}
              data={getCategoryDropdownData()}
              value={
                temporarySelectedTab == '1'
                  ? tempSelectedCourseCategries
                  : TempSelectedProductCategries
              }
              setValue={
                temporarySelectedTab == '1'
                  ? setTempSelectedCourseCategries
                  : setTempSelectedProductCategries
              }
              placeholder={`Select Categories`}
              style={{marginBottom: 0}}
            /> */}
            <MyText
              text={'Select Price Filter'}
              textColor={Colors.DARK_GREY}
              fontSize={16}
              fontFamily="medium"
              marginBottom={10}
              marginTop={27}
            />
            {priceFilterValues?.map((el, index) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  if (tempSelectedPriceFilter === el?.id) {
                    setTempSelectedPriceFilter('');
                  } else {
                    setTempSelectedPriceFilter(el?.id);
                  }
                }}>
                <View style={styles.statusView}>
                  <Image
                    source={
                      tempSelectedPriceFilter === el?.id
                        ? require('assets/images/ActiveRadio.png')
                        : require('assets/images/InactiveRadio.png')
                    }
                    style={styles.radioButton}
                  />
                  <MyText
                    text={el?.name}
                    textColor={Colors.DARK_GREY}
                    fontSize={14}
                    marginLeft={10}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
            <MyText
              text={'Select Rating Filter'}
              textColor={Colors.DARK_GREY}
              fontSize={16}
              fontFamily="medium"
              marginBottom={10}
              marginTop={27}
            />
            {allRatingValues?.map(el => (
              <TouchableWithoutFeedback
                // onPress={() => addRating(el)}
                onPress={() => {
                  if (tempSelectedRatingValues?.length === 0) {
                    setTempSelectedRatingValues([el]);
                  } else if (tempSelectedRatingValues[0] === el) {
                    setTempSelectedRatingValues([]);
                  } else {
                    setTempSelectedRatingValues([el]);
                  }
                }}>
                <View style={styles.statusView}>
                  <Image
                    source={
                      tempSelectedRatingValues.includes(el)
                        ? require('assets/images/ActiveChckBox.png')
                        : require('assets/images/InactiveCheckBox.png')
                    }
                    style={styles.radioButton}
                  />
                  <MyText
                    text={`${el} and more`}
                    textColor={Colors.DARK_GREY}
                    fontSize={14}
                    marginLeft={10}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}

            <MyButton
              text="Apply"
              style={{
                width: '90%',
                alignSelf: 'center',
                marginTop: 41,
                marginBottom: 10,
                backgroundColor: Colors.THEME_GOLD,
              }}
              onPress={() => applyFilters()}
            />
            <TouchableOpacity onPress={resetFilter} style={styles.resetButton}>
              <MyText
                text="Reset"
                textColor={Colors.DARK_GREY}
                fontSize={14}
                fontFamily="medium"
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TrendingFiltersModal;
