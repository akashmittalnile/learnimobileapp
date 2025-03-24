//import : react component
import React, {useEffect, useRef, useState} from 'react';
import {View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
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
import {API_Endpoints, GetApiWithToken} from 'global/Service';
import {ScreenNames, Service} from 'global/index';
//import : styles
import {styles} from 'screens/WishList/WishListStyle';
import ListLoader from 'component/SkeltonLoader/ListLoader';
import NoDataFound from 'component/NoDataFound/NoDataFound';

const Search = ({navigation}) => {
  const debounceTimeoutRef = useRef(null);
  const [searchData, setSearchData] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getSearchData();
  }, []);

  const getSearchData = async value => {
    try {
      setShowLoader(true);
      const token = await AsyncStorage.getItem('token');
      let endpoint = API_Endpoints.home;
      if (value) {
        endpoint = `${API_Endpoints.home}?name=${value}`;
      }
      const response = await GetApiWithToken(endpoint, token);
      if (response?.data?.status) {
        setSearchData(response?.data?.data?.course);
      }
    } catch (error) {
      console.error('error in getWishlist', error);
    } finally {
      setShowLoader(false);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <CourseCard
        item={item}
        heartPress={() => addToWishlist(item.id)}
        onPress={() => gotoCourseDetails(item.id)}
      />
    );
  };

  const handleDebounce = value => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      getSearchData(value);
    }, 300);
  };

  return (
    <View style={styles.container}>
      <Background style={StyleSheet.absoluteFill} />
      <Header
        showBackButton={true}
        showLearneLogo={false}
        showCart={false}
        heading="Search"
      />
      {!showLoader && (
        <SearchWithIcon
          value={searchValue}
          autoFocus={true}
          style={{width: '95%', alignSelf: 'center'}}
          onChangeText={value => {
            setSearchValue(value);
            handleDebounce(value);
          }}
          onPress={() => {
            getSearchData(searchValue);
          }}
          placeHolder="Search by course or product name"
        />
      )}
      {Array.isArray(searchData) && searchData?.length > 0 && (
        <FlatList
          data={searchData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          onEndReachedThreshold={0.1}
          nestedScrollEnabled={true}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 50,
            flexGrow: 1,
          }}
        />
      )}
      {Array.isArray(searchData) && searchData.length === 0 && !showLoader && (
        <NoDataFound />
      )}
      {showLoader && <ListLoader />}
    </View>
  );
};

export default Search;
