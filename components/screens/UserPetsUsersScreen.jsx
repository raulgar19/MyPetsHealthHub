import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  TextInput,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiService from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserPetsUsersScreen = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userID");
        if (!userId) {
          setError("Veterinario no encontrado");
          setLoading(false);
          return;
        }

        const response = await apiService.getUsersByVetId(userId);
        setClients(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los clientes");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const keepOwner = async (id) => {
    await AsyncStorage.setItem("ownerID", id);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Link asChild href={"/userPets"} style={styles.item}>
      <Pressable onPress={keepOwner(item.id)}>
        <Text style={styles.text}>
          <Text style={styles.bold}>Nombre:</Text> {item.name}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Teléfono:</Text> {item.phone}
        </Text>
      </Pressable>
    </Link>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.loadingText}>Cargando clientes...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
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
        <Text style={styles.navTitle}>Listado clientes</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar cliente..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
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
        searchBar: {
          height: 40,
          borderColor: "#006368",
          backgroundColor: "white",
          borderWidth: 1,
          marginTop: 10,
          marginHorizontal: 20,
          marginBottom: 20,
          borderRadius: 8,
          paddingLeft: 10,
          fontSize: 16,
        },
        list: {
          marginHorizontal: 20,
        },
        item: {
          backgroundColor: "#f9f9f9",
          padding: 15,
          marginBottom: 10,
          borderRadius: 8,
          elevation: 1,
        },
        text: {
          fontSize: 16,
        },
        bold: {
          fontWeight: "bold",
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
        searchBar: {
          height: 40,
          borderColor: "#006368",
          backgroundColor: "white",
          borderWidth: 1,
          marginTop: 10,
          marginHorizontal: "20%",
          marginBottom: 20,
          borderRadius: 8,
          paddingLeft: 10,
          fontSize: 16,
        },
        list: {
          marginHorizontal: "20%",
        },
        item: {
          backgroundColor: "#f9f9f9",
          padding: 15,
          marginBottom: 10,
          borderRadius: 8,
          elevation: 1,
        },
        text: {
          fontSize: 16,
        },
        bold: {
          fontWeight: "bold",
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

export default UserPetsUsersScreen;
