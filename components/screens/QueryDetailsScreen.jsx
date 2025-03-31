import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiService from "../../services/api";

const QueryDetailsScreen = () => {
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const fetchQueryDetails = async () => {
      try {
        const queryId = await AsyncStorage.getItem("queryID");
        if (!queryId) throw new Error("No se encontró el ID de la consulta.");

        const response = await ApiService.getQueryById(queryId);
        setQuery(response.data);
        const { formattedDate, formattedTime } = formatDateTime(
          response.data.date,
          response.data.hour
        );
        setFormattedDate(formattedDate);
        setFormattedTime(formattedTime);
      } catch (err) {
        setError(
          err.message || "Error al obtener los detalles de la consulta."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQueryDetails();
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

  if (loading) {
    return <ActivityIndicator size="large" color="#006368" />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.navbar}>
          <Link asChild href={"/home"}>
            <Pressable>
              <Image
                source={require("../../assets/icons/logo-mobile.png")}
                style={styles.logo}
              />
            </Pressable>
          </Link>
          <Text style={styles.navTitle}>Detalles de la cita</Text>
          <Link asChild href={"/profile"}>
            <Pressable>
              <Image
                source={require("../../assets/icons/profile-icon.png")}
                style={styles.profileIcon}
              />
            </Pressable>
          </Link>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            No se encontró la cita seleccionada
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.navbar}>
        <Link asChild href={"/home"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/logo-mobile.png")}
              style={styles.logo}
            />
          </Pressable>
        </Link>
        <Text style={styles.navTitle}>Detalles de la cita</Text>
        <Link asChild href={"/profile"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/profile-icon.png")}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Consulta de {query.pet.name}</Text>
          <Text style={styles.info}>Fecha: {formattedDate}</Text>
          <Text style={styles.info}>Hora: {formattedTime}</Text>
          <Text style={styles.info}>Veterinario: {query.vet.name}</Text>
          <Text style={styles.info}>Dirección: {query.vet.address}</Text>

          <Text style={styles.subtitle}>Propósito de la Consulta:</Text>
          <Text style={styles.info}>{query.purpose}</Text>

          <Text style={styles.subtitle}>Acciones Requeridas:</Text>
          <Text style={styles.info}>{query.requiredActions}</Text>

          <Text style={styles.subtitle}>
            Instrucciones Previas a la Visita:
          </Text>
          <Text style={styles.info}>{query.previewInstructions}</Text>

          <Text style={styles.subtitle}>Próximas Acciones:</Text>
          <Text style={styles.info}>{query.followUpActions}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#B7E3DD",
  },
  container: {
    alignItems: "center",
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
  detailsContainer: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
  },
  info: {
    fontSize: 18,
    marginBottom: 12,
    color: "#555",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#000",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
    color: "#777",
  },
});

export default QueryDetailsScreen;
