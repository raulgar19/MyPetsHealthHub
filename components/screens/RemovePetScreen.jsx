import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  Modal,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ApiService from "../../services/api";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RemovePetMobile = () => {
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const router = useRouter();

  useEffect(() => {
    const fetchPets = async () => {
      const userId = await AsyncStorage.getItem("userID");
      if (userId) {
        try {
          const response = await ApiService.getUserPets(userId);
          setPets(response.data);
        } catch (error) {
          console.error("Error al obtener las mascotas:", error);
        }
      }
    };

    fetchPets();
  }, []);

  const handleDeletePress = () => {
    if (selectedPetId) {
      setShowConfirmationModal(true);
      fadeIn();
    } else {
      setShowModal(true);
      fadeIn();
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedPetId) {
      try {
        await ApiService.deletePet(selectedPetId);
        const userId = await AsyncStorage.getItem("userID");

        if (userId) {
          const response = await ApiService.getUserPets(userId);
          setPets(response.data);
        }

        setShowConfirmationModal(false);
        setSelectedPetId(null);
        router.push("/home");
      } catch (error) {
        console.error("Error al eliminar la mascota:", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowModal(false);
      setShowConfirmationModal(false);
    });
  };

  const renderPetItem = ({ item }) => (
    <Pressable
      style={[styles.petItem, selectedPetId === item.id && styles.selectedItem]}
      onPress={() => setSelectedPetId(item.id)}
    >
      <Image
        source={require("../../assets/icons/logo-mobile.png")}
        style={styles.petImage}
      />
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text>Especie: {item.species}</Text>
        <Text>Raza: {item.breed}</Text>
        <Text>Peso: {item.weight}</Text>
      </View>
    </Pressable>
  );

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
        <Text style={styles.navTitle}>Eliminar Mascota</Text>
        <Link asChild href={"/profile"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/profile-icon.png")}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>
      <View style={styles.content}>
        {pets.length === 0 ? (
          <Text style={styles.noPetsText}>
            No hay mascotas para eliminar en este momento
          </Text>
        ) : (
          <FlatList
            data={pets}
            renderItem={renderPetItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}

        {pets.length > 0 && (
          <Pressable style={styles.button} onPress={handleDeletePress}>
            <Text style={styles.buttonText}>Eliminar</Text>
          </Pressable>
        )}
      </View>

      <Modal
        visible={showModal}
        animationType="none"
        transparent={true}
        onRequestClose={fadeOut}
      >
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <View style={[styles.modalContent, { width: 350 }]}>
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.modalText}>
              Por favor, selecciona una mascota antes de eliminarla.
            </Text>
            <Pressable style={styles.modalButton} onPress={fadeOut}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </Animated.View>
      </Modal>

      <Modal
        visible={showConfirmationModal}
        animationType="none"
        transparent={true}
        onRequestClose={handleCancelDelete}
      >
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <View style={[styles.modalContent, { width: 350 }]}>
            <Text style={styles.modalTitle}>Confirmación</Text>
            <Text style={styles.modalText}>
              ¿Estás seguro de que deseas eliminar esta mascota?
            </Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancelDelete}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.modalButtonText}>Sí, Eliminar</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

const styles =
  Platform.OS != "web"
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
        },
        profileIcon: {
          width: 40,
          height: 40,
        },
        content: {
          flex: 1,
          paddingBottom: 20,
        },
        listContainer: {
          padding: 20,
        },
        petItem: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 5,
          padding: 10,
          marginVertical: 5,
          elevation: 3,
        },
        selectedItem: {
          backgroundColor: "#D3D3D3",
        },
        petImage: {
          width: 60,
          height: 60,
          marginRight: 10,
        },
        petInfo: {
          flex: 1,
        },
        petName: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#006368",
        },
        button: {
          backgroundColor: "#F44336",
          borderRadius: 5,
          paddingVertical: 15,
          paddingHorizontal: 30,
          alignSelf: "center",
          marginBottom: 20,
        },
        buttonText: {
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
        },
        noPetsText: {
          fontSize: 18,
          color: "#006368",
          textAlign: "center",
          marginTop: 20,
        },
        modalContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        modalContent: {
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          alignItems: "center",
        },
        modalTitle: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#000",
        },
        modalText: {
          fontSize: 16,
          marginBottom: 20,
          textAlign: "center",
        },
        modalButtonContainer: {
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        },
        modalButton: {
          backgroundColor: "#006368",
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 30,
          flex: 1,
          marginHorizontal: 5,
        },
        cancelButton: {
          backgroundColor: "#B0B0B0",
        },
        confirmButton: {
          backgroundColor: "#006368",
        },
        modalButtonText: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
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
        },
        profileIcon: {
          width: 40,
          height: 40,
        },
        content: {
          flex: 1,
          paddingBottom: 20,
        },
        listContainer: {
          padding: 20,
        },
        petItem: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          marginHorizontal: "25%",
          borderRadius: 5,
          padding: 10,
          marginVertical: 5,
          elevation: 3,
        },
        selectedItem: {
          backgroundColor: "#D3D3D3",
        },
        petImage: {
          width: 60,
          height: 60,
          marginRight: 10,
        },
        petInfo: {
          flex: 1,
        },
        petName: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#006368",
        },
        button: {
          backgroundColor: "#F44336",
          borderRadius: 5,
          paddingVertical: 15,
          paddingHorizontal: 30,
          alignSelf: "center",
          marginBottom: 20,
        },
        buttonText: {
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
        },
        noPetsText: {
          fontSize: 18,
          color: "#006368",
          textAlign: "center",
          marginTop: 20,
        },
        modalContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        modalContent: {
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          alignItems: "center",
        },
        modalTitle: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#000",
        },
        modalText: {
          fontSize: 16,
          marginBottom: 20,
          textAlign: "center",
        },
        modalButtonContainer: {
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        },
        modalButton: {
          backgroundColor: "#006368",
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 30,
          flex: 1,
          marginHorizontal: 5,
        },
        cancelButton: {
          backgroundColor: "#B0B0B0",
        },
        confirmButton: {
          backgroundColor: "#006368",
        },
        modalButtonText: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
        },
      });

export default RemovePetMobile;
