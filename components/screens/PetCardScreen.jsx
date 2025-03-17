import React, { useState, useRef, useEffect } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
import apiService from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PetCardScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [petId, setPetId] = useState(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchPetId = async () => {
      const petId = await AsyncStorage.getItem("petID");
      if (petId) {
        setPetId(petId);
      } else {
        setError("No se encontró el ID de la mascota.");
        setLoading(false);
      }
    };

    fetchPetId();
  }, []);

  useEffect(() => {
    if (petId) {
      const fetchPetDetails = async () => {
        try {
          const response = await apiService.getPetById(petId);
          setPet(response.data);
        } catch (err) {
          setError("Error al obtener los detalles de la mascota.");
        } finally {
          setLoading(false);
        }
      };

      fetchPetDetails();
    }
  }, [petId]);

  const openModal = () => {
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setModalVisible(false));
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
        <Text style={styles.navTitle}>Añadir Mascota</Text>
        <Link asChild href={"/profile"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/profile-icon.png")}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#009688"
          style={{ marginTop: 20 }}
        />
      ) : error ? (
        <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>
          {error}
        </Text>
      ) : pet ? (
        <View style={styles.petCardContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Image
                source={require("../../assets/icons/pets-health-union-icon.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <View style={styles.textContainer}>
                <Text style={styles.systemText}>
                  SISTEMA DE REGISTRO DE MASCOTAS
                </Text>
                <Text style={styles.cardTitle}>
                  Tarjeta Sanitaria de Mascota
                </Text>
              </View>
              <QRCode value={pet.petCard.qrCode} size={50} />
            </View>

            <View style={styles.content}>
              <Text style={styles.idNumber}>Chip: {pet.chip}</Text>
              <Text style={styles.name}>Nombre: {pet.name}</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Raza: {pet.breed}</Text>
                <Text style={styles.label}>Sexo: {pet.gender}</Text>
              </View>
              <Text style={styles.code}>
                Número de Registro: {pet.petCard.register}
              </Text>
            </View>
          </View>

          <Pressable style={styles.qrButton} onPress={openModal}>
            <Text style={styles.qrButtonText}>QR</Text>
          </Pressable>

          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalOverlay}>
              <Animated.View
                style={[
                  styles.modalContent,
                  { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
                ]}
              >
                <QRCode value={pet.petCard.qrCode} size={200} />
                <Pressable style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </Pressable>
              </Animated.View>
            </View>
          </Modal>
        </View>
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No se encontraron datos.
        </Text>
      )}
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
  profileIcon: {
    width: 40,
    height: 40,
  },
  petCardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: "100%",
    maxWidth: 400,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  systemText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  cardTitle: {
    fontSize: 16,
    color: "#006368",
    marginTop: 4,
  },
  content: {
    backgroundColor: "#009688",
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    gap: 5,
  },
  idNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#fff",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  code: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "monospace",
  },
  qrButton: {
    backgroundColor: "#009688",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  qrButtonText: {
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
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#009688",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default PetCardScreen;
