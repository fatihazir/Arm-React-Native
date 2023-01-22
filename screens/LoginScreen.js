import { useContext, useState } from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import ErrorModal from '../components/ErrorModal';
import Input from '../components/Input';
import SuccessModal from '../components/SuccessModal';
import { SharedContext } from '../store/context/SharedContext';
import { height_screen, width_screen } from '../utils/Dimensions';
import { useNavigation, StackActions } from '@react-navigation/native';
import { colors } from '../utils/lib/Colors';
import Routes from '../utils/Routes';
import Apibase from '../utils/lib/Apibase'
import { links } from '../utils/lib/Links';

export default function LoginScreen() {
    const currentContext = useContext(SharedContext)
    const { dispatch } = useNavigation()
    const navigation = useNavigation()

    const [email, setEmail] = useState("user@gmail.com")
    const [password, setPassword] = useState("12345")
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorModalBodyText, setErrorModalBodyText] = useState()
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    function OnGoToSignUpPagePressed() {
        navigation.navigate(Routes.RegisterScreen)
    }

    function OnErrorModalButtonPressed() {
        setShowErrorModal(false)
        currentContext.setShowOverlay(false)
    }

    function Login() {
        currentContext.setShowOverlay(true)
        currentContext.setShowGlobalLoading(true)

        let body = {
            "Email": email,
            "Password": password,
        }

        Apibase.Post({
            url: links.login,
            body,
            successFunction: (data) => {
                currentContext.SetUser(data.data)
                currentContext.setShowGlobalLoading(false)
                setShowSuccessModal(true)

                setTimeout(() => {
                    setShowSuccessModal(false)
                    currentContext.setShowOverlay(false)
                    dispatch(StackActions.replace(Routes.MainBottomTabNavigator));
                }, 1500);
            },
            errorFunction: (data) => {
                currentContext.setShowGlobalLoading(false)
                setErrorModalBodyText(data.message)
                setShowErrorModal(true)
            },
            exceptionFunction: (err) => {
                currentContext.setShowGlobalLoading(false)
                setErrorModalBodyText(err.toString())
                setShowErrorModal(true)
            }
        })
    }
    return (
        <>
            <ErrorModal show={showErrorModal} text={errorModalBodyText} onSuccess={OnErrorModalButtonPressed} />
            <SuccessModal show={showSuccessModal} text={"User login success. Redirecting..."} onSuccess={() => { }} />
            <ScrollView style={styles.container}>
                <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                    <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={require('../assets/authPagePhoto.webp')}
                    />
                    <Input
                        style={styles.eachInput}
                        value={email}
                        onChangeText={setEmail}
                        placeholder={"Email"}
                        keyboardType="email-address"
                    />
                    <Input
                        style={styles.eachInput}
                        value={password}
                        onChangeText={setPassword}
                        placeholder={"Password"}
                        secureTextEntry={true}
                    />
                    <CustomButton
                        text={"Login"}
                        onPress={Login}
                        containerStyle={styles.registerButtonContainer}
                        buttonColor={colors.primary}
                    />
                    <Text style={styles.signInText}>Do not you have an account? </Text>
                    <CustomButton
                        text={"Sign up"}
                        onPress={OnGoToSignUpPagePressed}
                        containerStyle={styles.signInButtonContainer}
                        buttonColor={colors.secondary}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: 'white'
    },
    eachInput: {
        marginVertical: 10
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: height_screen * 0.05
    },
    registerButtonContainer: {
        height: 50,
        width: width_screen * 0.80,
        marginTop: 16,
        alignSelf: 'center'
    },
    signInButtonContainer: {
        marginTop: 16,
        alignSelf: 'center',
        height: 40,
        width: width_screen * 0.5
    },
    signInText: {
        marginTop: 20,
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600',
    }
});
