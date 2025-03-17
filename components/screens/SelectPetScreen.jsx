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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiService from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelectPetScreen = () => {
  const [pets, setPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const ownerID = parseInt(await AsyncStorage.getItem("ownerID"));
        if (ownerID) {
          const response = await apiService.getUserPets(ownerID);
          setPets(response.data);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleSelectPet = async (petId) => {
    try {
      await AsyncStorage.setItem("petID", petId.toString());
    } catch (error) {
      console.error("Error saving petID:", error);
    }
  };

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Link asChild href={"/addQuery"} style={styles.item}>
      <Pressable onPress={() => handleSelectPet(item.id)}>
        <Text style={styles.text}>
          <Text style={styles.bold}>Nombre:</Text> {item.name}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Especie:</Text> {item.species}
        </Text>
      </Pressable>
    </Link>
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
          <Text style={styles.navTitle}>Animales del usuario</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar animal..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredPets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
      />
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
});

export default SelectPetScreen;
