import axios from "axios";
import { navigate } from "expo-router/build/global-state/routing";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import * as Location from 'expo-location';
import Card from "@/components/Card";
import AqiReport from "./aqireport";
export default function Index({ navigation }: any) {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const key = process.env.NODE_ENV !== "production";
  const [position, setPosition] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function checkPermissionsAndFetchLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission denied! Please enable location services.');
        // Alert.alert("Permission Denied", "Please enable location services for better results.");
        return;
      }

      const pos = await Location.getCurrentPositionAsync({});
      setPosition(pos);

      // Fetch weather automatically if location is available
      fetchWeather(pos.coords.latitude, pos.coords.longitude);
    }

    checkPermissionsAndFetchLocation();
  }, [router]);

  async function fetchWeather(lat: number, lon: number) {
    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=${key}&aqi=yes&q=${lat},${lon}`;
      const response = await axios.get(url);
      router.push({ pathname: "/weather", params: { weatherData: JSON.stringify(response.data) } });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  console.log('Location was successfully granted, ' + JSON.stringify(position));
  async function handleSubmit() {
    setLoading(true);
    let url;
    url = `http://api.weatherapi.com/v1/current.json?key=${key}&aqi=yes&q=${location}`
    const resp = await axios.get(url);
    console.log(resp.data)
    setLoading(false)
    setLocation("");
    router.push({ pathname: "/weather", params: { weatherData: JSON.stringify(resp.data) } });

  }
  return (
    // <AqiReport/>
    <ImageBackground source={require("../assets/images/moon.jpg")} style={styles.background}>
      <View style={styles.container}>
        <TextInput placeholder="Search by city..." style={styles.input} onChangeText={setLocation} />
        <TouchableOpacity activeOpacity={0.8} style={[styles.btn, loading && styles.loading, !location && styles.disabled]} onPress={handleSubmit} disabled={!location || loading}>
          {loading && <ActivityIndicator size="small" color="#FFFFFF" />}
          <Text style={styles.btnText} >{!loading ? "Search" : "Loading"}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    padding: 15,
    width: "100%",
    maxWidth: 300,
    marginBottom: 20,
    backgroundColor: "white",
  },
  btn: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 150,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loading: {
    backgroundColor: "blue",
    opacity: 0.8
  },
  disabled: {
    backgroundColor: "grey",
    opacity: 0.8
  }
});
