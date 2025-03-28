//import : react components
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
//import : custom components
import MyText from 'component/MyText/MyText';
import Loader from 'component/loader/Loader';
import Divider from 'component/Divider/Divider';
import MyButton from 'component/MyButton/MyButton';
import ViewAll from 'component/ViewAll/ViewAll';
import Header from 'component/Header/Header';
//import : third parties
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CardField, createToken} from '@stripe/stripe-react-native';
//import : utils
import {dimensions} from 'global/Constants';
import {ScreenNames, Service, Colors, MyIcon} from 'global/index';
//import : third parties
import Toast from 'react-native-toast-message';
//import : global
import {API_Endpoints} from 'global/Service';
import {MEDIUM} from 'global/Fonts';
import {GREEN, WHITE} from 'global/Color';
//import : styles
import {styles} from './BillingStyle';
//import : modal
import SuccessfulyPurchased from 'modals/SuccessfulyPurchased.js/SuccessfulyPurchased';
import AddCard from 'modals/AddCard/AddCard';
//import : redux
import {connect, useSelector} from 'react-redux';
import useKeyboardListener from 'component/useKeyboardListener/useKeyboardListener';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const Billing = ({navigation, dispatch}) => {
  const {keyboardHeight} = useKeyboardListener();
  //variables
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessfulyPurchasedModal, setShowSuccessfulyPurchasedModal] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState('');
  const [cardList, setCardList] = useState([]);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [screenData, setScreenData] = useState({});
  const [card, setCard] = useState(null);
  const [madePayment, setMadePayment] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showCard, setShowCard] = useState(true);

  const checkcon = () => {
    getData();
    getHome();
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    checkcon();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  //function : serv func
  const getData = async () => {
    setShowLoader(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.cart_detail,
        token,
      );
      if (status) {
        setScreenData(response);
        getCardList();
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message,
        });
      }
    } catch (error) {
      console.error('error in getData', error);
    }
    setShowLoader(false);
  };

  const getCardList = async () => {
    setShowLoader(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.card_list,
        token,
      );
      if (status) {
        setCardList(response.data);
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: response?.message,
        // });
      }
    } catch (error) {
      console.error('error in getData', error);
    }
    setShowLoader(false);
  };
  const handlePayClick = async (order_id, total_amount) => {
    setShowLoader(true);
    try {
      const myData = new FormData();
      // myData.append('stripeToken', stripeToken);
      myData.append('order_id', order_id);
      myData.append('total_amount', Number(total_amount));
      myData.append('card_id', card.card_id);
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.postAPI(
        API_Endpoints.buy_now,
        myData,
        token,
      );
      if (status) {
        setMadePayment(true);
        openSuccessfulyPurchasedModal();
      }
    } catch (error) {
      console.error('error in handlePayClick', error);
    }
    setShowLoader(false);
  };
  const onConfirm = async () => {
    if (cardList.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Please add Card first',
      });
      return;
    } else if (Object.keys(card).length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Please select card first ',
      });
      return;
    }
    setShowLoader(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.postAPI(
        API_Endpoints.save_order,
        '',
        token,
      );
      if (status) {
        handlePayClick(response?.data?.order_id, response?.data?.total_amount);
      } else {
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
      }
    } catch (error) {
      console.error('error in onConfirm', error);
      setShowLoader(false);
    } finally {
      setShowLoader(false);
    }
  };
  const openSuccessfulyPurchasedModal = () => {
    setShowSuccessfulyPurchasedModal(true);
  };
  const openAddCardModal = () => {
    setShowAddCardModal(true);
  };
  const resetIndexGoToMyOrders = CommonActions.reset({
    index: 1,
    // routes: [{name: ScreenNames.MY_ORDERS}],
    routes: [
      {
        name: ScreenNames.BOTTOM_TAB,
        state: {
          routes: [{name: 'Order'}],
        },
      },
    ],
  });
  const gotoMyCourses = () => {
    navigation.dispatch(resetIndexGoToMyOrders);
  };
  const changeSelectedCard = id => {
    setSelectedCard(id);
  };
  const deleteCard = id => {
    const cardListCopy = [...cardList];
    const updatedData = cardListCopy.filter(el => el.id !== id);
    setCardList([...updatedData]);
    // setSelectedCard(id);
  };
  //hook : useEffect
  useEffect(() => {
    getData();
  }, []);
  //UI
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        showNotification={false}
        heading={'Check Out'}
        showLearneLogo={false}
        showCart={false}
        showBackButton={true}
      />
      {/* <ScrollView style={styles.mainView} scrollEnabled={false}> */}
      <View style={styles.mainView}>
        {/* <KeyboardAwareScrollView style={{flex: 1}}> */}
        {/* <View style={styles.summaryContainer}>
              <View style={[styles.row, { marginBottom: 10 }]}>
                <MyText
                  text={`Subtotal (${screenData?.order_count ? screenData?.order_count : 0})`}
                  fontSize={14}
                  fontFamily="medium"
                  textColor={'#455A64'}
                  style={{}}
                />
                <MyText
                
                  text={'$' + (screenData?.sub_total
                    ? screenData?.sub_total : 0)}
                  fontSize={14}
                  fontFamily="medium"
                  textColor={'#455A64'}
                  style={{}}
                />
              </View>
              <View style={[styles.row, { marginBottom: 10 }]}>
                <MyText
                  text={`Discount`}
                  fontSize={14}
                  fontFamily="medium"
                  textColor={'#8F93A0'}
                  style={{}}
                />
                <MyText
                  text={
                    screenData?.shipping_cost > 0
                      ? '+$' + screenData?.shipping_cost?.toFixed(2)
                      : '$0'
                  }
               
                  text={screenData?.discount > 0 ? ('-$' + screenData?.discount) : '$0'}
                  fontSize={14}
                  fontFamily="medium"
                  textColor={'#8F93A0'}
                  style={{}}
                />
              </View>
             
              <View style={[styles.row, { marginBottom: 19 }]}>
                <MyText
                  text={`Tax`}
                  fontSize={14}
                  fontFamily="medium"
                  textColor={'#8F93A0'}
                  style={{}}
                />
                <MyText
                  text={screenData?.tax > 0 ? ('+$' + screenData?.tax) : '$0'}
                  fontSize={14}
                  fontFamily="medium"
                  textColor={'#8F93A0'}
                  style={{}}
                />
              </View>
            )}
            <View style={[styles.row, {marginBottom: 19}]}>
              <MyText
                text={`Tax`}
                fontSize={14}
                fontFamily="medium"
                textColor={'#8F93A0'}
                style={{}}
              />
              <MyText
                text={screenData?.tax > 0 ? '+$' + screenData?.tax : '$0'}
                fontSize={14}
                fontFamily="medium"
                textColor={'#8F93A0'}
                style={{}}
              />
            </View>
            {/* <View style={[styles.row, {marginBottom: 19}]}>
                <MyText
                  text={`Shipping`}
                  fontSize={14}
              
              <Divider style={{ borderColor: '#E0E0E0' }} />
              <View style={[styles.row, { marginTop: 14 }]}>
                <MyText
                  text={`Total`}
                  fontSize={18}
                  fontFamily="medium"
                  textColor={'#455A64'}
                  style={{}}
                />
                <MyText
                 
                  text={'$' + (screenData?.total ? screenData?.total : 0)}
                  fontSize={18}
                  fontFamily="medium"
                  textColor={'#455A64'}
                  style={{}}
                />
              </View>
            </View> */}
        <ViewAll
          text="Order Summary"
          showSeeAll={false}
          style={{marginHorizontal: 5}}
        />
        <View
          style={[
            styles.summaryContainer,
            {
              width: dimensions.SCREEN_WIDTH * 0.9,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: Colors.LIGHT_PURPLE,
              marginTop: 14,
            },
          ]}>
          <View style={[styles.row, {marginBottom: 10}]}>
            <MyText
              text={`Subtotal (${
                screenData?.order_count ? screenData?.order_count : 0
              })`}
              fontSize={16}
              fontFamily={MEDIUM}
              textColor={Colors.DARK_PURPLE}
              style={{}}
            />
            <MyText
              text={'$' + (screenData?.sub_total ? screenData?.sub_total : 0)}
              fontSize={16}
              fontFamily={MEDIUM}
              textColor={Colors.DARK_PURPLE}
              style={{}}
            />
          </View>

          <View style={[styles.row, {marginBottom: 19}]}>
            <MyText
              text={`Tax`}
              fontSize={14}
              fontFamily={MEDIUM}
              textColor={Colors.GREEN}
              style={{}}
            />
            <MyText
              text={screenData?.tax > 0 ? '+$' + screenData?.tax : '$0'}
              fontSize={14}
              fontFamily={MEDIUM}
              textColor={Colors.GREEN}
              style={{}}
            />
          </View>
          <Divider
            style={{borderColor: '#E0E0E0'}}
            color={Colors.LIGHT_PURPLE}
          />
          <View style={[styles.row, {marginTop: 14}]}>
            <MyText
              text={`Total`}
              fontSize={18}
              fontFamily={MEDIUM}
              textColor={'#292D32'}
              style={{}}
            />
            <MyText
              text={'$' + (screenData?.total ? screenData?.total : 0)}
              fontSize={18}
              fontFamily={MEDIUM}
              textColor={'#292D32'}
              style={{}}
            />
          </View>
        </View>
        {/* <ViewAll
              text="Please enter card details"
              showSeeAll={true}
              buttonText="Add New"
               onPress={openAddCardModal}
              style={{
              width:'auto',
                marginTop: 25,
                marginBottom: 21,
                marginHorizontal:10
              }}
            /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 16,
          }}>
          <MyText
            text={'Please enter card details'}
            fontSize={18}
            fontFamily={MEDIUM}
            textColor={'#292D32'}
            style={{}}
          />
          <TouchableOpacity
            onPress={() => openAddCardModal()}
            style={{
              width: 75,
              height: 44,
              borderRadius: 5,
              backgroundColor: GREEN,
              justifyContent: 'center',
              alignItems: 'center',
              // Shadow for iOS
              shadowColor: '#000000',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.05, // Equivalent to `#0000000D` (HEX opacity for 5%)
              shadowRadius: 13,
              // Shadow for Android
              elevation: 4,
            }}>
            <MyText
              text={'Add New'}
              fontSize={14}
              fontFamily={MEDIUM}
              textColor={WHITE}
              style={{}}
            />
          </TouchableOpacity>
        </View>
        {/* {showCard && (
            <CardField
              postalCodeEnabled={true}
              onCardChange={cardDetails => {
                setCard(cardDetails);
              }}
              style={{
                height: 50,
                marginVertical: 10,
                borderWidth: 0.2,
                borderColor: GREEN,
              }}
            />
          )} */}
        <View style={{flex: 1, marginTop: 10}}>
          <ScrollView style={{maxHeight: responsiveHeight(42)}}>
            {cardList?.length > 0 ? (
              cardList?.map(item => (
                <TouchableOpacity
                  key={item.card_id}
                  onPress={() => {
                    setCard(item);
                  }}
                  style={{
                    ...styles.cardContainer,
                    borderWidth: 1,
                    borderColor:
                      item.card_id === card?.card_id
                        ? Colors.THEME_GOLD
                        : Colors.LIGHT_GRAY,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: 10,
                    }}>
                    <MyIcon.AntDesign name="creditcard" size={25} />
                    <View style={styles.cardContainerLeftRow}>
                      <View style={{marginLeft: 12}}>
                        <MyText
                          text={'**** **** **** ' + item.last4}
                          // text={item.card_number}
                          fontSize={16}
                          fontFamily="medium"
                          textColor={'#261313'}
                        />
                        <MyText
                          text={`Expires ${item.exp_month}/${item.exp_year}`}
                          fontSize={14}
                          fontFamily="light"
                          textColor={Colors.LIGHT_GREY}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      deleteCard(item.id);
                    }}></TouchableOpacity>
                </TouchableOpacity>
              ))
            ) : (
              <MyText
                text={`No Cards found`}
                fontFamily="medium"
                fontSize={18}
                textColor={'#455A64'}
                style={{textAlign: 'center', marginTop: 20}}
              />
            )}
          </ScrollView>
          {card && (
            <MyButton
              text={'Pay Now'}
              style={{
                width: dimensions.SCREEN_WIDTH * 0.95,
                marginBottom: 10,
                backgroundColor: Colors.GREEN,
                marginTop: 32,
                alignSelf: 'center',
              }}
              onPress={onConfirm}
            />
          )}
        </View>
        {/* <MyButton
              text="CONFIRM"
              style={{
                width: dimensions.SCREEN_WIDTH * 0.9,
                marginBottom: 10,
                backgroundColor: Colors.THEME_BROWN,
                marginTop: 32,
              }}
              // onPress={openSuccessfulyPurchasedModal}
              onPress={onConfirm}
            // onPress={handlePayClick}
            /> */}
        {/* </KeyboardAwareScrollView> */}

        <SuccessfulyPurchased
          visible={showSuccessfulyPurchasedModal}
          setVisibility={setShowSuccessfulyPurchasedModal}
          gotoMyCourses={gotoMyCourses}
        />
        <AddCard
          visible={showAddCardModal}
          setVisibility={setShowAddCardModal}
          // setShowLoader={setShowLoader}
          userToken={userToken}
          callFunctionAfterAddingcard={(_, status, msg) => {
            if (status) {
              Toast.show({
                type: 'success',
                text1: msg,
              });
            }
            getData();
          }}
          style={{marginBottom: Platform.OS === 'ios' ? keyboardHeight : 0}}
        />
        {/* </ScrollView> */}
      </View>
      <Loader visible={showLoader} />
    </SafeAreaView>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(Billing);
