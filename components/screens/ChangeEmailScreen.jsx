import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiService from "../../services/api";

const ChangeEmailScreen = () => {
  const [email, setEmail] = useState("");
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [opacityValue] = useState(new Animated.Value(0));
  const [modalMessage, setModalMessage] = useState("");

  const router = useRouter();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userID");
      setUserId(storedUserId);
    };
    getUserId();
  }, []);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleSaveChanges = async () => {
    if (email === "") {
      setModalMessage("Por favor, ingrese un correo electrónico.");
      setConfirmModalVisible(true);
      showModal();
      return;
    }

    if (!emailRegex.test(email)) {
      setModalMessage("Por favor, ingrese un correo electrónico válido.");
      setConfirmModalVisible(true);
      showModal();
      return;
    }

    if (userId) {
      await apiService.changeEmail(userId, { email: email });

      setModalMessage("El correo electrónico se ha actualizado correctamente.");
      setConfirmModalVisible(true);
      showModal();
    } else {
      setModalMessage("No se encontró el usuario.");
      setConfirmModalVisible(true);
      showModal();
    }
  };

  const showModal = () => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    if (
      modalMessage === "El correo electrónico se ha actualizado correctamente."
    ) {
      setConfirmModalVisible(false);
      router.push("");
    } else {
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setConfirmModalVisible(false);
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href={"/home"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/logo-mobile.png")}
              style={styles.logo}
            />
          </Pressable>
        </Link>
        <Text style={styles.navTitle}>Cambiar correo</Text>
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nuevo correo"
          value={email}
          onChangeText={setEmail}
        />
        <Pressable style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </Pressable>
      </View>

      <Modal
        transparent={true}
        visible={confirmModalVisible}
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: opacityValue }]}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmación</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable style={styles.modalButton} onPress={handleCloseModal}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Modal>
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
          textAlign: "center",
          flex: 1,
        },
        container: {
          flex: 1,
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
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
        },
        button: {
          backgroundColor: "#009688",
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginTop: 20,
          borderRadius: 8,
        },
        buttonText: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
        },
        modalOverlay: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        modalContainer: {
          width: 300,
          padding: 20,
          backgroundColor: "#fff",
          borderRadius: 8,
          alignItems: "center",
        },
        modalTitle: {
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
        },
        modalMessage: {
          fontSize: 16,
          marginBottom: 20,
          textAlign: "center",
        },
        modalButtonContainer: {
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        },
        modalButton: {
          backgroundColor: "#009688",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
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
          textAlign: "center",
          flex: 1,
        },
        container: {
          flex: 1,
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        },
        input: {
          width: "30%",
          height: 50,
          backgroundColor: "white",
          borderRadius: 5,
          paddingHorizontal: 10,
          marginVertical: 10,
          borderColor: "#006368",
          borderWidth: 1,
        },
        button: {
          backgroundColor: "#009688",
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginTop: 20,
          borderRadius: 8,
        },
        buttonText: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
        },
        modalOverlay: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        modalContainer: {
          width: 300,
          padding: 20,
          backgroundColor: "#fff",
          borderRadius: 8,
          alignItems: "center",
        },
        modalTitle: {
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
        },
        modalMessage: {
          fontSize: 16,
          marginBottom: 20,
          textAlign: "center",
        },
        modalButtonContainer: {
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        },
        modalButton: {
          backgroundColor: "#009688",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
        },
      });

export default ChangeEmailScreen;
