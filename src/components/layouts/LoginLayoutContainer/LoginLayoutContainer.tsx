import React from 'react';
import { ScrollView, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import { languageTxt } from '../../../utils/languageTxt';
import CustomFormInput from '../../shared/CustomFormInput';
import TouchID from 'react-native-touch-id';
import SingleBtn from '../../shared/SingleBtn';
import FaceLogo from '../../../assets/icons/login/FaceID.svg';
import TouchLogo from '../../../assets/icons//login/TouchID.svg';
import { colorConstants } from '../../../utils/colorConstants';
import Id from '../../../assets/icons/login/ID.svg';
import Password from '../../../assets/icons/login/Password.svg';
const optionalConfigObject = {
  title: "Authentication", // Android
  color: "ffffff", // Android,
  fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
}
const optionalConfig = {
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
}

export const LoginLayoutContainer = () => {

  const touchIdAuth = () => {
    TouchID.isSupported(optionalConfig)
      .then(biometryType => {
        console.log('true', biometryType)
        if (biometryType === 'TouchID') {
          TouchID.authenticate("Authenticate With Biometric", optionalConfigObject)
            .then((success: any) => {
              console.log(success)
              Alert.alert('Authenticated Successfully');
            })
            .catch((error: any) => {
              Alert.alert('Authentication Failed', error.toString());
            });
        } else {
          console.log('TouchID is supported.');
          TouchID.authenticate("Authenticate With Biometric", optionalConfigObject)
            .then((success: any) => {
              console.log(success)
              Alert.alert('Authenticated Successfully');
            })
            .catch((error: any) => {
              Alert.alert('Authentication Failed', error.toString());
            });
        }
      })
      .catch(error => {
        // Failure code
        Alert.alert('TouchID Not Supported', error.toString());
      });

  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}></View>
      <View style={styles.bodyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.loginText}>{languageTxt.login}</Text>
          <Text style={styles.signInText}>{languageTxt.signInToContinueTxt}</Text>
        </View>
        <View style={styles.inputContainer}>
          <CustomFormInput placeHolder={languageTxt.email} mode='flat' LeftIcon={<Id width={'15'}
            height={'15'}
            fill={colorConstants.primary} />} />
            
          <CustomFormInput placeHolder={languageTxt.password} mode='flat' LeftIcon={<Password width={'15'}
            height={'15'}
            fill={colorConstants.primary} />}/>
          <View style={styles.biometricStyle}>
            <TouchableOpacity >
              <Text style={styles.faceIdContainer}>
                <FaceLogo width={'13'}
                  height={'13'}
                  fill={colorConstants.primary} /> {languageTxt.faceIdTxt}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={touchIdAuth}>
              <Text style={styles.touchIdContainer}><TouchLogo width={'15'}
                height={'15'}
                fill={colorConstants.primary} />{languageTxt.biometricTxt}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <SingleBtn text={languageTxt.login} width='80%' onPressCB={() => { }} />
        </View>
      </View>

    </SafeAreaView>
  )
}