import React, { useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import apiService from "../../api";

const ChangePasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [opacityValue] = useState(new Animated.Value(0));
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const userId = localStorage.getItem("userID");

  const router = useRouter();

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSaveChanges = async () => {
    if (password === "") {
      setModalMessage("Por favor, ingrese una contraseña.");
      setConfirmModalVisible(true);
      showModal();
      return;
    }

    if (!validatePassword(password)) {
      setModalMessage("La contraseña debe tener al menos 8 caracteres.");
      setConfirmModalVisible(true);
      showModal();
      return;
    }

    await apiService.changePassword(userId, { password: password });

    setModalMessage("La contraseña se ha actualizado correctamente.");
    setConfirmModalVisible(true);
    showModal();
  };

  const showModal = () => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    if (modalMessage === "La contraseña se ha actualizado correctamente.") {
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
        <Text style={styles.navTitle}>Cambiar contraseña</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.passContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Contraseña"
            secureTextEntry={!isPasswordVisible}
          />
          <Pressable
            style={styles.eyeIconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <FontAwesome
              name={isPasswordVisible ? "eye-slash" : "eye"}
              size={24}
              color="#000"
            />
          </Pressable>
        </View>

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
  logoContainer: {
    position: "absolute",
    left: 10,
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  passContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "70%",
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
  eyeIconContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});

export default ChangePasswordScreen;
