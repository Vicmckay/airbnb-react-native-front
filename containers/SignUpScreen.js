import React, { useState } from "react";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";

import axios from "axios";

export default function SignUpScreen({ setToken, navigation }) {
  const [name, setName] = useState("Brice");
  const [userName, setUserName] = useState("BriceAirbnb");
  const [email, setEmail] = useState("brice32424@lereacteur.io");
  const [description, setDescription] = useState("Salut les amis");
  const [password, setPassword] = useState("azerty");
  const [confirmPassword, setConfirmPassword] = useState("azerty");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F35960",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <TextInput
          style={{
            borderBottomColor: "white",
            borderBottomWidth: 1,
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
          }}
          placeholderTextColor="white"
          onChangeText={(text) => {
            setUserName(text);
          }}
          value={userName}
          placeholder="Username"
        />
        <TextInput
          style={{
            borderBottomColor: "white",
            borderBottomWidth: 1,
          }}
          placeholder="email"
          placeholderTextColor="white"
          onChangeText={(text) => {
            setName(text);
          }}
          value={name}
          placeholder="Name"
        />
        <TextInput
          multiline={true}
          style={{
            borderBottomColor: "white",
            borderBottomWidth: 1,
          }}
          placeholder="Présentez-vous..."
          placeholderTextColor="white"
          onChangeText={(text) => {
            setDescription(text);
          }}
          value={description}
        />
        <TextInput
          style={{
            borderBottomColor: "white",
            borderBottomWidth: 1,
          }}
          placeholder="password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
          style={{
            borderBottomColor: "white",
            borderBottomWidth: 1,
          }}
          placeholder="confirmez le mot de passe"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          value={confirmPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={{
            height: 40,
            width: 200,
            backgroundColor: "white",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={async () => {
            // requête vers le serveur pour se connecter...
            const response = await axios.post(
              "https://express-airbnb-api.herokuapp.com/user/sign_up",
              {
                email: email,
                password: password,
                username: userName,
                name: name,
                description: description,
              }
            );
            // console.log(response.data);
            setToken(response.data.token);
          }}
        >
          <Text style={{ color: "#F35960", fontSize: 20 }}>S'inscrire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={{ color: "white", textDecorationLine: "underline" }}>
            Déjà un compte ? Se connecter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
