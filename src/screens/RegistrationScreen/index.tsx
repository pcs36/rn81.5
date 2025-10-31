import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";

//for API Call process
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { userCreatThunk } from '../../store/thunks/user.thunk';

interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FloatingLabelInputProps {
  label: string;
  value: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  onChangeText: (text: string) => void;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = "default",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useState(new Animated.Value(value ? 1 : 0))[0];

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: "absolute" as const,
    left: 15,
    zIndex: 1,
    // backgroundColor: "#fff", // ✅ matches base color
    paddingHorizontal: 4,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -18],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["#c5c5c5ff", "#007BFF"],
    }),
  };

  return (
    <View style={styles.inputContainer}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.input, { paddingTop: 20 }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const RegistrationPage: React.FC = () => {
  const [form, setForm] = useState<RegistrationForm>({
    firstName: "AAA",
    lastName: "BBB",
    email: "ppp",
    password: "sdfsdfs",
  });

  const dispatch = useDispatch<AppDispatch>();

  const [successText, setSuccessText] = useState<string | null>(null);

  const handleChange = (key: keyof RegistrationForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const { firstName, lastName, email, password } = form;
    if (!firstName || !lastName || !email || !password) {
      setSuccessText("⚠️ Please fill in all fields.");
      return;
    }
    try {
      const result = await dispatch(userCreatThunk({ firstName, lastName, email, password })).unwrap();
      if (result?.data?.status === 200) {
        setSuccessText(`✅ Welcome, ${firstName}! Registration successful.`);
        setForm({ firstName: "", lastName: "", email: "", password: "" });;
      } else if (result?.data?.status === 409) {
        setSuccessText(`⚠️ ${result?.data?.message}`);
      }

    } catch (error) {
      console.error('Registration Page - Error '); //error
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }} // ✅ Base color white
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Register</Text>

        <FloatingLabelInput
          label="First Name"
          value={form.firstName}
          onChangeText={(text) => handleChange("firstName", text)}
        />

        <FloatingLabelInput
          label="Last Name"
          value={form.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
        />

        <FloatingLabelInput
          label="E-mail"
          value={form.email}
          keyboardType="email-address"
          onChangeText={(text) => handleChange("email", text)}
        />

        <FloatingLabelInput
          label="Password"
          value={form.password}
          secureTextEntry
          onChangeText={(text) => handleChange("password", text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {successText && (
          <View>
            <Text style={{ color: 'green', marginTop: 10, textAlign: 'center' }}>{successText}</Text>
          </View>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
    color: "#000", // ✅ black text
  },
  inputContainer: {
    marginBottom: 25,
    position: "relative",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000", // ✅ black input text
    backgroundColor: "#f0f0f0", // ✅ light gray input background
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});
