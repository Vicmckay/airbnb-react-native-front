import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { View, Text } from "react-native";
import axios from "axios";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const Aroundme = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [location, setLocation] = useState({});

  useEffect(() => {
    const askPermission = async () => {
      // Demander permission
      const obj = await Permissions.askAsync(Permissions.LOCATION);
      if (obj.status === "granted") {
        // Obtenir GPS
        const location = await Location.getCurrentPositionAsync({});

        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setIsLoading(false);
      } else {
        alert("You have to accept permission");
      }
    };

    askPermission();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://airbnb-api.herokuapp.com/api/room/around?latitude=${latitude}&longitude=${longitude}`
        );

        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (latitude && longitude) {
      fetchData();
    }
  }, [latitude, longitude]);

  return isLoading ? (
    <Text>En cours de chargement...</Text>
  ) : (
    <View>
      <MapView style={{ width: "100%", height: "100%" }}></MapView>

      <Text>Aroundme</Text>
    </View>
  );
};

export default Aroundme;
