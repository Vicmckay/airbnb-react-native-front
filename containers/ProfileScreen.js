import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default function SettingsScreen({ userToken, setToken, userId }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      setUser(response.data);
      console.log(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <View>
      {isLoading === true ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity
          style={styles.image}
          onPress={async () => {
            const cameraPerm = await Permissions.askAsync(Permissions.CAMERA);
            const cameraRollPerm = await Permissions.askAsync(
              Permissions.CAMERA_ROLL
            );
            if (
              cameraPerm.status === "granted" &&
              cameraRollPerm.status === "granted"
            ) {
              const pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
              });
              //   handleImagePicked(pickerResult);

              // Envoi de fichier :
              const uri = pickerResult.uri;
              const uriParts = uri.split(".");
              const fileType = uriParts[uriParts.length - 1];
              const formData = new FormData();
              formData.append("photo", {
                uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
              });
              const options = {
                method: "PUT",
                body: formData,
                headers: {
                  Authorization: "Bearer " + userToken,
                  Accept: "application/json",
                  "Content-Type": "multipart/form-data",
                },
              };
              const uploadResponse = await fetch(
                "https://express-airbnb-api.herokuapp.com/user/upload_picture/" +
                  userId,
                options
              );
              const uploadResult = await uploadResponse.json();
              console.log(uploadResult);
              setUser(uploadResult);
            }
          }}
        >
          <Image
            source={{ uri: user.photo[0].url }}
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>
      )}
      <Button
        style={styles.disconnect}
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 360,
    marginTop: 20,
    alignItems: "center",
  },

  disconnect: {
    width: "200",
    height: "50",
    backgroundColor: "#F3485C",
  },
});
