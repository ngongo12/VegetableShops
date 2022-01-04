import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DefautText } from './AppTexts';

const CountDownTime = props => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const saleHours = [9, 12, 15, 18, 21];
    let nextSaleTime = currentTime;
    let interval = null;
    const [hour, setHour] = useState();
    const [minute, setMinute] = useState();
    const [sencond, setSencond] = useState();
    const currentHour = currentTime.getHours();
    

    //console.log('nextSale time, ', nextSaleTime.toLocaleTimeString());
    useEffect(() => {
        getNextSaleTime();
    }, [])

    useEffect(() => {
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => {
            //setCurrentTime(new Date())
            getDistanceTime()
        }, 1000);
    }, [nextSaleTime])

    const getNextSaleTime = () => {
        saleHours.forEach(e => {
            if (currentHour < e) {
                //console.log('nextSale time, ', e);
                nextSaleTime.setHours(e, 0, 0);
    
                return;
            }
            //Nếu lớn hơn 21 giờ sẽ là ngày tiếp theo
            nextSaleTime = new Date(currentTime.getTime() + 1000 * 60 * 60 * 24);
            nextSaleTime.setHours(9, 0, 0);
        })
    }

    const getDistanceTime = () => {
        const myCurrentTime = new Date();
        if(myCurrentTime > nextSaleTime){
            getNextSaleTime()
        }
        let distance = (nextSaleTime.getTime() - myCurrentTime.getTime()) / 1000;
        let s = Math.round(distance % 60);
        if (s < 10) {
            s = '0' + s;
        }
        distance = Math.round(distance / 60);
        let m = distance % 60;
        if (m < 10) {
            m = '0' + m;
        }
        let h = Math.round(distance / 60);
        if(h < 10){
            h = '0' + h;
        }
        if(hour !== h) setHour(h);
        if(minute !== m)setMinute(m);
        if(sencond !== s)setSencond(s);
    }

    return (
        <>
        {hour && <View style={styles.container}>
            <DefautText style={styles.box}>{hour}</DefautText>
            <DefautText style={styles.text}>:</DefautText>
            <DefautText style={styles.box}>{minute}</DefautText>
            <DefautText style={styles.text}>:</DefautText>
            <DefautText style={styles.box}>{sencond}</DefautText>
        </View>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    box: {
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 3,
        backgroundColor: 'white',
        color: '#111',
        fontSize: 11
    },
    text: {
        color: '#fff',
        paddingHorizontal: 2,
        fontWeight: 'bold'
    }
})

export default CountDownTime
