import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import apiService from "../../services/api";

const RegisterScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedVeterinarian, setSelectedVeterinarian] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    accountNumber: "",
    balance: "",
  });
  const [veterinarians, setVeterinarians] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchVeterinarians = async () => {
      try {
        const response = await apiService.getAllVets();
        setVeterinarians(response.data);
      } catch (error) {
        console.error("Error al obtener veterinarios:", error);
      }
    };

    fetchVeterinarians();
  }, []);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleInputChange = (name, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const registerModel = {
      dni: userData.dni,
      name: userData.firstName,
      surnames: userData.lastName,
      phone: userData.phone,
      email: userData.email,
      password: userData.password,
      userNick: userData.username,
      vetId: parseInt(selectedVeterinarian),
      accountNumber: userData.accountNumber,
      balance: parseFloat(userData.balance),
    };

    try {
      await apiService.registerUser(registerModel);
      router.push("/index");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Image
          source={require("../../assets/icons/logo-mobile.png")}
          style={styles.navLogo}
        />
        <Text style={styles.navTitle}>My Pet's Health Hub</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Datos del usuario</Text>

          <TextInput
            placeholder="Nombre"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
            value={userData.firstName}
            onChangeText={(text) => handleInputChange("firstName", text)}
          />

          <TextInput
            placeholder="Apellidos"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
            value={userData.lastName}
            onChangeText={(text) => handleInputChange("lastName", text)}
          />

          <TextInput
            placeholder="DNI"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
            value={userData.dni}
            onChangeText={(text) => handleInputChange("dni", text)}
          />

          <TextInput
            placeholder="Nombre de usuario"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
            value={userData.username}
            onChangeText={(text) => handleInputChange("username", text)}
          />

          <TextInput
            placeholder="Número de teléfono"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
            value={userData.phone}
            onChangeText={(text) => handleInputChange("phone", text)}
            keyboardType="phone-pad"
          />

          <TextInput
            placeholder="Correo Electrónico"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
            value={userData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />

          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            textAlign="left"
            value={userData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />

          <Text style={styles.subtitle}>Veterinario Asociado</Text>
          <View style={[styles.input, styles.pickerContainer]}>
            <Picker
              selectedValue={selectedVeterinarian}
              onValueChange={(itemValue) => setSelectedVeterinarian(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecciona un veterinario" value="" />
              {veterinarians.map((vet) => (
                <Picker.Item
                  key={vet.id}
                  label={vet.name}
                  value={vet.id.toString()}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.subtitle}>Datos financieros</Text>
          <TextInput
            placeholder="Número de cuenta"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
            value={userData.accountNumber}
            onChangeText={(text) => handleInputChange("accountNumber", text)}
          />

          <TextInput
            placeholder="Saldo"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
            value={userData.balance}
            onChangeText={(text) => handleInputChange("balance", text)}
          />

          <View style={styles.termsCheck}>
            <Checkbox value={isChecked} onValueChange={handleCheckboxToggle} />
            <Link asChild href={"/terms"}>
              <TouchableOpacity>
                <Text style={styles.termsLink}>
                  Acepto los Términos y Condiciones de Uso
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
          <Link asChild href={"/"}>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Crear cuenta</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles =
  Platform.OS !== "web"
    ? StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: "#B7E3DD",
        },
        navbar: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 60,
          backgroundColor: "#006368",
          paddingHorizontal: 20,
        },
        navLogo: {
          width: 40,
          height: 40,
          position: "absolute",
          left: 20,
        },
        navTitle: {
          color: "#fff",
          fontSize: 20,
          fontWeight: "bold",
        },
        scrollContainer: {
          flexGrow: 1,
          alignItems: "center",
          paddingVertical: 20,
        },
        innerContainer: {
          alignItems: "center",
          width: "100%",
        },
        title: {
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 20,
        },
        subtitle: {
          fontSize: 22,
          fontWeight: "bold",
          marginTop: 20,
          textAlign: "center",
        },
        input: {
          width: "80%",
          height: 50,
          backgroundColor: "white",
          borderRadius: 5,
          paddingHorizontal: 10,
          marginVertical: 10,
          borderColor: "#006368",
          borderWidth: 1,
          textAlign: "left",
        },
        pickerContainer: {
          justifyContent: "center",
          alignItems: "center",
        },
        picker: {
          color: "#A9A9A9",
          width: "100%",
        },
        button: {
          backgroundColor: "#009688",
          borderRadius: 5,
          paddingVertical: 15,
          paddingHorizontal: 30,
          marginTop: 20,
        },
        buttonText: {
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
        },
        termsCheck: {
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        },
        termsLink: {
          color: "#006368",
          textDecorationLine: "underline",
        },
      })
    : StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: "#B7E3DD",
        },
        navbar: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 60,
          backgroundColor: "#006368",
          paddingHorizontal: 20,
        },
        navLogo: {
          width: 40,
          height: 40,
          position: "absolute",
          left: 20,
        },
        navTitle: {
          color: "#fff",
          fontSize: 20,
          fontWeight: "bold",
        },
        scrollContainer: {
          flexGrow: 1,
          alignItems: "center",
          paddingVertical: 20,
        },
        innerContainer: {
          alignItems: "center",
          width: "100%",
        },
        title: {
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 20,
        },
        subtitle: {
          fontSize: 22,
          fontWeight: "bold",
          marginTop: 20,
          textAlign: "center",
        },
        input: {
          width: "40%",
          height: 50,
          backgroundColor: "white",
          borderRadius: 5,
          paddingHorizontal: 10,
          marginVertical: 10,
          borderColor: "#006368",
          borderWidth: 1,
          textAlign: "left",
        },
        pickerContainer: {
          justifyContent: "center",
          alignItems: "center",
        },
        picker: {
          color: "#A9A9A9",
          width: "100%",
        },
        button: {
          backgroundColor: "#009688",
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginTop: 20,
        },
        buttonText: {
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
        },
        termsCheck: {
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        },
        termsLink: {
          color: "#006368",
          textDecorationLine: "underline",
        },
      });

export default RegisterScreen;
