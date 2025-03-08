import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiService from "../../api";

const SelectUserScreen = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const vetId = parseInt(localStorage.getItem("userID"), 10);
        if (!vetId) {
          setError(
            "No se encontró el ID del veterinario en el almacenamiento."
          );
          setLoading(false);
          return;
        }

        const response = await apiService.getUsersByVetId(vetId);
        setClients(response.data);
      } catch (err) {
        setError("Error al obtener la lista de clientes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleSelectClient = (item) => {
    localStorage.setItem("ownerID", item.id);
    router.push("/selectPet"); // Redirige a la pantalla de selección de mascota
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Pressable style={styles.item} onPress={() => handleSelectClient(item)}>
      <Text style={styles.text}>
        <Text style={styles.bold}>Nombre:</Text> {item.name}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Teléfono:</Text> {item.phone}
      </Text>
    </Pressable>
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
          <Text style={styles.navTitle}>Listado Clientes</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar cliente..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#006368" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={filteredClients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          style={styles.list}
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
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 60,
    backgroundColor: "#006368",
    paddingHorizontal: 20,
    marginBottom: 20,
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
  searchBar: {
    height: 40,
    borderColor: "#006368",
    backgroundColor: "white",
    borderWidth: 1,
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
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SelectUserScreen;
