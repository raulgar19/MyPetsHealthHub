import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OtherChanges = () => {
  const backgroundSource =
    Platform.OS === "web"
      ? require("../../assets/web-background.png")
      : require("../../assets/mobile-background.png");

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
        <Text style={styles.navTitle}>Otros cambios</Text>
      </View>

      <ImageBackground source={backgroundSource} style={styles.background}>
        <View style={styles.buttonContainer}>
          <Link asChild href={"/changeBankAccount"}>
            <Pressable style={styles.optionButton}>
              <Text style={styles.optionButtonText}>
                Cambiar Cuenta Bancaria
              </Text>
            </Pressable>
          </Link>
          <Link asChild href={"/changeEmail"}>
            <Pressable style={styles.optionButton}>
              <Text style={styles.optionButtonText}>Cambiar Email</Text>
            </Pressable>
          </Link>
          <Link asChild href={"/changePass"}>
            <Pressable style={styles.optionButton}>
              <Text style={styles.optionButtonText}>Cambiar Contraseña</Text>
            </Pressable>
          </Link>
        </View>
      </ImageBackground>
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
        background: {
          flex: 1,
          resizeMode: "cover",
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
        buttonContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        optionButton: {
          backgroundColor: "#009688",
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 10,
          width: "80%",
          marginVertical: 10,
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        },
        optionButtonText: {
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: "bold",
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
        background: {
          flex: 1,
          resizeMode: "cover",
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
        buttonContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        optionButton: {
          backgroundColor: "#009688",
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 10,
          width: "30%",
          marginVertical: 10,
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        },
        optionButtonText: {
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: "bold",
        },
      });

export default OtherChanges;
