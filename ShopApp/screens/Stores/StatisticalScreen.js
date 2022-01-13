import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    TextInput,
    ToastAndroid
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../actions/userActions';
import { useIsFocused } from '@react-navigation/native';
import { DefautText, SellPrice, Title } from '../../components/Text/AppTexts';
import { DARK_GREEN, LIGHT_GREEN, MainColor, RED } from '../../constants/colors';
import { orderURL } from '../../api/orderAPI';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import FastImage from 'react-native-fast-image';

const StatisticalScreen = props => {
    const { user: { user } } = props;
    const [selectedMonth, setSelectedMonth] = useState();
    const [statistical, setStatistical] = useState();
    const [months, setMonths] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        const temp = getTimeListData();
        setMonths(temp);
    }, [])
    useEffect(() => {
        if (months) {
            setSelectedMonth(months[0])
        }
    }, [months])

    useEffect(() => {
        if (selectedMonth && isFocused) {
            fetchStatiscal();
        }
    }, [selectedMonth, isFocused])

    const fetchStatiscal = () => {
        fetch(`${orderURL}statistic?uid=${user._id}&time=${selectedMonth?.y}-${selectedMonth?.m}`)
            .then(res => res.json())
            .then(res => setStatistical(res))
            .catch(e => console.log(e));
    }
    return (
        <View style={styles.container}>
            <View style={[styles.row, { paddingHorizontal: 10, backgroundColor: '#fff' }]}>
                <DefautText style={{ flex: 1 }}>Chọn tháng: </DefautText>
                <Picker
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedMonth(itemValue)
                    }
                    style={{ flex: 2 }}
                >
                    {
                        months?.map((e, index) => (
                            <Picker.Item label={`Tháng ${e?.m}, Năm ${e?.y}`} key={index} value={e} style={{ fontSize: 13 }} />
                        )
                        )
                    }
                </Picker>
            </View>
            <ScrollView>
                <Chart data={statistical?.orderPerDay} />
                <CountOrder data={statistical?.countOrder} />
                <TopSale data={statistical?.products} />
            </ScrollView>
        </View>
    )
}

const getTimeListData = () => {
    const current = new Date();
    let data = [];
    let m = current.getMonth() + 1;
    let y = current.getFullYear();
    for (let i = 0; i <= 12; i++) {
        let temp = {
            y, m,
            toString: () => {
                return (y + '-' + m);
            }
        };
        data.push(temp);
        m--;
        if (m <= 0) {
            m = 12;
            y--
        }
    }

    return data;
}

const CountOrder = props => {
    const { data } = props;
    return (
        <View style={{ padding: 10 }}>
            <DefautText style={{ fontSize: 15, fontWeight: 'bold', paddingBottom: 10 }}>Thống kê đơn hàng</DefautText>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <View style={[styles.box,]}>
                    <DefautText style={styles.boxNum}>{data?.created}</DefautText>
                    <DefautText>Đã tạo</DefautText>
                </View>
                <View style={[styles.box,]}>
                    <DefautText style={styles.boxNum}>{data?.confirm}</DefautText>
                    <DefautText>Xác nhận</DefautText>
                </View>
            </View>
            <View style={[styles.row, { justifyContent: 'space-between', marginVertical: 10 }]}>
                <View style={[styles.box,]}>
                    <DefautText style={styles.boxNum}>{data?.done}</DefautText>
                    <DefautText>Hoàn thành</DefautText>
                </View>
                <View style={[styles.box,]}>
                    <DefautText style={[styles.boxNum, { color: RED }]}>{data?.cancel}</DefautText>
                    <DefautText>Đã hủy</DefautText>
                </View>
            </View>
        </View>
    )
}

const TopSale = props => {
    const { data } = props;
    return (
        <>
        <View style={{ padding: 10, paddingTop: 0 }}>
            <DefautText style={{ fontSize: 15, fontWeight: 'bold' }}>Top sản phẩm</DefautText>
            {
                data?.length !== 0 ? data?.map((e, index) => (
                    <View style={styles.productContent} key={index}>
                        <FastImage source={{uri: e?.images[0]}} style={styles.productImage} />
                        <View style={{paddingHorizontal: 10, justifyContent: 'center'}}>
                            <DefautText>{e?.name}</DefautText>
                            <View style={[styles.row, {alignItems: 'center', justifyContent: 'space-between'}]}>
                                
                                <DefautText>Tổng tiền: {' '}
                                <SellPrice style={{fontSize: 13}}>{e?.totalPrice}</SellPrice>
                                <DefautText> (Bán ra: {e?.amount})</DefautText>
                                </DefautText>
                            </View>
                        </View>
                    </View>
                
                ))
                : <DefautText>Không bán được sản phẩm nào</DefautText>
            }
        </View>
        </>
    )
}

const Chart = props => {
    const { data } = props;
    const [weeks, setWeeks] = useState(['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5']);
    const [values, setValues] = useState(new Array(5).fill(0));
    useEffect(() => {
        if (data) {
            changeToWeek();
        }
    }, [data])
    const changeToWeek = () => {
        let tempValue = new Array(5).fill(0);
        data.forEach((element, index) => {
            const i = Math.floor((index + 1) / 7);
            tempValue[i] += element;
        });
        setValues(tempValue);
    }
    return (
        <View>
            {data && <LineChart
                data={{
                    labels: weeks,
                    datasets: [
                        {
                            data: values
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: LIGHT_GREEN,
                    backgroundGradientFrom: DARK_GREEN,
                    backgroundGradientTo: LIGHT_GREEN,
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "2",
                        strokeWidth: "2",
                        stroke: DARK_GREEN
                    }
                }}
                bezier
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    box: {
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
        borderRadius: 10
    },
    boxNum: {
        fontSize: 20,
        color: MainColor,
        fontWeight: 'bold'
    },
    productContent: {
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: 5,
        marginTop: 10
    },
    productImage: {
        width: 50,
        height: 50,
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(StatisticalScreen)