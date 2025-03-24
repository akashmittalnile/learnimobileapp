import { View, Text ,SafeAreaView,ScrollView,StyleSheet} from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import Background from 'assets/svgs/background.svg';
import Header from 'component/Header/Header';
import CertificateCard from 'component/Certificate/CertificateCard';
import OrderHistoryTab from 'component/OrderHistory/OrderHistoryTab';
import MySearchBarForHome from 'component/MySearchBarForHome';
  const OderHistory = ({navigation}) => {
    const [orderHistoryData, setOrderHistoryData] = useState([
        {
          id: '1',
          creatorName: `Max Bryrant`,
          courseImg: '',
          courseName: `O'Reilly's tattoo machine Motor`,
          courseRating: '4.7',
          courseFee: '399.00',
          status: 'Picked-up',
          orderId: 'HBD898DMND8333',
          date: '26 Juny 2023 9:30AM',
          ago: '10h ago',
        },
        {
          id: '2',
          creatorName: `Nikhil Sam`,
          courseImg: '',
          courseName: `O'Reilly's tattoo machine Motor`,
          courseRating: '4.7',
          courseFee: '399.00',
          status: 'Packed',
          orderId: 'HBD898DMND8333',
          courseCompletedDate: '26 Juny 2023 9:30AM',
          ago: '10h ago',
          date: '26 Juny 2023 9:30AM',
        },
      ]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Background style={StyleSheet.absoluteFill} />

        <Header
      heading={'Order History'}
      showLearneLogo={false}
      showCart={false}
      showNotification={false}
      showBackButton={true}></Header>
          <MySearchBarForHome
                        disabled
                        placeHolder={'Search'}
                      />
             <OrderHistoryTab
                  orderHistoryData={orderHistoryData}
                  navigation={navigation}
                // viewDetails={viewDetails}
                />
          </ScrollView>
          </SafeAreaView>
  )
}

export default OderHistory