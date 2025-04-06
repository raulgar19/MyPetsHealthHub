import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiService from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AllQueriesScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userId = await AsyncStorage.getItem("userID");
        if (!userId) {
          setError("Veterinario no encontrado");
          setLoading(false);
          return;
        }

        const response = await apiService.getVetQueries(userId);
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError("No hay citas disponibles");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatHour = (hourString) => {
    let hourSplited = hourString.split(":");
    const formattedTime = hourSplited[0] + ":" + hourSplited[1];
    return formattedTime;
  };

  const renderItem = ({ item }) => (
    <View style={styles.appointment}>
      <Text style={styles.petName}>{item.pet.name}</Text>
      <Text style={styles.details}>
        Propietario:{" "}
        <Text style={styles.bold}>
          {item.pet.appUser.name + " " + item.pet.appUser.surnames}
        </Text>
      </Text>
      <Text style={styles.details}>
        Fecha: <Text style={styles.bold}>{formatDate(item.date)}</Text>
      </Text>
      <Text style={styles.details}>
        Hora: <Text style={styles.bold}>{formatHour(item.hour)}</Text>
      </Text>
      <Text style={styles.details}>Detalles: {item.purpose}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.loadingText}>Cargando citas...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.navbar}>
          <Link asChild href={"/vetHome"}>
            <Pressable>
              <Image
                source={require("../../assets/icons/logo-mobile.png")}
                style={styles.logo}
              />
            </Pressable>
          </Link>
          <Text style={styles.navTitle}>Citas Pendientes</Text>
        </View>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href={"/vetHome"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/logo-mobile.png")}
              style={styles.logo}
            />
          </Pressable>
        </Link>
        <Text style={styles.navTitle}>Citas Pendientes</Text>
      </View>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <Text style={styles.noAppointments}>No hay citas disponibles</Text>
        }
      />
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
          padding: 16,
        },
        appointment: {
          backgroundColor: "#ffffff",
          padding: 16,
          marginVertical: 8,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
          borderLeftWidth: 4,
          borderLeftColor: "#009688",
        },
        petName: {
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 8,
          color: "#006368",
        },
        details: {
          fontSize: 14,
          color: "#555",
          marginBottom: 4,
        },
        bold: {
          fontWeight: "bold",
        },
        noAppointments: {
          textAlign: "center",
          marginTop: 20,
          fontSize: 16,
          color: "#555",
        },
        loadingText: {
          textAlign: "center",
          marginTop: 20,
          fontSize: 16,
          color: "#555",
        },
        errorText: {
          textAlign: "center",
          marginTop: 20,
          fontSize: 16,
          color: "#D9534F",
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
          marginHorizontal: "30%",
        },
        appointment: {
          backgroundColor: "#ffffff",
          padding: 16,
          marginVertical: 8,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
          borderLeftWidth: 4,
          borderLeftColor: "#009688",
        },
        petName: {
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 8,
          color: "#006368",
        },
        details: {
          fontSize: 14,
          color: "#555",
          marginBottom: 4,
        },
        bold: {
          fontWeight: "bold",
        },
        noAppointments: {
          textAlign: "center",
          marginTop: 20,
          fontSize: 16,
          color: "#555",
        },
        loadingText: {
          textAlign: "center",
          marginTop: 20,
          fontSize: 16,
          color: "#555",
        },
        errorText: {
          textAlign: "center",
          marginTop: 20,
          fontSize: 16,
          color: "#D9534F",
        },
      });

export default AllQueriesScreen;
