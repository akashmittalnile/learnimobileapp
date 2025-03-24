//import : react components
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import Loader from 'component/loader/Loader';
import SearchWithIcon from 'component/SearchWithIcon/SearchWithIcon';
//import : third parties
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : global
import Background from 'assets/svgs/background.svg';
import {REGULAR} from 'global/Fonts';
import {ScreenNames, Service} from 'global/index';
import {API_Endpoints} from 'global/Service';
//import : styles
import {styles} from './CourseCategoryStyle';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import HomePageLoader from 'component/SkeltonLoader/HomePageLoader';
import NoDataFound from 'component/NoDataFound/NoDataFound';
//import : modal
//import : redux

const CourseCategory = ({navigation, dispatch, route}) => {
  //variables
  const focused = useIsFocused();
  //variables : redux
  const [categories, setCategories] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  //function : nav func
  const gotoCourseDetails = id => {
    navigation.navigate(ScreenNames.COURSE_DETAIL, {id});
  };
  const gotoSubCategories = data => {
    navigation.navigate(ScreenNames.SUB_CATEGORY, {data});
  };
  //function : imp func
  const initLoader = async () => {
    setShowLoader(true);
    await getCategories();
    setShowLoader(false);
  };
  const renderCategory = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => gotoSubCategories(item)}
        style={styles.categoryContainer}>
        <Image source={{uri: item.image}} style={styles.catImg} />
        <MyText
          text={item.name}
          fontFamily={REGULAR}
          fontSize={13}
          textAlign="center"
          textColor={'#455A64'}
          style={{marginTop: 5}}
        />
      </TouchableOpacity>
    );
  };
  //function : serv func
  const getCategories = async (categoryName = '') => {
    try {
      const paramsData = {
        name: categoryName,
      };
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.categories,
        token,
        paramsData,
      );
      if (status) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('error in getCategories', error);
    }
  };
  //hook : useEffect
  useEffect(() => {
    initLoader();
  }, [focused]);
  //UI
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Background style={StyleSheet.absoluteFill} />
        <Header
          showBackButton={true}
          heading={'Course Category'}
          // showNotification={true}
          showCart={false}
          showLearneLogo={false}
          showGridIcon={false}
        />

        <View style={{marginHorizontal: 14}}>
          <View style={{marginVertical: 12}}>
            <SearchWithIcon
              placeholder="Search Category"
              onChangeText={text => {
                getCategories(text);
              }}
            />
            {categories?.length > 0 ? (
              <FlatList
                data={categories}
                numColumns={3}
                style={{marginTop: 20}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderCategory}
              />
            ) : (
              // <View style={{alignItems: 'center', marginTop: 20}}>
              //   <MyText
              //     text={'No data found!'}
              //     fontFamily="medium"
              //     fontSize={40}
              //     textAlign="center"
              //     textColor={'black'}
              //   />
              // </View>
              <NoDataFound />
            )}
          </View>
        </View>
      </ScrollView>
      {/* <Loader visible={showLoader} /> */}
      {showLoader && <HomePageLoader />}
    </SafeAreaView>
  );
};

export default CourseCategory;
