import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Modal,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import apiService from "../../api";

const UpdateProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  const [scaleValue] = useState(new Animated.Value(0));
  const [opacityValue] = useState(new Animated.Value(0));

  const userId = localStorage.getItem("userID");
  const router = useRouter();

  const handleSaveChanges = async () => {
    try {
      await apiService.updateUser(userId, {
        name: userData.name,
        surnames: userData.surnames,
        nickname: userData.nickname,
        email: userData.email,
      });
      setMessage("Cambios realizados correctamente.");
      setConfirmModalVisible(true);
    } catch (error) {
      setMessage(
        "Error al realizar la petición. Por favor, inténtalo de nuevo."
      );
      setConfirmModalVisible(true);
    }
  };

  const handleOpenPasswordModal = () => {
    setPasswordModalVisible(true);
  };

  const handleCloseModal = () => {
    animateCloseModal(() => setConfirmModalVisible(false));
  };

  const handleClosePasswordModal = () => {
    animateCloseModal(() => setPasswordModalVisible(false));
    setPassword("");
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await apiService.confirmPassword({
        userId: userId,
        password: password,
      });

      if (response.data && response.data.id) {
        setPasswordError("");
        handleClosePasswordModal();
        router.push("/otherChanges");
      } else {
        setPasswordError("Contraseña incorrecta. Inténtalo de nuevo.");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setPasswordError("Contraseña incorrecta. Inténtalo de nuevo.");
      } else if (error.response?.status === 404) {
        setPasswordError("Usuario no encontrado. Verifica tu información.");
      } else {
        setPasswordError(
          "Error al verificar la contraseña. Inténtalo de nuevo."
        );
      }
    }
  };

  const animateOpenModal = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateCloseModal = (closeCallback) => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      closeCallback();
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await apiService.getUserById(userId);
      setUserData(response.data);
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (confirmModalVisible || passwordModalVisible) {
      animateOpenModal();
    }
  }, [confirmModalVisible, passwordModalVisible]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href="/home">
          <Pressable>
            <Image
              source={require("../../assets/icons/logo-mobile.png")}
              style={styles.logo}
            />
          </Pressable>
        </Link>
        <Text style={styles.navTitle}>Editar Perfil</Text>
      </View>
      <View style={styles.container}>
        <Image
          source={require("../../assets/icons/profile-icon.png")}
          style={styles.profileImage}
        />

        <TextInput
          style={styles.input}
          value={userData.name || ""}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
          placeholder="Nombre"
        />
        <TextInput
          style={styles.input}
          value={userData.surnames || ""}
          onChangeText={(text) => setUserData({ ...userData, surnames: text })}
          placeholder="Apellidos"
        />
        <TextInput
          style={styles.input}
          value={userData.nickname || ""}
          onChangeText={(text) => setUserData({ ...userData, nickname: text })}
          placeholder="Nombre de usuario"
        />
        <TextInput
          style={styles.input}
          value={userData.email || ""}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
          placeholder="Correo electrónico"
        />

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.commonButton, styles.otherChangesButton]}
            onPress={handleOpenPasswordModal}
          >
            <Text style={styles.buttonText}>Otros Cambios</Text>
          </Pressable>

          <Pressable style={styles.commonButton} onPress={handleSaveChanges}>
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={confirmModalVisible || passwordModalVisible}
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: opacityValue }]}>
          {confirmModalVisible && (
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {message === "Cambios realizados correctamente."
                  ? "Confirmación"
                  : "Error"}
              </Text>
              <Text style={styles.modalMessage}>{message}</Text>
              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={[styles.modalButton]}
                  onPress={() => {
                    handleCloseModal();
                    if (message === "Cambios realizados correctamente.") {
                      router.push("/profile");
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Aceptar</Text>
                </Pressable>
              </View>
            </View>
          )}

          {passwordModalVisible && (
            <View style={[styles.modalContainer, { width: 350 }]}>
              <Text style={styles.modalTitle}>Introduce tu Contraseña</Text>
              <View style={styles.passwordInputContainer}>
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

              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}

              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={[styles.modalButton]}
                  onPress={handleClosePasswordModal}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={styles.modalButton}
                  onPress={handlePasswordSubmit}
                >
                  <Text style={styles.buttonText}>Aceptar</Text>
                </Pressable>
              </View>
            </View>
          )}
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
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
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  commonButton: {
    backgroundColor: "#00BFAE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  otherChangesButton: {
    backgroundColor: "#00BFAE",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#00BFAE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 50,
    width: "100%",
  },
  eyeIconContainer: {
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default UpdateProfileScreen;
