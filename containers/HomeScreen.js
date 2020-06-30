import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [offers, setOffers] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://airbnb-api.herokuapp.com/api/room?city=paris"
    );
    setOffers(response.data.rooms);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <View>
        <FlatList
          data={offers}
          renderItem={(obj) => {
            const stars = [];
            for (let i = 0; i < 5; i++) {
              if (i < obj.item.ratingValue) {
                stars.push(
                  <FontAwesome key={i} name="star" size={24} color="gold" />
                );
              } else {
                stars.push(
                  <FontAwesome key={i} name="star" size={24} color="grey" />
                );
              }
            }
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Room", { id: obj.item._id });
                }}
              >
                <View style={styles.container}>
                  <View style={styles.offer}>
                    <View>
                      <ImageBackground
                        style={styles.offerImage}
                        source={{
                          uri: `${obj.item.photos[0]}`,
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
                            {obj.item.price} €
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>
                    <View>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                          <Text numberOfLines={1} style={{ fontSize: 17 }}>
                            {obj.item.title}
                          </Text>
                          <View style={{ flexDirection: "row" }}>{stars}</View>
                          <Text>
                            {obj.item.reviews} <Text>avis</Text>
                          </Text>
                        </View>
                        <Image
                          style={styles.picture}
                          source={{
                            uri: obj.item.user.account.photos[0],
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => {
            return String(item._id);
          }}
        />
      </View>

      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  offer: {
    width: 330,
    height: 280,
    marginBottom: 10,
    backgroundColor: "lightgrey",
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
  },
});
