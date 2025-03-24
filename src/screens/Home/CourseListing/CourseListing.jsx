//import : react component
import React, {useCallback, useRef, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
//import : custom components
import CourseCard from 'component/CourseCard/CourseCard';
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import SearchWithIcon from 'component/SearchWithIcon/SearchWithIcon';
import SizeBox from 'component/SizeBox/SizeBox';
import ListLoader from 'component/SkeltonLoader/ListLoader';
import Loader from 'component/loader/Loader';
//import : third party
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {debounce} from 'lodash';
//import : utils
import Background from 'assets/svgs/background.svg';
import {API_Endpoints} from 'global/Service';
import {Colors, MyIcon, Service} from 'global/index';
//import : styles
import {styles} from './CourseListingStyle';
//import : modals
import CourseFilter from 'modals/CourseFilter/CourseFilter';
//import : redux

const CourseListing = ({navigation, route}) => {
  //variables
  const isFocused = useIsFocused();
  const {data} = route.params;
  const currentAppliedFilter = useRef('');

  //hook : states
  const [coursesData, setCoursesData] = useState([]);
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  const [showBaseLoader, setShowBaseLoader] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [tempSearchedText, setTempSearchedText] = useState('');
  //variables : redux variables
  const gotoTrendingCourses = () => {
    // navigation.navigate(ScreenNames.TRENDING_COURSES);
  };
  //function : imp func
  const initLoader = async () => {
    setShowBaseLoader(true);
    await getCourses();
    setShowBaseLoader(false);
  };
  const debouncedSearch = useCallback(
    debounce(query => {
      getCourses({name: query});
    }, 500), // 500ms delay
    [],
  );
  const searchHandle = text => {
    setTempSearchedText(text);
    debouncedSearch(text);
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
        getCourses();
      }
    } catch (err) {
      console.error('error in registering user', err);
    } finally {
      setShowLoader(false);
    }
  };
  const getCourses = async (filterData = {}) => {
    try {
      const paramsData = {
        name: filterData.name || '',
        highlow: filterData.highlow || '',
        ratings: filterData.ratings || '',
        category_id: filterData.category_id || '',
        sub_category_id: filterData.sub_category_id || '',
        trending: data.trending,
      };
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.courses,
        token,
        paramsData,
      );
      if (status) {
        setCoursesData(response?.data?.data);
      }
    } catch (error) {
      console.error('error in getCourses', error);
    }
  };
  //hook : useEffect
  useEffect(() => {
    initLoader();

    return () => {};
  }, [isFocused]);

  //UI
  if (showBaseLoader) {
    return <ListLoader />;
  } else {
    return (
      <View style={styles.container}>
        <Background style={StyleSheet.absoluteFill} />
        <Header
          showBackButton={true}
          showNotification={false}
          heading={`${data.title} Courses`}
          showCart={false}
          showGridIcon={false}
          showLearneLogo={false}
        />
        <View style={styles.mainView}>
          <SearchWithIcon
            value={tempSearchedText}
            placeholder={'Search by course or product name'}
            onChangeText={text => searchHandle(text)}
            icon={
              <MyIcon.Ionicons name="filter" size={28} color={Colors.WHITE} />
            }
            onPress={() => setShowFilter(true)}
            placeholderTextColor={Colors.GRAY}
          />
          {Object.keys(currentAppliedFilter?.current).length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 10,
                marginTop: 10,
                flexWrap: 'wrap',
                rowGap: 10,
              }}>
              <FilterItem
                title={'Categories: '}
                value={currentAppliedFilter?.current?.category_name}
              />
              <FilterItem
                title={'Sub Categories: '}
                value={currentAppliedFilter?.current?.sub_category_name}
              />
              <FilterItem
                title={'Price: '}
                value={currentAppliedFilter?.current?.highlow}
              />
            </View>
          )}
          <FlatList
            data={coursesData || []}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <CourseCard
                  item={item}
                  heartPress={() => addToWishlist(item.id)}
                  onPress={() => gotoCourseDetails(item.id)}
                />
              );
            }}
            onEndReachedThreshold={0.1}
            contentContainerStyle={{
              paddingBottom: '50%',
            }}
          />
        </View>

        <Loader visible={showLoader} />
        <CourseFilter
          visible={showFilter}
          setVisibility={setShowFilter}
          nextFunction={filterData => {
            currentAppliedFilter.current = filterData;
            getCourses(filterData);
          }}
        />
      </View>
    );
  }
};

export default CourseListing;

const FilterItem = ({title, value}) => {
  return (
    <View
      style={{
        backgroundColor: '#ede5ca',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: 10,
      }}>
      <MyText text={title} />
      <MyText text={value} />
    </View>
  );
};
