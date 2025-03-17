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
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiService from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PetsVetScreen = () => {
  const [pets, setPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const storedUserID = await AsyncStorage.getItem("userID");
        if (storedUserID) {
          setUserID(storedUserID);
        }
      } catch (error) {
        console.error("Error obteniendo userID:", error);
      }
    };

    fetchUserID();
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      if (!userID) return;

      setLoading(true);
      try {
        const response = await apiService.getPetsByVetId(userID);
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [userID]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.pet}>
      <Text style={styles.petName}>🐾 {item.name}</Text>
      <Text style={styles.details}>
        🐕 Especie: <Text style={styles.bold}>{item.species}</Text>
      </Text>
      <Text style={styles.details}>
        🏷️ Raza: <Text style={styles.bold}>{item.breed}</Text>
      </Text>
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
          <Text style={styles.navTitle}>Mascotas</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar animal..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#009688" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredPets}
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
    marginVertical: 20,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
  },
  list: {
    marginHorizontal: 20,
  },
  pet: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  petName: {
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
  loader: {
    marginTop: 20,
  },
});

export default PetsVetScreen;
