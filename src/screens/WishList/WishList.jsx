//import : react component
import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
//import : custom components
import CourseCard from 'component/CourseCard/CourseCard';
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import SearchWithIcon from 'component/SearchWithIcon/SearchWithIcon';
import SizeBox from 'component/SizeBox/SizeBox';
import Loader from 'component/loader/Loader';
//import : third party
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import Background from 'assets/svgs/background.svg';
import {API_Endpoints} from 'global/Service';
import {ScreenNames, Service} from 'global/index';
//import : styles
import {styles} from './WishListStyle';
import ListLoader from 'component/SkeltonLoader/ListLoader';
import NoDataFound from 'component/NoDataFound/NoDataFound';
//import : modals
//import : redux

const WishList = ({navigation}) => {
  //variables
  const isFocused = useIsFocused();
  //hook : states
  const [wishlistData, setWishlistData] = useState([]);
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  const [showBaseLoader, setShowBaseLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  //variables : redux variables
  const gotoTrendingCourses = () => {
    // navigation.navigate(ScreenNames.TRENDING_COURSES);
  };
  //function : imp func
  const initLoader = async () => {
    setShowBaseLoader(true);
    await getWishlist();
    setShowBaseLoader(false);
  };
  //function : serv func
  const addToWishlist = async id => {
    try {
      setShowLoader(true);
      const postData = {
        id: id,
        type: 1,
      };
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.postAPI(
        API_Endpoints.add_wishlist,
        postData,
        token,
      );
      if (status) {
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        getWishlist();
      }
    } catch (err) {
      console.error('error in registering user', err);
    } finally {
      setShowLoader(false);
    }
  };
  const getWishlist = async () => {
    try {
      const paramsData = {
        type: 1,
      };
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.wishlist,
        token,
        paramsData,
      );
      if (status) {
        setWishlistData(response.data);
      } else {
        setWishlistData([]);
      }
    } catch (error) {
      console.error('error in getWishlist', error);
    } finally {
      setRefreshing(false);
    }
  };
  //hook : useEffect
  useEffect(() => {
    initLoader();

    return () => {};
  }, [isFocused]);

  const gotoCourseDetails = id => {
    navigation.navigate(ScreenNames.COURSE_DETAIL, {id});
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    initLoader();
  }, []);

  //UI
  if (showBaseLoader) {
    return <ListLoader />;
  } else {
    return (
      <View style={styles.container}>
        <Background style={StyleSheet.absoluteFill} />
        <Header
          showBackButton={false}
          showNotification={true}
          showGridIcon={true}
        />
        <FlatList
          data={wishlistData || []}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <CourseCard
                item={item}
                heartPress={() => addToWishlist(item.id)}
                onPress={() => gotoCourseDetails(item?.course_id)}
              />
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReachedThreshold={0.1}
          nestedScrollEnabled={true} // Allows inner scrolling
          contentContainerStyle={{
            paddingHorizontal: 16, // Equal left-right padding
            paddingBottom: 50, // Ensure enough space to scroll to bottom
            flexGrow: 1, // Ensures FlatList takes full height
          }}
          ListHeaderComponent={() => (
            <View style={{marginVertical: 12}}>
              <SearchWithIcon
                disabled
                placeHolder={'Search by course or product name'}
                placeholderTextColor={'#8F93A0'}
              />
            </View>
          )}
          ListFooterComponent={
            () =>
              wishlistData.length === 0 ? (
                // <MyText
                //   text={`No Trending Courses found`}
                //   fontFamily="medium"
                //   fontSize={18}
                //   textColor={'#455A64'}
                //   style={{textAlign: 'center', marginTop: 20}}
                // />
                <NoDataFound />
              ) : (
                <View style={{height: 20}} />
              ) // Empty space for better scrolling
          }
        />
        <SizeBox height={30} />
        <Loader visible={showLoader} />
      </View>
    );
  }
};

export default WishList;
