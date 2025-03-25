import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getAQIAdvice } from '@/helper/aqiMessage';
import DisplayAQI from '@/components/displayAQI';

const AqiReport = () => {
    const { aqiData, aqi, aqiColor } = useLocalSearchParams();

    const { level, message } = getAQIAdvice(Number(aqi))
    let parsedData;
    try {
        parsedData = typeof aqiData === 'string' ? JSON.parse(aqiData) : aqiData;
    } catch (error) {
        console.error('Error parsing AQI data:', error);
        return <Text >Invalid AQI Data</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>Air Quality Index</Text>
                <View style={{ flexDirection: "row", marginBottom: 10, gap: 10 }}>
                    <Text style={[styles.aqi, { color: aqiColor }]}>{aqi}</Text>
                    <Text style={[styles.level, { color: aqiColor }]}>{level}</Text>
                </View>
                <Text style={{ color: "white", fontSize: 18 }}>
                    {message}
                </Text>

                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-evenly', marginVertical: 25 }}>
                    <DisplayAQI value={parsedData.pm2_5?.toFixed(2)} text={"PM2.5"} />
                    <DisplayAQI value={parsedData.pm10?.toFixed(2)} text={"PM10"} />
                    <DisplayAQI value={parsedData.o3?.toFixed(2)} text={"O₃"} />
                    <DisplayAQI value={parsedData.so2?.toFixed(2)} text={"SO₂"} />
                    <DisplayAQI value={parsedData["us-epa-index"]?.toFixed(2)} text={"US"} />
                    <DisplayAQI value={parsedData["gb-defra-index"]?.toFixed(2)} text={"GB"} />
                </View>
            </View>

            <Text style={styles.footer}>Made with ❤️ by Abhijit Jha</Text>
        </View>
    )
}

export default AqiReport

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E1E2C",
        padding: 30,
        paddingVertical: 40,
        justifyContent: 'space-between', // Pushes the footer to bottom
    },
    content: {
        flex: 1, // Takes up remaining space above footer
    },
    text: {
        color: "#00D4FF", // Neon Blue
        fontSize: 30,
        marginBottom: 10
    },
    aqi: {
        fontSize: 60,
    },
    level: {
        alignSelf: 'flex-end',
        fontSize: 30,
        marginBottom : 8
    },
    footer: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10, // Add some space at bottom
    },
})
