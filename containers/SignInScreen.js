import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import axios from "axios";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function SignInScreen({ setToken, setId, navigation }) {
  const [email, setEmail] = useState("nono@airbnb-api.com");
  const [password, setPassword] = useState("pass");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F35960",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Entypo name="home" size={150} color="white" />
        <TextInput
          style={{
            borderBottomColor: "white",
            borderBottomWidth: 1,
            marginBottom: 30,
            marginTop: 150,
          }}
          placeholder="email"
          placeholderTextColor="white"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <TextInput
          style={{
            borderBottomColor: "white",
            borderBottomWidth: 1,
            marginBottom: 30,
          }}
          placeholder="password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />

        <TouchableOpacity
          style={{
            height: 40,
            width: 200,
            backgroundColor: "white",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
          }}
          onPress={async () => {
            // requête vers le serveur pour se connecter...
            const response = await axios.post(
              "https://express-airbnb-api.herokuapp.com/user/log_in",
              { email: email, password: password }
            );
            // console.log(response.data.token);

            setToken(response.data.token);
            // Enregistrer l'id pour l'utiliser dans la page Profile.
            setId(response.data.id);
          }}
        >
          <Text style={{ color: "#F35960", fontSize: 20 }}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={{ color: "white", textDecorationLine: "underline" }}>
            Pas de compte ? S'inscrire
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({});
