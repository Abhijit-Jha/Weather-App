import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Card from '@/components/Card';
import { formatLastUpdated } from '@/helper/time';
import { getAQI } from '@/helper/calculateAQI';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { getWindDirectionText } from '@/helper/getWindDirection';
const Weather = () => {
  const { weatherData } = useLocalSearchParams();
  if (!weatherData) return null;
  const router = useRouter()
  let parsedData;
  try {
    parsedData = typeof weatherData === "string" ? JSON.parse(weatherData) : weatherData;
  } catch (error) {
    console.error("Error parsing weather data:", error);
    return null;
  }
  const pm2 = Number(parsedData.current.air_quality.pm2_5)
  const pm10 = Number(parsedData.current.air_quality.pm10)
  const aqi = getAQI(pm2, pm10);
  const getAQIColor = (aqi) => {
    if (aqi <= 50) return "#2ECC71"; // Green (Good)
    if (aqi <= 100) return "#F1C40F"; // Yellow (Moderate)
    if (aqi <= 200) return "#E67E22"; // Orange (Unhealthy for Sensitive Groups)
    if (aqi <= 300) return "#E74C3C"; // Red (Unhealthy)
    if (aqi <= 400) return "#8E44AD"; // Purple (Very Unhealthy)
    return "#34495E"; // Dark (Hazardous)
  };
  return (
    <ImageBackground source={require("../assets/images/moon.jpg")} style={styles.background} >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>

        <Text style={styles.location}>{parsedData.location.name}</Text>

        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.time}>
            Last updated: {formatLastUpdated(parsedData.current.last_updated)}
          </Text>
        </TouchableOpacity>

        <View style={styles.tempContainer}>
          <Text style={styles.temperature}>{parseInt(parsedData.current.temp_c)}</Text>
          <Text style={styles.degree}>°</Text>
        </View>

        <View style={[styles.aqiContainer, { backgroundColor: getAQIColor(aqi) }]}>
          <Entypo name="leaf" size={24} color="white" />
          <Text style={styles.aqiText}>AQI {aqi}</Text>
        </View>

        {/* items */}
        <View style={styles.itemsContainer}>
          {/* humidity */}
          <Card title={"Humidity"} value={`${parsedData.current.humidity}%`} Icon={<Ionicons name="water-sharp" size={40} color="black" style={styles.icon} />} />
          <Card title={"Wind Speed"} value={`${parsedData.current.wind_mph}`} Icon={<FontAwesome5 name="wind" size={40} color="black" style={styles.icon} />} />
          <Card title={getWindDirectionText(parsedData.current.wind_dir)} value={`${parsedData.current.wind_degree}`} Icon={<FontAwesome5 name="wind" size={40} color="black" style={styles.icon} />} />
          <Card title={"Pressure (mb)"} value={`${parsedData.current.pressure_mb}`} Icon={<FontAwesome5 name="compress-arrows-alt" size={40} color="black" style={styles.icon} />} />
          <Card title={"Heat Index"} value={`${parsedData.current.heatindex_c}`} Icon={<FontAwesome5 name="fire" size={40} color="black" style={styles.icon} />} />
          <Card title={"Dew"} value={`${parsedData.current.dewpoint_c}`} Icon={<MaterialIcons name="dew-point" size={40} color="black" style={styles.icon} />} />
          <Card title={"Gust"} value={`${parsedData.current.gust_mph}`} Icon={<Fontisto name="cloudy-gusts" size={40} color="black" style={styles.icon} />} />
          <Card title={"Real Feel"} value={`${parsedData.current.feelslike_c}`} Icon={<FontAwesome5 name="thermometer-half" size={40} color="black" style={styles.icon} />} />

        </View>
        {/* AQI report */}
        <View style={styles.aqiDetail}>
          <Text style={styles.aqiDetailsText}>Aqi : {aqi}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            router.push({ pathname: "/aqireport", params: { aqiData: JSON.stringify(parsedData.current.air_quality), aqi: aqi, aqiColor: getAQIColor(aqi) } });
          }}>
            <Text style={styles.aqiDetailsText}>Click to view Detailed report <Entypo name="chevron-right" size={15} color="white" style={{ alignSelf: 'center' }} /></Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.footer}>Made with ❤️ by Abhijit Jha</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Weather;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    marginTop: 40,
    padding: 20,
  },
  location: {
    fontSize: 34,
    fontWeight: 'bold',
    color: "white",
  },
  time: {
    color: "white",
    fontSize: 14,
    marginTop: 4,
    opacity: 0.8,
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 4,
  },
  temperature: {
    fontSize: 150,
    letterSpacing: 2,
    fontFamily: "monospace",
    color: "white",
    paddingLeft: 10
  },
  degree: {
    fontSize: 60,
    fontWeight: "bold",
    color: "white",
    marginTop: 15,
  },
  aqiContainer: {
    height: 40,
    alignItems: "center",
    borderRadius: 15,
    width: 120,
    marginTop: 20,
    justifyContent: "center",
    flexDirection: 'row',
    gap: 2,
    marginBottom: 200,
  },
  aqiText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Ensures items are evenly distributed
    gap: 10, // Adjusts spacing between items
    marginBottom: 10,
  }
  ,
  icon: {
    alignSelf: "flex-end",
    position: "absolute",
    right: 19,
    bottom: 25,
  },
  aqiDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Transparent white
    padding: 10,
    margin: 10,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  aqiDetailsText: {
    color: "white", // Change to white for better contrast
    fontWeight: "bold",
  },

  footer: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },

});
