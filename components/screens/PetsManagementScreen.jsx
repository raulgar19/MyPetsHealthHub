import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
import ApiService from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PetsManagementScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Pets");
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetsData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userID");
        if (!userId) {
          setError("No se encontró el usuario.");
          setLoading(false);
          return;
        }

        const petsResponse = await ApiService.getUserPets(userId);
        setPets(petsResponse.data);
      } catch (err) {
        setError("Error al cargar los datos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPetsData();
  }, []);

  const setPetId = (petId) => async () => {
    await AsyncStorage.setItem("petID", petId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href={"/home"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/logo-mobile.png")}
              style={styles.navIcon}
            />
          </Pressable>
        </Link>
        <Text style={styles.navTitle}>Mis Mascotas</Text>
        <Link asChild href={"/profile"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/profile-icon.png")}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab("Pets")}
          style={[styles.tab, selectedTab === "Pets" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Pets" && styles.activeTabText,
            ]}
          >
            Mascotas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("HealthCard")}
          style={[styles.tab, selectedTab === "HealthCard" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "HealthCard" && styles.activeTabText,
            ]}
          >
            Tarjetas Sanitarias
          </Text>
        </TouchableOpacity>
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
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {selectedTab === "Pets" &&
            pets.map((pet) => (
              <Link asChild href={"/petDetails"} key={pet.id}>
                <TouchableOpacity
                  onPress={setPetId(pet.id)}
                  style={styles.petInfoContainer}
                >
                  <View style={styles.petImageContainer}>
                    <Image
                      source={require("../../assets/icons/logo-mobile.png")}
                      style={styles.petImage}
                    />
                  </View>
                  <View style={styles.petDetailsContainer}>
                    <Text style={styles.petName}>{pet.name}</Text>
                    <Text style={styles.petBreed}>Raza: {pet.breed}</Text>
                    <Text style={styles.petAge}>
                      Fecha Nacimiento:{" "}
                      {new Date(pet.birthday).toLocaleDateString()}
                    </Text>
                    <Text style={styles.petWeight}>Peso: {pet.weight} kg</Text>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}

          {selectedTab === "HealthCard" &&
            pets.map((pet) =>
              pet.petCard ? (
                <View style={styles.petCardContainer} key={pet.petCard.id}>
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
                </View>
              ) : null
            )}
        </ScrollView>
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
    elevation: 5,
  },
  navIcon: {
    width: 40,
    height: 40,
  },
  navTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  navButton: {
    position: "absolute",
    right: 20,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    backgroundColor: "#E0F7FA",
    borderRadius: 5,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "#009688",
  },
  tabText: {
    fontSize: 16,
    color: "#009688",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  petInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  petImageContainer: {
    marginRight: 20,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  petDetailsContainer: {
    flex: 1,
  },
  petName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  petBreed: {
    fontSize: 16,
    color: "#009688",
    marginBottom: 10,
  },
  petAge: {
    fontSize: 16,
    color: "#555",
  },
  petWeight: {
    fontSize: 16,
    color: "#555",
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  logo: {
    width: 50,
    height: 50,
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
    marginBottom: 20,
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

export default PetsManagementScreen;
