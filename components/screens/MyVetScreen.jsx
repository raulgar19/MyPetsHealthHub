import React from "react";
import { Link } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyVetScreen = () => {
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

      <View style={styles.vetInfoContainer}>
        <Image
          source={require("../../assets/icons/kivet-logo.png")}
          style={styles.vetImage}
        />
        <Text style={styles.vetName}>Dr. Juan Pérez</Text>
        <Text style={styles.vetSpecialty}>
          Especialista en Mascotas Pequeñas
        </Text>
        <Text style={styles.vetClinic}>
          Clínica: Centro Veterinario Vida Animal
        </Text>
        <Text style={styles.vetPhone}>Teléfono: +34 123 456 789</Text>
        <Text style={styles.vetAddress}>
          Dirección: Calle de las Flores, 10, Madrid
        </Text>
      </View>
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
  map: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  vetInfoContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
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
  vetSpecialty: {
    fontSize: 16,
    color: "#009688",
    marginBottom: 10,
  },
  vetClinic: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  vetPhone: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  vetAddress: {
    fontSize: 16,
    color: "#333",
  },
});

export default MyVetScreen;
