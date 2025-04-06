import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  Alert,
  Platform,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Linking } from "react-native";
import apiService from "../../services/api";

const EmergencyScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [emergencies, setEmergencies] = useState([]);
  const [filteredEmergencies, setFilteredEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const response = await apiService.getAllEmergencies();
        setEmergencies(response.data);
        setFilteredEmergencies(response.data);
      } catch (err) {
        setError("Error al cargar la lista de emergencias");
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencies();
  }, []);

  useEffect(() => {
    const filterEmergencies = () => {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = emergencies.filter((emergency) =>
        emergency.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredEmergencies(filtered);
    };

    filterEmergencies();
  }, [searchQuery, emergencies]);

  const handlePress = (link) => {
    if (link) {
      if (Platform.OS === "web") {
        window.open(link, "_blank");
      } else {
        Linking.openURL(link).catch(() => {
          Alert.alert("Error", "No se pudo abrir el enlace de Google Maps.");
        });
      }
    }
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.listItem} onPress={() => handlePress(item.link)}>
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
        <Text style={styles.navTitle}>Urgencias 24h</Text>
        <Link asChild href={"/profile"}>
          <Pressable style={styles.profileButton}>
            <Image
              source={require("../../assets/icons/profile-icon.png")}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar Emergencias..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={filteredEmergencies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.noResults}>No se encontraron emergencias</Text>
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
        logo: {
          width: 40,
          height: 40,
        },
        navTitle: {
          color: "#fff",
          fontSize: 20,
          fontWeight: "bold",
        },
        profileButton: {
          padding: 5,
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
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.5,
          elevation: 3,
        },
        itemTitle: {
          fontSize: 18,
          fontWeight: "bold",
        },
        itemAddress: {
          fontSize: 14,
          color: "#555",
        },
        loadingText: {
          textAlign: "center",
          fontSize: 18,
          color: "#006368",
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
        profileButton: {
          padding: 5,
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
          marginHorizontal: "20%",
          fontSize: 16,
          backgroundColor: "white",
        },
        list: {
          flex: 1,
        },
        listContent: {
          marginHorizontal: "20%",
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
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.5,
          elevation: 3,
        },
        itemTitle: {
          fontSize: 18,
          fontWeight: "bold",
        },
        itemAddress: {
          fontSize: 14,
          color: "#555",
        },
        loadingText: {
          textAlign: "center",
          fontSize: 18,
          color: "#006368",
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
      });

export default EmergencyScreen;
