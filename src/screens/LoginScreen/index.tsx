import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from 'react-native-config';

//for API Call process
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { userLoginThunk } from '../../store/thunks/user.thunk';

import { SafeAreaView } from 'react-native-safe-area-context';


const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("p1@g.com");
  const [password, setPassword] = useState("user.password");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => {
    // You can integrate your backend API here
    // console.log("Email:", email);
    // console.log("Password:", password);
    // navigation.navigate("Home"); // Example navigation
    if (email !== "" && password !== "") {
      // await AsyncStorage.setItem("userToken", 'token');
      try {
        const result = await dispatch(userLoginThunk({ email, password })).unwrap();
        // console.log('login Page - userLoginThunk success ---------------', result);
        /* if (result.status === 200) {
          navigation.navigate('Auth', {
            screen: 'OtpVerification',
            params: { loginData: result }
          });
        } */

        if (result.data?.status === 401) {
          setLoginError(result.data?.message || 'Unauthorized access');
        }

      } catch (error) {
        console.error('login Page - userLoginThunk Error '); //error
      }

    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <View style={styles.inputContainer}>
        {/* <Icon name="mail-outline" size={20} color="#888" /> */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        {/* <Icon name="lock-closed-outline" size={20} color="#888" /> */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {/* <Icon
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#888"
          /> */}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      {loginError &&
        <View>
          <Text style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>{loginError}</Text>
        </View>
      }

      <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
        <Text style={styles.registerText}>
          Don’t have an account? <Text style={styles.link}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
      <View>
        <Text style={{ fontWeight: "bold", color: '#000' }}>BASE_URL:{Config.BASE_URL}</Text>
        <Text style={{ fontWeight: "bold", color: '#000' }}>API_KEY:{Config.API_KEY}</Text>
        <Text style={{ fontWeight: "bold", color: '#000' }}>ENVIRONMENT:{Config.ENVIRONMENT}</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    fontSize: 16,
    color: "#000"
  },
  loginButton: {
    backgroundColor: "#4C8BF5",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  registerText: {
    marginTop: 25,
    color: "#444",
    textAlign: "center",
  },
  link: {
    color: "#4C8BF5",
    fontWeight: "600",
  },
});
