import React, { useEffect, useState, useRef } from "react";
import { Link, router } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  TextInput,
  ActivityIndicator,
  Alert,
  Modal,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiService from "../../services/api";

const ChangeVetScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [veterinarios, setVeterinarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const response = await apiService.getAllVets();
        setVeterinarios(response.data);
      } catch (err) {
        setError("Error al cargar la lista de veterinarios");
      } finally {
        setLoading(false);
      }
    };

    fetchVets();
  }, []);

  const handlePress = (item) => {
    setSelectedVet(item);
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleConfirm = async () => {
    const userId = await AsyncStorage.getItem("userID");

    if (!userId) {
      Alert.alert("Error", "No se pudo obtener el ID del usuario.");
      return;
    }

    await apiService.changeVet(userId, selectedVet.id);

    handleClose();

    router.push("/home");
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.listItem} onPress={() => handlePress(item)}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemAddress}>{item.address}</Text>
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
        <Text style={styles.navTitle}>Veterinarios</Text>
        <Link asChild href={"/profile"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/profile-icon.png")}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar veterinario..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#006368" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={veterinarios.filter((vet) =>
            vet.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.noResults}>No se encontraron veterinarios</Text>
          }
        />
      )}

      {modalVisible && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleClose}
        >
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
              <Text style={styles.modalTitle}>Aviso</Text>
              <Text style={styles.modalMessage}>
                ¿Está seguro que desea cambiar de veterinario?
              </Text>
              <View style={styles.modalButtons}>
                <Pressable style={styles.cancelButton} onPress={handleClose}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>
                <Pressable style={styles.acceptButton} onPress={handleConfirm}>
                  <Text style={styles.buttonText}>Aceptar</Text>
                </Pressable>
              </View>
            </Animated.View>
          </View>
        </Modal>
      )}
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
        },
        profileIcon: {
          width: 40,
          height: 40,
        },
        searchInput: {
          height: 40,
          margin: 16,
          borderWidth: 1,
          borderColor: "#009688",
          borderRadius: 8,
          paddingLeft: 10,
          fontSize: 16,
          backgroundColor: "white",
        },
        list: {
          flex: 1,
        },
        listContent: {
          paddingBottom: 20,
        },
        listItem: {
          backgroundColor: "#fff",
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          borderRadius: 8,
          marginHorizontal: 10,
          marginVertical: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1.5,
          elevation: 3,
          alignItems: "center",
        },
        itemTitle: {
          fontSize: 18,
          fontWeight: "bold",
        },
        itemAddress: {
          fontSize: 14,
          color: "#555",
        },
        loader: {
          marginTop: 20,
        },
        errorText: {
          textAlign: "center",
          color: "red",
          marginTop: 20,
          fontSize: 16,
        },
        noResults: {
          textAlign: "center",
          marginTop: 20,
          fontSize: 16,
          color: "#555",
        },
        modalContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        modalContent: {
          width: 300,
          backgroundColor: "white",
          padding: 20,
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
          textAlign: "center",
          marginBottom: 20,
        },
        modalButtons: {
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        },
        cancelButton: {
          flex: 1,
          padding: 10,
          backgroundColor: "#ccc",
          borderRadius: 5,
          alignItems: "center",
          marginRight: 10,
        },
        acceptButton: {
          flex: 1,
          padding: 10,
          backgroundColor: "#006368",
          borderRadius: 5,
          alignItems: "center",
        },
        buttonText: {
          color: "#fff",
          fontSize: 16,
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
        searchInput: {
          height: 40,
          marginVertical: 16,
          marginHorizontal: "20%",
          borderWidth: 1,
          borderColor: "#009688",
          borderRadius: 8,
          paddingLeft: 10,
          fontSize: 16,
          backgroundColor: "white",
        },
        list: {
          flex: 1,
          marginHorizontal: "20%",
        },
        listContent: {
          paddingBottom: 20,
        },
        listItem: {
          backgroundColor: "#fff",
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          borderRadius: 8,
          marginHorizontal: 10,
          marginVertical: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1.5,
          elevation: 3,
          alignItems: "center",
        },
        itemTitle: {
          fontSize: 18,
          fontWeight: "bold",
        },
        itemAddress: {
          fontSize: 14,
          color: "#555",
        },
        loader: {
          marginTop: 20,
        },
        errorText: {
          textAlign: "center",
          color: "red",
          marginTop: 20,
          fontSize: 16,
        },
        noResults: {
          textAlign: "center",
          marginTop: 20,
          fontSize: 16,
          color: "#555",
        },
        modalContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        modalContent: {
          width: 300,
          backgroundColor: "white",
          padding: 20,
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
          textAlign: "center",
          marginBottom: 20,
        },
        modalButtons: {
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        },
        cancelButton: {
          flex: 1,
          padding: 10,
          backgroundColor: "#ccc",
          borderRadius: 5,
          alignItems: "center",
          marginRight: 10,
        },
        acceptButton: {
          flex: 1,
          padding: 10,
          backgroundColor: "#006368",
          borderRadius: 5,
          alignItems: "center",
        },
        buttonText: {
          color: "#fff",
          fontSize: 16,
        },
      });

export default ChangeVetScreen;
