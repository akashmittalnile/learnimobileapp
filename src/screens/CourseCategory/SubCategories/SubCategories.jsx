//import : react component
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import SearchWithIcon from 'component/SearchWithIcon/SearchWithIcon';
import SizeBox from 'component/SizeBox/SizeBox';
//import : third party
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import {API_Endpoints} from 'global/Service';
import {Colors, ScreenNames, Service} from 'global/index';
import RightSvg from 'assets/svgs/right-arrow.svg';
import Background from 'assets/svgs/background.svg';
//import : styles
import {styles} from './SubCategoriesStyle';
import NoDataFound from 'component/NoDataFound/NoDataFound';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import ListLoader from 'component/SkeltonLoader/ListLoader';
//import : modals
//import : redux

const SubCategories = ({route, navigation}) => {
  //variables
  const {data} = route.params;
  //hook : states
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [loader, setLoader] = useState(false);
  //function : nav func
  const gotoCourseList = postData => {
    navigation.navigate(ScreenNames.COURSE_LIST, {data: postData});
  };
  //function : serv func
  const getSubCategories = async (name = '') => {
    try {
      setLoader(true);
      const token = await AsyncStorage.getItem('token');
      const paramsData = {
        category_id: data.id,
        name: name,
      };
      const {response, status} = await Service.getAPI(
        API_Endpoints.subcategories,
        token,
        paramsData,
      );
      if (status) {
        console.log('qwer hit');
        setSubCategoriesData(response.data);
      }
    } catch (error) {
      console.error('error in getHome', error);
    } finally {
      setLoader(false);
    }
  };
  //hook : useEffect
  useEffect(() => {
    getSubCategories();

    return () => {};
  }, []);

  //UI
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <Background style={StyleSheet.absoluteFill} />

        <Header
          showNotification={false}
          heading={data.name}
          showLearneLogo={false}
          showCart={false}
          showBackButton={true}></Header>
        {/* <View style={styles.container}> */}
        {/* <Header
        showBackButton={true}
        heading={data.name}
        showNotification={true}
        showCart={false}
        showLearneLogo={false}
        showGridIcon={false}
      /> */}
        <View style={styles.mainView}>
          <SearchWithIcon
            placeholder="Search by name"
            onChangeText={text => {
              getSubCategories(text);
            }}
          />
          <SizeBox height={10} />
          {subCategoriesData?.length > 0 && (
            <FlatList
              data={subCategoriesData}
              style={{marginTop: 12, alignSelf: 'center'}}
              renderItem={({item, index}) => {
                return (
                  <SubCategoriesCard
                    name={item.name}
                    onPress={() => gotoCourseList(item)}
                  />
                );
              }}
              ItemSeparatorComponent={() => <SizeBox height={10} />}
              keyExtractor={(item, index) => item + index}
            />
          )}
          {subCategoriesData?.length === 0 && <NoDataFound />}
        </View>
        {/* </View> */}
      </ScrollView>
      {loader && <ListLoader />}
    </SafeAreaView>
  );
};

export default SubCategories;

const SubCategoriesCard = ({name, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '99%',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        borderWidth: 1,
        borderColor: Colors.LIGHT_PURPLE,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignSelf: 'center',
      }}>
      <MyText text={name} fontSize={14} />
      <RightSvg />
    </TouchableOpacity>
  );
};
