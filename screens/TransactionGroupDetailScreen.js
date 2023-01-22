import { useContext, useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import ErrorModal from '../components/ErrorModal';
import { SharedContext } from '../store/context/SharedContext';
import { colors } from '../utils/lib/Colors';
import Apibase from '../utils/lib/Apibase'
import { links } from '../utils/lib/Links';
import { Ionicons } from '@expo/vector-icons';
import { width_screen } from '../utils/Dimensions';
import Input from '../components/Input';

let resultCount = 0

export default function TransactionGroupDetailScreen(props) {
    const currentContext = useContext(SharedContext)
    const { transactionGroupId } = props.route.params

    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorModalBodyText, setErrorModalBodyText] = useState()
    const [transactions, setTransactions] = useState([])
    const [associationOrderType, setAssociationOrderType] = useState(null)
    const [count, setCount] = useState()
    const [filterText, setFilterText] = useState()
    const [showFilterInput, setShowFilterInput] = useState(false)

    function OnErrorModalButtonPressed() {
        setShowErrorModal(false)
        currentContext.setShowOverlay(false)
    }

    function GetTransactionsByGroupId() {
        currentContext.setShowOverlay(true)
        currentContext.setShowGlobalLoading(true)

        Apibase.Get({
            url: links.transactions + "?groupId=" + transactionGroupId.toString(),
            bearerToken: currentContext.user.token,
            successFunction: (data) => {
                setTransactions(data.data)
                resultCount = data.data.length
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

    function HandleData() {
        let handledData = transactions.slice()

        if (filterText && filterText.length > 1) {
            handledData = handledData.filter(item =>
                item.associations.toLowerCase().includes(filterText.toLowerCase())
            )
        }

        if (associationOrderType !== null) {
            handledData = handledData.filter(item =>
                item.isPositive == associationOrderType)
        }

        resultCount = handledData.length
        if (resultCount !== count) {
            setCount(resultCount)
        }
        return handledData
    }

    useEffect(() => {
        GetTransactionsByGroupId()
    }, [])


    const renderItem = useCallback(({ item }) => (
        <TouchableOpacity key={item.id}
            style={styles.eachAssociationGroupContainer}>
            <View style={styles.eachAssocationGroupTopRow}>
                {item.associations.split(',').map((eachItem, index) =>
                    <Text style={styles.associationsText} key={index}>{eachItem}</Text>)}
                <View style={styles.scoresAndArrowContainer}>
                    <View>
                        <Text style={styles.supportText}>Support: {item.support.toFixed(5)}</Text>
                        <Text style={styles.liftText}>Lift: {item.lift.toFixed(5)}</Text>
                        <Text style={styles.confidenceText}>Confidence: {item.confidence.toFixed(5)}</Text>
                    </View>
                    <View style={styles.rightArrowContainer}>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    ), []);

    return (
        <>
            <ErrorModal show={showErrorModal} text={errorModalBodyText} onSuccess={OnErrorModalButtonPressed} />
            <View style={styles.container}>
                <View style={styles.buttonsContainer}>
                    <CustomButton
                        text={"All"}
                        onPress={() => setAssociationOrderType(null)}
                        containerStyle={styles.allButton}
                        buttonColor={colors.secondary}
                    />
                    <CustomButton
                        text={"Strong associations"}
                        onPress={() => setAssociationOrderType(1)}
                        containerStyle={styles.strongButton}
                        buttonColor={colors.secondary}
                    />
                    <CustomButton
                        text={"Weak associations"}
                        onPress={() => setAssociationOrderType(0)}
                        containerStyle={styles.leastButton}
                        buttonColor={colors.secondary}
                    />
                </View>
                <View style={styles.filterToggleAndCountContainer}>
                    <TouchableOpacity onPress={() => setShowFilterInput(!showFilterInput)}>
                        <Text style={styles.textFilterLabel}>{showFilterInput ? "Hide text filter" : "Show text filter"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.resultCountText}>Result count: {count}</Text>
                </View>
                {showFilterInput &&
                    <Input
                        style={styles.filterTextInputContainer}
                        value={filterText}
                        onChangeText={setFilterText}
                        placeholder={"Filter text"}
                    />
                }

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={HandleData()}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    initialNumToRender={4}
                    maxToRenderPerBatch={10}
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
    eachAssociationGroupContainer: {
        flex: 1,
        borderBottomWidth: 0.2,
        borderColor: colors.primary,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    eachAssocationGroupTopRow: {
    },
    associationsText: {
        fontSize: 14,
    },
    supportText: {
        fontSize: 12,
        marginTop: 4,
        fontWeight: '500'
    },
    liftText: {
        fontSize: 12,
        marginTop: 2,
        fontWeight: '500'
    },
    confidenceText: {
        fontSize: 14,
        marginTop: 4,
        fontWeight: '800'
    },
    scoresAndArrowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    rightArrowContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        marginBottom: 12
    },
    allButton: {
        width: width_screen * .2
    },
    strongButton: {
        width: width_screen * .3
    },
    leastButton: {
        width: width_screen * .3
    },
    filterToggleAndCountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 12
    },
    resultCountText: {
        fontWeight: '600',
    },
    textFilterLabel: {
        fontWeight: '500',
        color: colors.secondary
    },
    filterTextInputContainer: {
        marginBottom: 12,
    }

});
