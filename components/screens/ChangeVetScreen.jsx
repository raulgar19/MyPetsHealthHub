import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
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
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiService from "../../api";
import * as Linking from "expo-linking";

const ChangeVetScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [veterinarios, setVeterinarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    if (item.link) {
      if (Platform.OS === "web") {
        window.open(item.link, "_blank");
      } else {
        Linking.openURL(item.link).catch(() => {
          Alert.alert("Error", "No se pudo abrir el enlace de Google Maps.");
        });
      }
    }
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default ChangeVetScreen;
