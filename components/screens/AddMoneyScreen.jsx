import React, { useState, useRef } from "react";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  Modal,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiService from "../../api";

const AddMoney = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleAddMoney = async () => {
    try {
      const userId = await AsyncStorage.getItem("userID");
      if (!userId) {
        setErrorMessage("No se encontró el usuario.");
        setModalVisible(true);
        return;
      }

      const amountToAdd = parseFloat(amount);
      if (isNaN(amountToAdd) || amountToAdd <= 0) {
        setErrorMessage("Por favor, ingresa una cantidad válida.");
        setModalVisible(true);
        return;
      }

      const response = await apiService.addMoney(userId, amountToAdd);
      if (response.status === 200) {
        setErrorMessage("¡Fondos añadidos con éxito!");
      } else {
        setErrorMessage("Error al añadir fondos. Inténtalo de nuevo.");
      }
    } catch (error) {
      setErrorMessage("Error al añadir fondos. Inténtalo de nuevo.");
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href={"/home"}>
          <Pressable style={styles.button}>
            <Image
              source={require("../../assets/icons/logo-mobile.png")}
              style={styles.logo}
            />
          </Pressable>
        </Link>
        <Text style={styles.navTitle}>Añadir Fondos</Text>
        <Link asChild href={"/profile"}>
          <Pressable style={styles.button}>
            <Image
              source={require("../../assets/icons/profile-icon.png")}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Cantidad a añadir</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe la cantidad"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Pressable style={styles.addButton} onPress={handleAddMoney}>
          <Text style={styles.buttonText}>Añadir Fondos</Text>
        </Pressable>
      </View>

      <Modal transparent visible={modalVisible} animationType="none">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#B7E3DD",
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 60,
    backgroundColor: "#006368",
    paddingHorizontal: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  navTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    padding: 5,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
    textAlign: "center",
  },
  input: {
    height: 50,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#009688",
    borderRadius: 8,
    marginHorizontal: 100,
    marginVertical: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 250,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#009688",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddMoney;
