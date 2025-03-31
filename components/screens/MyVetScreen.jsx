import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiService from "../../services/api";

const MyVetScreen = () => {
  const [vet, setVet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVetInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem("userID");

        if (!userId)
          throw new Error("No se encontró el userID en AsyncStorage.");

        const response = await ApiService.getVetByAppUserId(userId);

        if (!response || !response.data)
          throw new Error("No se encontraron datos del veterinario.");

        setVet(response.data);
      } catch (err) {
        setError(err.message || "Error al obtener los datos del veterinario.");
      } finally {
        setLoading(false);
      }
    };

    fetchVetInfo();
  }, []);

  const handlePress = () => {
    if (vet.link) {
      if (Platform.OS === "web") {
        window.open(vet.link, "_blank");
      } else {
        Linking.openURL(vet.link).catch(() => {
          Alert.alert("Error", "No se pudo abrir el enlace de Google Maps.");
        });
      }
    }
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
        <Text style={styles.navTitle}>Mi Veterinario</Text>
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
          color="#006368"
          style={styles.loading}
        />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            No se ha podido cargar los datos del veterinario
          </Text>
        </View>
      ) : (
        <View style={styles.vetInfoContainer}>
          <Image
            source={require("../../assets/icons/vet-icon.png")}
            style={styles.vetImage}
          />
          <Text style={styles.vetName}>
            {vet?.name || "Veterinario no disponible"}
          </Text>
          <Text style={styles.vetAddress}>
            Dirección: {vet?.address || "No disponible"}
          </Text>
          <Text style={styles.vetLink} onPress={() => handlePress()}>
            {vet?.link || "Centro no disponible"}
          </Text>
        </View>
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
        vetInfoContainer: {
          alignItems: "center",
          padding: 20,
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          marginTop: 10,
          marginHorizontal: 20,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        },
        vetImage: {
          width: 100,
          height: 100,
          borderRadius: 50,
          marginBottom: 15,
        },
        vetName: {
          fontSize: 22,
          fontWeight: "bold",
          color: "#333",
          marginBottom: 5,
        },
        vetAddress: {
          fontSize: 16,
          color: "#333",
        },
        vetLink: {
          fontSize: 16,
          color: "#009688",
          marginBottom: 10,
        },
        loading: {
          marginTop: 50,
        },
        errorContainer: {
          alignItems: "center",
          marginTop: 50,
        },
        errorText: {
          fontSize: 16,
          textAlign: "center",
          marginTop: 50,
          color: "#777",
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
        vetInfoContainer: {
          alignItems: "center",
          padding: 20,
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          marginTop: 10,
          marginHorizontal: "20%",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        },
        vetImage: {
          width: 100,
          height: 100,
          borderRadius: 50,
          marginBottom: 15,
        },
        vetName: {
          fontSize: 22,
          fontWeight: "bold",
          color: "#333",
          marginBottom: 5,
        },
        vetAddress: {
          fontSize: 16,
          color: "#333",
        },
        vetLink: {
          fontSize: 16,
          color: "#009688",
          marginBottom: 10,
        },
        loading: {
          marginTop: 50,
        },
        errorContainer: {
          alignItems: "center",
          marginTop: 50,
        },
        errorText: {
          fontSize: 16,
          textAlign: "center",
          marginTop: 50,
          color: "#777",
        },
      });

export default MyVetScreen;
