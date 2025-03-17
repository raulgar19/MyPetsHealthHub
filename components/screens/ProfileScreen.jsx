import React, { useState, useRef, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ApiService from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [farewellModalVisible, setFarewellModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  const [userId, setUserId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userID");
      setUserId(storedUserId);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await ApiService.getUserById(userId);
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userId]);

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

  const handleDeleteAccount = () => {
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    animateCloseModal(async () => {
      setModalVisible(false);

      try {
        await ApiService.deleteUser(userId);

        await AsyncStorage.removeItem("userID");
        setUserId(null);

        setFarewellModalVisible(true);
      } catch (error) {
        console.error("Error eliminando la cuenta:", error);
      }
    });
  };

  useEffect(() => {
    if (modalVisible || farewellModalVisible) {
      scaleValue.setValue(0);
      opacityValue.setValue(0);
      animateOpenModal();
    }
  }, [modalVisible, farewellModalVisible]);

  if (!userData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.navTitle}>Perfil del usuario</Text>
      </View>

      <View style={styles.container}>
        <Image
          source={require("../../assets/icons/profile-icon.png")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {userData?.name} {userData?.surnames}
        </Text>
        <Text style={styles.nick}>@{userData.nickname}</Text>
        <View style={styles.buttonContainer}>
          <Link asChild href={"/updateProfile"}>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Editar Perfil</Text>
            </Pressable>
          </Link>
          <Pressable style={styles.button} onPress={handleDeleteAccount}>
            <Text style={styles.buttonText}>Eliminar cuenta</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={() => animateCloseModal(() => setModalVisible(false))}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ scale: scaleValue }], opacity: opacityValue },
            ]}
          >
            <Text style={styles.modalTitle}>Confirmar eliminación</Text>
            <Text style={styles.modalMessage}>
              ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se
              puede deshacer.
            </Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => animateCloseModal(() => setModalVisible(false))}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmDelete}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={farewellModalVisible}
        animationType="none"
        onRequestClose={() =>
          animateCloseModal(() => setFarewellModalVisible(false))
        }
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ scale: scaleValue }], opacity: opacityValue },
            ]}
          >
            <Text style={styles.modalTitle}>Cuenta eliminada</Text>
            <Text style={styles.modalMessage}>
              Lamentamos que te vayas. ¡Gracias por haber sido parte de nuestra
              comunidad!
            </Text>
            <Pressable
              style={[styles.modalButton, styles.confirmButton]}
              onPress={() => {
                animateCloseModal(() => {
                  setFarewellModalVisible(false);
                  router.push("/");
                });
              }}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </Pressable>
          </Animated.View>
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
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  nick: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    backgroundColor: "#009688",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: "#006368",
  },
});

export default UserProfileScreen;
