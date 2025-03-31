import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  Modal,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiService from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RemoveQueryScreen = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [petInfo, setPetInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const petId = await AsyncStorage.getItem("petID");
        const vetId = await AsyncStorage.getItem("userID");

        if (!petId || !vetId) {
          setError("No se encontró el ID de la mascota o el veterinario.");
          setLoading(false);
          return;
        }

        const petResponse = await apiService.getPetById(petId);
        setPetInfo(petResponse.data);

        const queriesResponse = await apiService.getPetQueries(petId, vetId);
        setQueries(queriesResponse.data);
      } catch (err) {
        setError("Error al obtener la información.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPetData();
  }, []);

  const handleDelete = async (queryId) => {
    try {
      await apiService.deletePetQuery(queryId);

      setQueries((prevQueries) =>
        prevQueries.filter((query) => query.id !== queryId)
      );
      setModalVisible(false);
    } catch (err) {
      console.error("Error al eliminar la consulta:", err);
    }
  };

  const openModal = (queryId) => {
    setSelectedQueryId(queryId);
    setModalVisible(true);
    fadeIn();
  };

  const closeModal = () => {
    fadeOut();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const renderItem = ({ item }) => (
    <View style={styles.queryItem}>
      <View style={styles.queryTextContainer}>
        <Text style={styles.queryText}>
          <Text style={styles.bold}>Fecha:</Text> {item.date}
        </Text>
        <Text style={styles.queryText}>
          <Text style={styles.bold}>Hora:</Text> {item.hour}
        </Text>
        <Text style={styles.queryText}>
          <Text style={styles.bold}>Objetivo:</Text> {item.purpose}
        </Text>
      </View>
      <Pressable style={styles.deleteButton} onPress={() => openModal(item.id)}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href="/vetHome" style={styles.link}>
          <Pressable>
            <Image
              source={require("../../assets/icons/logo-mobile.png")}
              style={styles.logo}
            />
          </Pressable>
        </Link>
        <View style={styles.navTextContainer}>
          <Text style={styles.navTitle}>Eliminar Consulta</Text>
        </View>
      </View>

      <Text style={styles.header}>Información de la mascota</Text>
      {loading ? (
        <Text style={styles.loadingText}>Cargando información...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : petInfo ? (
        <View style={styles.petInfo}>
          <Text style={styles.label}>
            Nombre: <Text style={styles.value}>{petInfo.name}</Text>
          </Text>
          <Text style={styles.label}>
            Raza: <Text style={styles.value}>{petInfo.breed}</Text>
          </Text>
          <Text style={styles.label}>
            Fecha Nacimiento:{" "}
            <Text style={styles.value}>{petInfo.birthday}</Text>
          </Text>
        </View>
      ) : null}

      {loading ? (
        <Text style={styles.loadingText}>Cargando consultas...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={queries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          style={styles.list}
          ListHeaderComponent={
            <Text style={styles.header}>Lista de Consultas</Text>
          }
          contentContainerStyle={styles.listContent}
        />
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Aviso</Text>
            <Text style={styles.modalText}>
              ¿Estás seguro de eliminar esta consulta?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeModal}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButtonModal}
                onPress={() => handleDelete(selectedQueryId)}
              >
                <Text style={styles.modalButtonText}>Eliminar</Text>
              </TouchableOpacity>
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
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          height: 60,
          backgroundColor: "#006368",
          paddingHorizontal: 20,
        },
        link: {
          position: "absolute",
          left: 20,
        },
        logo: {
          width: 40,
          height: 40,
        },
        navTextContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        navTitle: {
          color: "#fff",
          fontSize: 20,
          fontWeight: "bold",
        },
        listContent: {
          paddingHorizontal: 20,
          paddingBottom: 20,
        },
        header: {
          fontSize: 24,
          fontWeight: "bold",
          color: "#006368",
          marginBottom: 10,
          marginTop: 20,
          textAlign: "center",
        },
        petInfo: {
          backgroundColor: "#eaf8f6",
          padding: 15,
          borderRadius: 10,
          marginHorizontal: 20,
        },
        label: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#333",
        },
        value: {
          fontWeight: "normal",
        },
        queryItem: {
          flexDirection: "row",
          backgroundColor: "#f9f9f9",
          padding: 15,
          marginBottom: 10,
          borderRadius: 8,
          elevation: 1,
          alignItems: "center",
          justifyContent: "space-between",
        },
        queryTextContainer: {
          flex: 1,
          marginRight: 10,
        },
        queryText: {
          fontSize: 16,
          marginBottom: 8,
        },
        bold: {
          fontWeight: "bold",
        },
        deleteButton: {
          backgroundColor: "#FF0000",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
        },
        deleteButtonText: {
          color: "#fff",
          fontWeight: "bold",
          fontSize: 16,
        },
        loadingText: {
          textAlign: "center",
          fontSize: 16,
          color: "#333",
        },
        errorText: {
          textAlign: "center",
          fontSize: 16,
          color: "red",
        },
        modalOverlay: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        modalContent: {
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 10,
          width: 300,
          alignItems: "center",
        },
        modalTitle: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        },
        modalText: {
          fontSize: 18,
          marginBottom: 20,
          textAlign: "center",
        },
        modalButtons: {
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        },
        cancelButton: {
          backgroundColor: "#B0B0B0",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
          marginHorizontal: 10,
        },
        deleteButtonModal: {
          backgroundColor: "#009688",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
          marginHorizontal: 10,
        },
        modalButtonText: {
          color: "#fff",
          fontWeight: "bold",
          fontSize: 16,
        },
      })
    : StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: "#B7E3DD",
        },
        navbar: {
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          height: 60,
          backgroundColor: "#006368",
          paddingHorizontal: 20,
        },
        link: {
          position: "absolute",
          left: 20,
        },
        logo: {
          width: 40,
          height: 40,
        },
        navTextContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        navTitle: {
          color: "#fff",
          fontSize: 20,
          fontWeight: "bold",
        },
        listContent: {
          marginHorizontal: "20%",
          paddingBottom: 20,
        },
        header: {
          fontSize: 24,
          fontWeight: "bold",
          color: "#006368",
          marginBottom: 10,
          marginTop: 20,
          textAlign: "center",
        },
        petInfo: {
          backgroundColor: "#eaf8f6",
          padding: 15,
          borderRadius: 10,
          marginHorizontal: "20%",
        },
        label: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#333",
        },
        value: {
          fontWeight: "normal",
        },
        queryItem: {
          flexDirection: "row",
          backgroundColor: "#f9f9f9",
          padding: 15,
          marginBottom: 10,
          borderRadius: 8,
          elevation: 1,
          alignItems: "center",
          justifyContent: "space-between",
        },
        queryTextContainer: {
          flex: 1,
          marginRight: 10,
        },
        queryText: {
          fontSize: 16,
          marginBottom: 8,
        },
        bold: {
          fontWeight: "bold",
        },
        deleteButton: {
          backgroundColor: "#FF0000",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
        },
        deleteButtonText: {
          color: "#fff",
          fontWeight: "bold",
          fontSize: 16,
        },
        loadingText: {
          textAlign: "center",
          fontSize: 16,
          color: "#333",
        },
        errorText: {
          textAlign: "center",
          fontSize: 16,
          color: "red",
        },
        modalOverlay: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        modalContent: {
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 10,
          width: 300,
          alignItems: "center",
        },
        modalTitle: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        },
        modalText: {
          fontSize: 18,
          marginBottom: 20,
          textAlign: "center",
        },
        modalButtons: {
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        },
        cancelButton: {
          backgroundColor: "#B0B0B0",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
          marginHorizontal: 10,
        },
        deleteButtonModal: {
          backgroundColor: "#009688",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
          marginHorizontal: 10,
        },
        modalButtonText: {
          color: "#fff",
          fontWeight: "bold",
          fontSize: 16,
        },
      });

export default RemoveQueryScreen;
