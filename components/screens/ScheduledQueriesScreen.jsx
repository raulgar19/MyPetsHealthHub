import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiService from "../../api";

const ScheduledQueriesScreen = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const userId = await AsyncStorage.getItem("userID");
        if (!userId) throw new Error("No se encontró el ID del usuario.");

        const response = await ApiService.getUserPetsQueries(userId);
        setQueries(response.data);
      } catch (err) {
        setError(err.message || "Error al obtener los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  const formatDateTime = (dateString, hourString) => {
    let date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate =
      (day < 10 ? "0" : "") +
      day +
      "/" +
      (month < 10 ? "0" : "") +
      month +
      "/" +
      year;

    let hourSplited = hourString.split(":");
    const formattedTime = hourSplited[0] + ":" + hourSplited[1];

    return { formattedDate, formattedTime };
  };

  const handleSubmit = async (queryId) => {
    await AsyncStorage.setItem("queryID", queryId);
  };

  const renderQuery = ({ item }) => {
    const { formattedDate, formattedTime } = formatDateTime(
      item.date,
      item.hour
    );

    return (
      <Link asChild href={"/queryDetails"}>
        <Pressable
          style={styles.queryContainer}
          onPress={() => handleSubmit(item.id)}
        >
          <Text style={styles.petName}>Mascota: {item.pet.name}</Text>
          <Text style={styles.details}>Fecha: {formattedDate}</Text>
          <Text style={styles.details}>Hora: {formattedTime}</Text>
          <Text style={styles.details}>Veterinario: {item.vet.name}</Text>
        </Pressable>
      </Link>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Link asChild href={"/home"}>
            <Pressable>
              <Image
                source={require("../../assets/icons/logo-mobile.png")}
                style={styles.logo}
              />
            </Pressable>
          </Link>
          <Text style={styles.navTitle}>Citas Pendientes</Text>
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
          <ActivityIndicator size="large" color="#006368" />
        ) : error ? (
          <Text style={styles.errorText}>
            No hay citas disponibles en este momento
          </Text>
        ) : (
          <FlatList
            data={queries}
            renderItem={renderQuery}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles =
  Platform.OS !== "web"
    ? StyleSheet.create({
        safeContainer: {
          flex: 1,
          backgroundColor: "#B7E3DD",
        },
        container: {
          flex: 1,
        },
        navbar: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: 60,
          backgroundColor: "#006368",
          paddingHorizontal: 20,
          marginBottom: 20,
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
        listContainer: {
          paddingBottom: 16,
          marginHorizontal: 20,
        },
        queryContainer: {
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        },
        petName: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 4,
        },
        details: {
          fontSize: 16,
          color: "#555",
          marginBottom: 4,
        },
        errorText: {
          fontSize: 16,
          textAlign: "center",
          marginTop: 50,
          color: "#777",
        },
      })
    : StyleSheet.create({
        safeContainer: {
          flex: 1,
          backgroundColor: "#B7E3DD",
        },
        container: {
          flex: 1,
        },
        navbar: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: 60,
          backgroundColor: "#006368",
          paddingHorizontal: 20,
          marginBottom: 20,
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
        listContainer: {
          paddingBottom: 16,
          marginHorizontal: "20%",
        },
        queryContainer: {
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        },
        petName: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 4,
        },
        details: {
          fontSize: 16,
          color: "#555",
          marginBottom: 4,
        },
        errorText: {
          fontSize: 16,
          textAlign: "center",
          marginTop: 50,
          color: "#777",
        },
      });

export default ScheduledQueriesScreen;
