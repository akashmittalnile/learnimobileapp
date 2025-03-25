//import : react component
import React, {useState} from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';
import MyButton from 'component/MyButton/MyButton';
import CustomDropDown from 'component/CustomDropDown/CustomDropDown';
import Loader from 'component/loader/Loader';
//import : third party
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import {Colors, Constants, MyIcon, Service} from 'global/index';
import {API_Endpoints} from 'global/Service';
//import : styles
import {styles} from './CourseFilterStyle';
//import : modals
//import : redux

const CourseFilter = ({
  visible,
  setIsFilteredAppplied = () => {},
  setVisibility,
  nextFunction = () => {},
}) => {
  //hook : states
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('');
  const [selectedRatingFilter, setSelectedRatingFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  //hook : modal states
  const [categoriesData, setCategoriesData] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  //function : modal func
  const closeModal = () => {
    setVisibility(false);
  };
  const clearState = () => {
    setSelectedPriceFilter('');
    setSelectedRatingFilter('');
    setSelectedCategory('');
    setSelectedSubCategory('');
  };
  //function : imp func
  const resetFilter = () => {
    closeModal();
    clearState();
    nextFunction({});
  };
  const applyFilters = () => {
    const data = {
      highlow: selectedPriceFilter,
      highlow_name:
        selectedPriceFilter != ''
          ? Constants?.price_filter_value.find(e => e.id == selectedPriceFilter)
              .name
          : '',
      ratings: selectedRatingFilter,
      ratings_name:
        selectedRatingFilter != ''
          ? `${[4, 3, 2, 1].find(e => e == selectedRatingFilter)} and more`
          : '',
      category_id: selectedCategory,
      category_name:
        selectedCategory != ''
          ? categoriesData.find(e => e.id == selectedCategory).name
          : '',
      sub_category_id: selectedSubCategory,
      sub_category_name:
        selectedSubCategory != ''
          ? subCategoriesData.find(e => e.id == selectedSubCategory).name
          : '',
    };

    setIsFilteredAppplied(true);
    closeModal();
    nextFunction(data); // Send filters to parent
  };

  const getCategories = async () => {
    setShowLoader(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.categories,
        token,
      );
      if (status) {
        const formattedData = response?.data?.map(item => {
          return {
            label: item.name,
            value: item.id,
            ...item,
          };
        });
        setCategoriesData(formattedData);
      }
    } catch (error) {
      console.error('error in getCategories', error);
    } finally {
      setShowLoader(false);
    }
  };
  const getSubCategories = async () => {
    setShowLoader(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const paramsData = {
        category_id: selectedCategory,
      };
      const {response, status} = await Service.getAPI(
        API_Endpoints.subcategories,
        token,
        paramsData,
      );
      if (status) {
        const formattedData = response?.data?.map(item => {
          return {
            label: item.name,
            value: item.id,
            ...item,
          };
        });
        setSubCategoriesData(formattedData);
      }
    } catch (error) {
      console.error('error in getSubCategories', error);
    } finally {
      setShowLoader(false);
    }
  };

  //UI
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <MyText
            text="Filters"
            textColor={Colors.DARK_GREY}
            textAlign="center"
            fontSize={16}
            fontFamily="medium"
          />
          <MyText
            text={'Choose Categories'}
            textColor={Colors.DARK_GREY}
            fontSize={16}
            fontFamily="medium"
            marginBottom={10}
            marginTop={20}
          />
          <CustomDropDown
            placeholder="Select Category"
            DD_Data={categoriesData}
            value={selectedCategory}
            setValue={setSelectedCategory}
            onFocus={() => getCategories()}
          />
          <MyText
            text={'Choose Sub Categories'}
            textColor={Colors.DARK_GREY}
            fontSize={16}
            fontFamily="medium"
            marginBottom={10}
            marginTop={20}
          />
          <CustomDropDown
            disable={!selectedCategory}
            placeholder="Select Sub Category"
            DD_Data={subCategoriesData}
            value={selectedSubCategory}
            setValue={setSelectedSubCategory}
            onFocus={() => getSubCategories()}
          />
          <MyText
            text={'Select Price Filter'}
            textColor={Colors.DARK_GREY}
            fontSize={16}
            fontFamily="medium"
            marginBottom={10}
            marginTop={27}
          />
          {Constants?.price_filter_value?.map((el, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 10,
              }}
              onPress={() => setSelectedPriceFilter(el.id)}>
              <MyIcon.Ionicons
                name={
                  selectedPriceFilter == el.id
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                size={24}
                color={
                  selectedPriceFilter == el.id ? Colors.GREEN : Colors.BLACK
                }
              />
              <MyText
                text={el?.name}
                textColor={Colors.DARK_GREY}
                fontSize={14}
              />
            </TouchableOpacity>
          ))}
          <MyText
            text={'Select Rating Filter'}
            textColor={Colors.DARK_GREY}
            fontSize={16}
            fontFamily="medium"
            marginBottom={10}
            marginTop={27}
          />
          {[4, 3, 2, 1]?.map((el, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 10,
              }}
              onPress={() => setSelectedRatingFilter(el)}>
              <MyIcon.Ionicons
                name={
                  selectedRatingFilter == el
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                size={24}
                color={selectedRatingFilter == el ? Colors.GREEN : Colors.BLACK}
              />
              <MyText
                text={`${el} and more`}
                textColor={Colors.DARK_GREY}
                fontSize={14}
              />
            </TouchableOpacity>
          ))}
          <MyButton
            text="Apply"
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 41,
              marginBottom: 10,
              backgroundColor: Colors.GREEN,
            }}
            onPress={() => applyFilters()}
          />
          <TouchableOpacity
            onPress={() => resetFilter()}
            style={{
              alignSelf: 'center',
              borderWidth: 1,
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,
            }}>
            <MyText
              text="Reset"
              textColor={Colors.DARK_GREY}
              fontSize={14}
              fontFamily="medium"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Loader visible={showLoader} />
    </Modal>
  );
};

export default CourseFilter;
