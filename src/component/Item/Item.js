import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyText from '../MyText/MyText';
import {Colors, ScreenNames, Service} from 'global/index';

import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import {styles} from 'screens/Cart/CartStyle';
import {dimensions} from 'global/Constants';

// import couponIcon from '../../assets/images/coupon.png'
// import rightArrowIcon from ".././../assets/images/right-arrow.png"
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { setCartCount, setUserNotifications } from '../../reduxToolkit/reducer/user';
import {CommonActions} from '@react-navigation/native';
import {REGULAR} from 'global/Fonts';
import Rating from 'assets/images/rating.svg';
import Profile from 'assets/images/profilePerson.svg';

const Item = ({
  item,
  type = 1,
  onChangeQuantity = () => {},
  coupon = {applied: null},
  shownShippingBtn = false,
  shippingBtn = () => {},
  containerStyle = {},
  shippingDetails = [],
  disabledBtn = false,
}) => {
  const userToken = useSelector(state => state.user.userToken);
  // const couponIconPath = Image.resolveAssetSource(couponIcon).uri;
  // const rightArrowIconPath = Image.resolveAssetSource(rightArrowIcon).uri;
  const [isShippingSelected, setIsShippingSelected] = React.useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  React.useEffect(() => {
    shippingDetailsHandler();
  }, [shippingDetails]);

  const shippingDetailsHandler = () => {
    if (type === 2) {
      const _shippingDetails = shippingDetails.filter(
        detail => detail.product_id === item.product_id,
      );
      setIsShippingSelected(_shippingDetails[0]);
    } else {
      const _shippingDetails = shippingDetails.filter(
        detail => detail?.item?.productId === item.product_id,
      );
      setIsShippingSelected(_shippingDetails[0]);
    }
  };
  const changeQuantity = async (item, change) => {
    if (type === 1) {
      const postData = new FormData();
      postData.append('course_id', item.product_id);
      try {
        const response = await Service.postApiWithToken(
          userToken,
          Service.REMOVE_CART_COURSE,
          postData,
        );
        if (response?.data?.status) {
          Toast.show({
            text1: 'Item removed',
          });
          const result = await Service.getApiWithToken(
            userToken,
            Service.CART_COUNT,
          );
          if (result?.data?.data === 0) {
            navigation.navigate(ScreenNames.HOME);
          }
          onChangeQuantity();
        }
      } catch (err) {}
      return;
    }
    const oldQuantity = Number(item?.quantity);
    const isRemoveProduct = oldQuantity === 1 && change === 'minus';
    if (isRemoveProduct) {
      removeFromCart(item?.product_id);
    } else {
      updateQuantity(item, change);
    }
  };

  const removeFromCart = async id => {
    const postData = new FormData();
    postData.append('product_id', id);
    try {
      const resp = await Service.postApiWithToken(
        userToken,
        Service.REMOVE_CART,
        postData,
      );
      if (resp?.data?.status) {
        Toast.show({
          text1: 'Item removed',
        });
        if (coupon.applied) {
          await Service.postApiWithToken(
            userToken,
            Service.REMOVE_APPLIED_COUPON,
            {},
          );
        }
        await getCartCount();
        // Toast.show({ text1: "resp?.data?.message" });
        onChangeQuantity();
      } else {
        Toast.show({text1: resp?.data?.message});
      }
    } catch (error) {}
  };

  const updateQuantity = async (item, change) => {
    const oldQuantity = Number(item?.quantity);
    const newQuantity = change === 'minus' ? oldQuantity - 1 : oldQuantity + 1;
    const postData = new FormData();
    postData.append('product_id', item?.product_id);
    postData.append('quantity', newQuantity);
    try {
      const resp = await Service.postApiWithToken(
        userToken,
        Service.UPDATE_PRODUCT_QUANTITY,
        postData,
      );
      if (resp?.data?.status) {
        if (coupon.applied) {
          await Service.postApiWithToken(
            userToken,
            Service.REMOVE_APPLIED_COUPON,
            {},
          );
        }
        onChangeQuantity();
      } else {
        Toast.show({text1: resp?.data?.message});
      }
    } catch (error) {}
  };

  const shippingBtnHandler = () => {
    shippingBtn();
  };

  const getCartCount = async () => {
    try {
      const resp = await Service.getApiWithToken(userToken, Service.CART_COUNT);
      if (resp?.data?.status) {
        dispatch(setCartCount(resp?.data?.data));
        await AsyncStorage.setItem(
          'cart_count',
          JSON.stringify(resp?.data?.data),
        );
        dispatch(setUserNotifications(resp?.data?.notification));
        await AsyncStorage.setItem(
          'userNotifications',
          JSON.stringify(resp?.data?.notification),
        );
        if (resp?.data?.data === 0) {
          navigation.navigate(ScreenNames.HOME);
          navigation.dispatch(resetIndexGoToBottomTab);
        }
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {}
  };
  const resetIndexGoToBottomTab = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.BOTTOM_TAB}],
  });
  return (
    <View
      style={[
        styles.courseContainer,
        {flexDirection: 'column'},
        {
          padding: 0,
          borderWidth: 1,
          borderColor: Colors.LIGHT_PURPLE,
          width: dimensions.SCREEN_WIDTH * 0.95,
          alignSelf: 'center',
        },
        containerStyle,
      ]}>
      <View
        style={[
          {borderRadius: 0, flexDirection: 'row'},
          {padding: 10, flex: 1, width: dimensions.SCREEN_WIDTH * 0.96},
        ]}>
        <Image
          source={{
            uri: item.image,
          }}
          style={[styles.crseImg, {height: 112, width: 112, borderRadius: 8}]}
        />
        <View
          style={{
            marginLeft: 11,
            width: dimensions.SCREEN_WIDTH * 0.58,
            marginTop: 16,
          }}>
          <MyText
            text={item?.name}
            fontFamily={REGULAR}
            fontSize={14}
            textColor={Colors.BLACK}
            style={{}}
          />
          <View style={[styles.middleRow, {marginTop: 12}]}>
            <View style={styles.ratingRow}>
              <View
                style={{
                  height: 10,
                  width: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Rating></Rating>
              </View>
              <MyText
                text={item?.rating}
                fontFamily="regular"
                fontSize={13}
                textColor={Colors.BLACK}
                letterSpacing={0.13}
                style={{marginLeft: 5}}
              />
            </View>
            {/* <View style={[styles.crtrRow, { width: '70%', }]}>
                            
                            <Profile></Profile>
                            <MyText
                                text={
                                'Learni'
                                }
                               
                                fontFamily="regular"
                                fontSize={13}
                                numberOfLines={3}
                                textColor={Colors.DARK_PURPLE}
                                letterSpacing={0.13}
                                style={{ marginLeft: 6, }}
                            />
                        </View> */}
            <View style={[styles.crtrRow, {width: '70%'}]}>
              <MyText
                text={'$'}
                fontFamily="bold"
                fontSize={14}
                textColor={Colors.BLACK}
                letterSpacing={0.14}
                style={{}}
              />
              <MyText
                text={item.total_amount}
                fontFamily="bold"
                fontSize={14}
                textColor={Colors.DARK_PURPLE}
                letterSpacing={0.14}
                style={{}}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 12}}>
            <Profile></Profile>
            <MyText
              text={'Learni'}
              fontFamily="regular"
              fontSize={13}
              numberOfLines={3}
              textColor={Colors.DARK_PURPLE}
              letterSpacing={0.13}
              style={{marginTop: 4, marginLeft: 4}}
            />
          </View>

          <View style={styles.quantityRow}>
            {/* {!disabledBtn && <TouchableOpacity
                                onPress={() => {
                                    changeQuantity(item, 'minus');
                                }}>
                                <Image source={require('assets/images/minus.png')} />
                            </TouchableOpacity>} */}

            {/* {!disabledBtn && <TouchableOpacity
                                onPress={() => {
                                    changeQuantity(item, 'add');
                                }}>
                                <Image source={require('assets/images/add.png')} />
                            </TouchableOpacity>} */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Item;
