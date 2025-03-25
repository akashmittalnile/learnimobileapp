//import : react components
import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
//import : utils
import {ScreenNames} from 'global/index';
//import : screens
import Splash from 'screens/Splash/Splash';
import Welcome from 'screens/Welcome/Welcome';
import SignUp from 'screens/Auth/SignUp';
import Signin from 'screens/Auth/Signin';
import BottomTab from './BottomTab/BottomTab';
import EditProfile from 'screens/Profie/EditProfile/EditProfile';
import CourseCategory from 'screens/CourseCategory/CourseCategory';
import CourseDetail from 'screens/CourseDeatils/CourseDetail';
import SubCategories from 'screens/CourseCategory/SubCategories/SubCategories';
import CourseList from 'screens/CourseCategory/CourseList/CourseList';
import ChapterDetail from 'screens/CourseDeatils/ChapterDetail/ChapterDetail';

import Disclaimers from 'screens/Disclamers/Disclamers';
import OderHistory from 'screens/OrderHistory/OderHistory';
import Certificate from 'screens/Certificate/Certificate';
import Notification from 'screens/Notification/Notification';
import OrderDetail from 'screens/OrderDetail/OrderDetail';
import Cart from 'screens/Cart/Cart';
import ViewPdf from 'screens/CourseDeatils/ViewPdf/ViewPdf';
import ViewContent from 'screens/CourseDeatils/ViewContent/ViewContent';
import AddAssignment from 'screens/CourseDeatils/AddAssignment/AddAssignment';
import Billing from 'screens/Billing/Billing';
import ChatScreen from 'screens/ChatScreen/ChatScreen';
import CourseListing from 'screens/Home/CourseListing/CourseListing';
import WebViewPage from 'screens/Home/WebViewPage/WebViewPage';
import MyCourses from 'screens/Home/MyCourses/MyCourses';
import Search from 'screens/Search/Search';
import ImageView from 'screens/ImageView/ImageView';
const AuthStack = () => {
  //variables
  const Stack = createStackNavigator();
  //UI
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // set the headerShown option to false to hide the header
      }}>
      <Stack.Screen name={ScreenNames.SPLASH} component={Splash} />
      <Stack.Screen name={ScreenNames.WELCOME} component={Welcome} />
      <Stack.Screen name={ScreenNames.SIGN_IN} component={Signin} />
      <Stack.Screen name={ScreenNames.SIGN_UP} component={SignUp} />
      <Stack.Screen name={ScreenNames.BOTTOM_TAB} component={BottomTab} />
      <Stack.Screen name={ScreenNames.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={ScreenNames.COURSE_HISTORY} component={OderHistory} />
      <Stack.Screen
        name={ScreenNames.COURSE_CATEGORY}
        component={CourseCategory}
      />
      <Stack.Screen name={ScreenNames.COURSE_DETAIL} component={CourseDetail} />
      <Stack.Screen
        name={ScreenNames.CHAPTER_DETAIL}
        component={ChapterDetail}
      />
      <Stack.Screen name={ScreenNames.SUB_CATEGORY} component={SubCategories} />
      <Stack.Screen name={ScreenNames.COURSE_LIST} component={CourseList} />
      <Stack.Screen name={ScreenNames.CERTIFICATE} component={Certificate} />
      <Stack.Screen name={ScreenNames.NOTIFICATION} component={Notification} />
      <Stack.Screen name={ScreenNames.CART} component={Cart} />
      <Stack.Screen name={ScreenNames.VIEW_PDF} component={ViewPdf} />
      <Stack.Screen name={ScreenNames.VIEW_CONTENT} component={ViewContent} />
      <Stack.Screen
        name={ScreenNames.ADD_ASSIGNMENT}
        component={AddAssignment}
      />
      <Stack.Screen name={ScreenNames.ORDER_DETAIL} component={OrderDetail} />
      <Stack.Screen name={ScreenNames.BILLING} component={Billing} />
      <Stack.Screen name={ScreenNames.CHAT_SCREEN} component={ChatScreen} />
      <Stack.Screen
        name={ScreenNames.COURSE_LISTING}
        component={CourseListing}
      />
      <Stack.Screen name={ScreenNames.WEB_VIEW_PAGE} component={WebViewPage} />
      <Stack.Screen name={ScreenNames.IMAGE_VIEW} component={ImageView} />
      <Stack.Screen name={ScreenNames.MY_COURSES} component={MyCourses} />
      <Stack.Screen name={ScreenNames.SEARCH} component={Search} />
      {/* 
     
    
       <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
       <Stack.Screen name="Disclaimers" component={Disclaimers} /> */}
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
export default AuthStack;
