import { useContext, useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import ErrorModal from '../components/ErrorModal';
import { SharedContext } from '../store/context/SharedContext';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/lib/Colors';
import Routes from '../utils/Routes';
import Apibase from '../utils/lib/Apibase'
import { links } from '../utils/lib/Links';
import { width_screen } from '../utils/Dimensions';

export default function HomeScreen() {
    const currentContext = useContext(SharedContext)
    const navigation = useNavigation()

    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorModalBodyText, setErrorModalBodyText] = useState()
    const [associations, setAssociations] = useState([])

    function OnErrorModalButtonPressed() {
        setShowErrorModal(false)
        currentContext.setShowOverlay(false)
    }

    function GetTransactionGroups() {
        currentContext.setShowOverlay(true)
        currentContext.setShowGlobalLoading(true)

        Apibase.Get({
            url: links.transactionGroups + "?userId=" + currentContext.user.id.toString(),
            bearerToken: currentContext.user.token,
            successFunction: (data) => {
                setAssociations(data.data)
                currentContext.setShowGlobalLoading(false)
                currentContext.setShowOverlay(false)
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

    function OnNavigateToTransactionGroupPressed(transactionGroupId, item) {
        currentContext.setDetailScreenTitle(item.alias)
        navigation.navigate(Routes.TransactionGroupDetailScreen, { transactionGroupId })
    }

    useEffect(() => {
        GetTransactionGroups()
    }, [])

    const renderItem = useCallback(({ item }) => (
        <TouchableOpacity onPress={() => OnNavigateToTransactionGroupPressed(item.id, item)} key={item.id} style={styles.eachTransactionGroupContainer}>
            <View style={styles.eachTransactionGroupTopRow}>
                <Text style={styles.aliasText}>{item.alias}</Text>
                <Text style={styles.eachResultCountText}>Result count: {item.resultCount}</Text>
            </View>
            <Text style={styles.createdAtText}>{item.createdAt.replace('T', ' - ')}</Text>
        </TouchableOpacity>
    ), []);

    return (
        <>
            <ErrorModal show={showErrorModal} text={errorModalBodyText} onSuccess={OnErrorModalButtonPressed} />
            <View style={styles.container}>
                <CustomButton
                    text={"Refresh"}
                    onPress={GetTransactionGroups}
                    containerStyle={styles.signInButtonContainer}
                    buttonColor={colors.secondary}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={associations}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 22,
        backgroundColor: 'white',
        flex: 1
    },
    eachTransactionGroupContainer: {
        flex: 1,
        borderBottomWidth: 0.2,
        borderColor: colors.primary,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    eachTransactionGroupTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    aliasText: {
        fontSize: 16,
        fontWeight: '500'
    },
    eachResultCountText: {
        fontSize: 14,
        minWidth: '35%'
    },
    createdAtText: {
        fontSize: 10,
        paddingTop: 6
    },
    signInButtonContainer: {
        marginBottom: 12,
        alignSelf: 'flex-end',
        height: 40,
        width: width_screen * 0.3
    },
});
