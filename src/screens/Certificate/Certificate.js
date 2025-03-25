import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Background from 'assets/svgs/background.svg';
import Header from 'component/Header/Header';
import CertificateCard from 'component/Certificate/CertificateCard';
import OrderHistoryTab from 'component/OrderHistory/OrderHistoryTab';
import {API_Endpoints, GetApiWithToken} from 'global/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoDataFound from 'component/NoDataFound/NoDataFound';
import ListLoader from 'component/SkeltonLoader/ListLoader';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from 'global/index';
import RNFetchBlob from 'react-native-blob-util';

const Certificate = () => {
  const navigation = useNavigation();
  const [certificatesData, setCertificatesData] = useState(false);
  const [loader, setLoader] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    getCertificatesData();
  }, []);

  const getCertificatesData = async () => {
    setLoader(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await GetApiWithToken(API_Endpoints.certificates, token);
      if (response?.data?.status) {
        console.log('qwer',response?.data?.data )
        setCertificatesData(response?.data?.data);
      }
    } catch (err) {
      console.log('error in getting certificates data', err);
    } finally {
      setLoader(false);
    }
  };

  const downloadPDF = async url => {
    try {
      let pdfUrl = url;
      let DownloadDir =
        Platform.OS == 'ios'
          ? RNFetchBlob.fs.dirs.DocumentDir
          : RNFetchBlob.fs.dirs.DownloadDir;
      const {dirs} = RNFetchBlob.fs;
      const dirToSave =
        Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
      const configfb = {
        fileCache: true,
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: 'Learni',
        path: `${dirToSave}.pdf`,
      };
      const configOptions = Platform.select({
        ios: {
          fileCache: configfb.fileCache,
          title: configfb.title,
          path: configfb.path,
          appendExt: 'pdf',
        },
        android: configfb,
      });
      Platform.OS == 'android'
        ? RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              path: `${DownloadDir}/.pdf`,
              description: 'Learni',
              title: `${courseData.name} certificate.pdf`,
              mime: 'application/pdf',
              mediaScannable: true,
            },
          })
            .fetch('GET', `${pdfUrl}`)
            .then(res => {})
            .catch(error => {
              console.warn(error.message);
            })
        : RNFetchBlob.config(configOptions)
            .fetch('GET', `${pdfUrl}`, {})
            .then(res => {
              if (Platform.OS === 'ios') {
                RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
                RNFetchBlob.ios.previewDocument(configfb.path);
              }
            })
            .catch(e => {});
    } catch (error) {
      console.error('error in downloadCertificate', error);
    }
  };

  const onPressViewCertificate = url => {
    navigation.navigate(ScreenNames.WEB_VIEW_PAGE, {url});
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <Background style={StyleSheet.absoluteFill} />

          <Header
            heading={'Certificates'}
            showLearneLogo={false}
            showCart={false}
            showNotification={false}
            showBackButton={true}></Header>
          {Array.isArray(certificatesData) && certificatesData?.length > 0 && (
            <CertificateCard
              orderHistoryData={certificatesData}
              onPressViewCertificate={onPressViewCertificate}
              onPressDownloadCertificate={downloadPDF}
              // viewDetails={viewDetails}
            />
          )}
          {Array.isArray(certificatesData) &&
            certificatesData?.length === 0 && <NoDataFound />}
        </ScrollView>
        {loader && <ListLoader />}
      </SafeAreaView>
    </>
  );
};

export default Certificate;

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  pdfContainer: {
    height: responsiveHeight(70),
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
