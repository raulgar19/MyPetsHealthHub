import React from "react";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VetHomeScreen = () => {
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
        <Text style={styles.navTitle}>Menú Veterinario</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Opciones</Text>

          <Text style={styles.categoryTitle}>Citas</Text>
          <View style={styles.menuContainer}>
            <Link asChild href={"/selectUser"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require("../../assets/icons/logo-mobile.png")}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Añadir cita</Text>
              </Pressable>
            </Link>
            <Link asChild href={"/removeQueryUsers"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require("../../assets/icons/logo-mobile.png")}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Eliminar cita</Text>
              </Pressable>
            </Link>
            <Link asChild href={"/allQueries"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require("../../assets/icons/logo-mobile.png")}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Citas Pendientes</Text>
              </Pressable>
            </Link>
          </View>

          <Text style={styles.categoryTitle}>Clientes y mascotas</Text>
          <View style={styles.menuContainer}>
            <Link asChild href={"/vetUsers"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require("../../assets/icons/logo-mobile.png")}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Usuarios del veterinario</Text>
              </Pressable>
            </Link>
            <Link asChild href={"/vetPets"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require("../../assets/icons/logo-mobile.png")}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Mascotas del veterinario</Text>
              </Pressable>
            </Link>
            <Link asChild href={"/userPetsUsers"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require("../../assets/icons/logo-mobile.png")}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Mascotas de un cliente</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
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
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
        },
        innerContainer: {
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "flex-start",
          paddingBottom: 20,
        },
        title: {
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 20,
        },
        categoryTitle: {
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "left",
          marginVertical: 10,
          width: "100%",
          color: "#006368",
        },
        menuContainer: {
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
        },
        menuItem: {
          backgroundColor: "#009688",
          width: "48%",
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          marginBottom: 10,
        },
        menuIcon: {
          width: 50,
          height: 50,
          marginBottom: 10,
        },
        menuText: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "600",
          textAlign: "center",
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
        profileIcon: {
          width: 40,
          height: 40,
        },
        container: {
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
          marginHorizontal: "20%",
        },
        innerContainer: {
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "flex-start",
          paddingBottom: 20,
        },
        title: {
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 20,
        },
        categoryTitle: {
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 20,
          width: "100%",
          color: "#006368",
        },
        menuContainer: {
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          width: "100%",
          marginBottom: 40,
        },
        menuItem: {
          backgroundColor: "#009688",
          width: "25%",
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          marginBottom: 15,
          transition: "transform 0.2s ease-in-out",
        },
        menuIcon: {
          width: 60,
          height: 60,
          marginBottom: 10,
        },
        menuText: {
          color: "#fff",
          fontSize: 18,
          fontWeight: "600",
          textAlign: "center",
        },
      });

export default VetHomeScreen;
