import { useContext, useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import { SharedContext } from '../store/context/SharedContext';
import { height_screen, width_screen } from '../utils/Dimensions';
import { colors } from '../utils/lib/Colors';
import ErrorModal from '../components/ErrorModal';
import { useNavigation, StackActions } from '@react-navigation/native';
import Routes from '../utils/Routes';

export default function ProfileScreen() {
    const currentContext = useContext(SharedContext)
    const { dispatch } = useNavigation()
    const { user } = currentContext

    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorModalBodyText, setErrorModalBodyText] = useState()

    function OnSignOutPressed() {
        currentContext.setShowOverlay(true)
        setErrorModalBodyText("Are you sure you want to sign out?")
        setShowErrorModal(true)
    }

    function OnErrorModalButtonPressed() {
        setShowErrorModal(false)
        setTimeout(() => {
            currentContext.setShowOverlay(false)
            currentContext.RemoveUser()
            dispatch(StackActions.replace(Routes.LoginScreen));
        }, 300);

    }

    return (
        <>
            <ErrorModal show={showErrorModal} text={errorModalBodyText} buttonText={"Sign out"} onSuccess={() => OnErrorModalButtonPressed()} />
            <View
                style={styles.container}>
                <Image
                    style={styles.image}
                    resizeMode='cover'
                    source={{ uri: user.photoUrl }}
                />
                <Text style={styles.texts}>Email: {user.email}</Text>
                <Text style={styles.texts}>First name: {user.firstName}</Text>
                <Text style={styles.texts}>Last name: {user.lastName}</Text>
                <CustomButton
                    text={"Sign out"}
                    onPress={() => OnSignOutPressed()}
                    containerStyle={styles.buttonContainer}
                    buttonColor={colors.secondary}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 22,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: height_screen * 0.05,
        borderRadius: 50
    },
    texts: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 6
    },
    buttonContainer: {
        height: 50,
        width: width_screen * .5,
        position: 'absolute',
        bottom: height_screen * .1,
    }
});
