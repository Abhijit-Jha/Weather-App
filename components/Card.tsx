import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'


const Card = ({ title, value, Icon }: { title: string; value: string; Icon: JSX.Element }) => {
    return (
        <View style={styles.container}>
            <BlurView intensity={30} tint="light" style={styles.glass}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.value}>{value}</Text>
                </View>
                {Icon}
            </BlurView>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: "48%",
        overflow: 'hidden',
        borderRadius: 18,

    },
    title: {
        fontWeight: '600', 
        fontSize: 20,
        marginBottom: 5,
        paddingHorizontal: 5
    },
    value: {
        fontSize: 20,
        paddingHorizontal: 10
    },
    glass: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: 12,
        borderRadius: 10
    },
    
})
