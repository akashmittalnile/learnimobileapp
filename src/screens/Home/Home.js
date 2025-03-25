//import : react components
import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
// import : custom components
import Header from 'component/Header/Header';
import ViewAll from 'component/ViewAll/ViewAll';
import Loader from 'component/loader/Loader';
import MySearchBarForHome from 'component/MySearchBarForHome';
import MyText from 'component/MyText/MyText';
import HomeCourseCard from 'component/HomeCourseCard/HomeCourseCard';
import HomePageLoader from 'component/SkeltonLoader/HomePageLoader';
import CategoryCard from 'component/CategoryCard/CategoryCard';
//import : third parties
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import Background from 'assets/svgs/background.svg';
import {dimensions} from 'global/Constants';
import {ScreenNames, Service} from 'global/index';
import {API_Endpoints, GetApiWithToken, PostApiWithToken} from 'global/Service';
//import : styles
import {styles} from './HomeStyle';
//import : redux
import {useDispatch} from 'react-redux';
import {setCartCount} from 'reduxTooklit/CountSlice';

const Home = ({navigation}) => {
  //hook : states
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const [homeData, setHomeData] = useState({
    categories: [],
    courses: [],
    products: [],
    sub_categories: [],
    suggested_courses: [],
  });
  const [showLoader, setShowLoader] = useState(false);
  const [showBaseLoader, setShowBaseLoader] = useState(false);
  //function : nav func
  const gotoCourseCategory = () => {
    navigation.navigate(ScreenNames.COURSE_CATEGORY);
  };
  const gotoSubCategories = data => {
    navigation.navigate(ScreenNames.SUB_CATEGORY, {data});
  };
  const gotoCourseDetails = id => {
    navigation.navigate('AuthStack', {
      screen: ScreenNames.COURSE_DETAIL,
      params: {id: id},
    });
  };
  const gotoCourseListing = data => {
    navigation.navigate(ScreenNames.COURSE_LISTING, {data});
  };
  //function : imp func
  const initLoader = async () => {
    setShowBaseLoader(true);
    await getHome();
    setShowBaseLoader(false);
  };
  //function : serv func
  const getHome = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.home,
        token,
      );
      if (status) {
        setHomeData({
          categories: response?.data?.category,
          courses: response?.data?.course,
          products: response?.data?.product,
          sub_categories: response?.data?.subCategory,
          suggested_courses: response?.data?.suggested_course,
        });
      }
    } catch (error) {
      console.error('error in getHome', error);
    }
  };

  const getCartCount = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await GetApiWithToken(API_Endpoints?.cartList, token);
      if (response?.data?.status) {
        dispatch(
          setCartCount({cartCount: response?.data?.data?.items?.length}),
        );
      }
    } catch (err) {
      console.error('error in getting cart count home', err);
    }
  };

  //hook : useEffect
  useEffect(() => {
    if (focused) {
      initLoader();
      getCartCount();
    }
  }, [focused]);

  const goToSearchScreen = () => {
    navigation.navigate(ScreenNames.SEARCH);
  };

  //UI
  if (showBaseLoader) {
    return <HomePageLoader />;
  } else {
    return (
      <View style={styles.container}>
        <Background style={StyleSheet.absoluteFill} />
        <Header
          showBackButton={false}
          showNotification={true}
          showGridIcon={true}
        />
        <ScrollView>
          <View style={{marginHorizontal: 10}}>
            <View style={{marginVertical: 12}}>
              <TouchableOpacity onPress={goToSearchScreen}>
                <MySearchBarForHome
                  disabled
                  placeHolder={'Search by course or product name'}
                />
              </TouchableOpacity>
              <View style={{marginHorizontal: 12}}>
                <View style={{}}>
                  <ViewAll
                    text="Courses Category"
                    onPress={() => gotoCourseCategory()}
                    style={{marginTop: 15}}
                  />
                  <FlatList
                    data={homeData?.categories}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true}
                    renderItem={({item}) => (
                      <CategoryCard
                        item={item}
                        onPress={() => gotoSubCategories(item)}
                      />
                    )}
                    contentContainerStyle={{paddingVertical: 10}}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>

                <View>
                  {homeData?.courses?.length > 0 ? (
                    <View>
                      <ViewAll
                        text="Trending Courses"
                        onPress={() =>
                          gotoCourseListing({
                            title: 'Trending',
                            trending: true,
                          })
                        }
                        style={{marginTop: 4}}
                      />
                      <FlatList
                        data={homeData?.courses || []}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{marginTop: 15}}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                          <HomeCourseCard
                            item={item}
                            setShowLoader={setShowLoader}
                            onPress={() => gotoCourseDetails(item.id)}
                            nextFunction={() => getHome()}
                          />
                        )}
                        onEndReached={''}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={''}
                      />
                    </View>
                  ) : (
                    <MyText
                      text={`No Trending Courses found`}
                      fontFamily="medium"
                      fontSize={18}
                      textColor={'#455A64'}
                      style={{textAlign: 'center', marginTop: 20}}
                    />
                  )}
                </View>
                <View>
                  {homeData?.suggested_courses?.length > 0 ? (
                    <View>
                      <ViewAll
                        text="Suggested Courses"
                        onPress={() =>
                          gotoCourseListing({
                            title: 'Suggested',
                            trending: false,
                          })
                        }
                        style={{marginTop: 25}}
                      />
                      <FlatList
                        data={homeData?.suggested_courses || []}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{marginTop: 15}}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                          <HomeCourseCard
                            item={item}
                            onPress={() => gotoCourseDetails(item.id)}
                          />
                        )}
                        onEndReached={''}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={''}
                      />
                    </View>
                  ) : (
                    <MyText
                      text={`No Trending Courses found`}
                      fontFamily="medium"
                      fontSize={18}
                      textColor={'#455A64'}
                      style={{textAlign: 'center', marginTop: 20}}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
          <View height={dimensions.SCREEN_HEIGHT * 0.2}></View>
        </ScrollView>
        <Loader visible={showLoader} />
      </View>
    );
  }
};

export default Home;
