import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiService from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VetUsersScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserID = await AsyncStorage.getItem("userID");
        if (storedUserID) {
          setUserID(storedUserID);
        }
      } catch (error) {
        console.error("Error obteniendo userID:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      if (!userID) return;

      setLoading(true);
      try {
        const response = await apiService.getUsersByVetId(userID);
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [userID]);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.client}>
      <Text style={styles.clientName}>
        👤 {item.name} {item.surnames}
      </Text>
      <Text style={styles.details}>
        📞 Teléfono: <Text style={styles.bold}>{item.phone}</Text>
      </Text>
      <Text style={styles.details}>
        📧 Email: <Text style={styles.bold}>{item.email}</Text>
      </Text>
    </View>
  );

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
        <Text style={styles.navTitle}>Usuarios</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar cliente..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#009688" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredClients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.container}
          ListEmptyComponent={
            <Text style={styles.noClients}>No hay clientes disponibles</Text>
          }
        />
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
        client: {
          backgroundColor: "#ffffff",
          padding: 16,
          marginVertical: 8,
          borderRadius: 10,
          elevation: 2,
        },
        clientName: {
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 8,
        },
        details: {
          fontSize: 14,
          marginBottom: 4,
        },
        bold: {
          fontWeight: "bold",
        },
        noClients: {
          textAlign: "center",
          marginTop: 20,
          fontSize: 16,
        },
        loader: {
          marginTop: 20,
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
          padding: 16,
        },
        searchInput: {
          height: 40,
          margin: 16,
          borderWidth: 1,
          borderColor: "#009688",
          borderRadius: 8,
          paddingLeft: 10,
          marginHorizontal: "20%",
          fontSize: 16,
          backgroundColor: "white",
        },
        client: {
          backgroundColor: "#ffffff",
          padding: 16,
          marginVertical: 8,
          marginHorizontal: "20%",
          borderRadius: 10,
          elevation: 2,
        },
        clientName: {
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 8,
        },
        details: {
          fontSize: 14,
          marginBottom: 4,
        },
        bold: {
          fontWeight: "bold",
        },
        noClients: {
          textAlign: "center",
          marginTop: 20,
          fontSize: 16,
        },
        loader: {
          marginTop: 20,
        },
      });

export default VetUsersScreen;
