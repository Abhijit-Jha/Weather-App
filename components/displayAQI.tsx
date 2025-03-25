import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DisplayAQI = ({ value, text }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.val}>{parseFloat(value).toFixed(1)}</Text>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

export default DisplayAQI

const styles = StyleSheet.create({
    text: {
        color: 'grey',
        fontSize: 15
    },
    val: {
        color: 'yellow',
        fontSize: 20
    }
})