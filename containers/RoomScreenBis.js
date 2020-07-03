import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import MapView from "react-native-maps";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";

const RoomScreen = () => {
  const { params } = useRoute();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  console.log(route.params.id);
  const [data, setData] = useState("");

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < data.ratingValue) {
      stars.push(<FontAwesome key={i} name="star" size={24} color="gold" />);
    } else {
      stars.push(<FontAwesome key={i} name="star" size={24} color="grey" />);
    }
  }

  const fetchData = async () => {
    const response = await axios.get(
      `https://airbnb-api.herokuapp.com/api/room/${params.id}`
    );
    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <View style={styles.offer}>
        <View>
          <ImageBackground
            style={styles.offerImage}
            source={{
              uri: data.photos[0],
            }}
          >
            <View
              style={{
                backgroundColor: "black",
                width: 80,
                position: "absolute",
                bottom: 20,
                padding: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                {data.price} €
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.container}>
            <View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={{ fontSize: 17 }}>
                    {data.title}
                  </Text>
                  <View style={{ flexDirection: "row" }}>{stars}</View>
                  <Text>
                    {data.reviews} <Text>avis</Text>
                  </Text>
                </View>
                <Image
                  style={styles.picture}
                  source={{
                    uri: data.user.account.photos[0],
                  }}
                />
              </View>
            </View>
            <Text numberOfLines={4} style={{ paddingTop: 20, fontSize: 16 }}>
              {data.description}
            </Text>
            <MapView
              style={{ width: "100%", height: 130, marginTop: 20 }}
              initialRegion={{
                latitude: data.loc[1],
                longitude: data.loc[0],
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              <MapView.Marker
                coordinate={{ latitude: data.loc[1], longitude: data.loc[0] }}
              />
            </MapView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  offer: {
    width: "100%",
    height: 280,
    marginBottom: 10,
  },
  offerImage: {
    width: "100%",
    height: 200,
  },
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  picture: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    marginTop: 5,
  },
});

export default RoomScreen;
