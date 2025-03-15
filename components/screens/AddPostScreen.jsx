import React, { useState } from "react";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "../../cloudinary";
import apiService from "../../api";

const AddPostScreen = () => {
  const [description, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  const userId = localStorage.getItem("userID");

  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
    }
  };

  const handlePost = async () => {
    if (description) {
      setLoading(true);
      try {
        const imageUrl = null;

        if (selectedImage) {
          imageUrl = await uploadImageToCloudinary(selectedImage);
        }

        await apiService.addPost({
          description: description,
          imageUrl: imageUrl,
          userId: userId,
        });

        setContent("");
        setSelectedImage(null);
        setModalTitle("Éxito");
        setModalMessage("¡Publicación creada con éxito!");
        setModalVisible(true);
        fadeIn();
      } catch (error) {
        console.error(error.message);
        setModalTitle("Error");
        setModalMessage("Error al crear la publicación.");
        setModalVisible(true);
        fadeIn();
      } finally {
        setLoading(false);
      }
    } else {
      setModalTitle("Error");
      setModalMessage("Por favor, ingrese al menos contenido.");
      setModalVisible(true);
      fadeIn();
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

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
        <Text style={styles.navTitle}>Crear nueva publicación</Text>
        <Link asChild href={"/profile"}>
          <Pressable style={styles.profileButton}>
            <Image
              source={require("../../assets/icons/profile-icon.png")}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Escribe aquí el contenido de tu publicación..."
          value={description}
          onChangeText={setContent}
          multiline
        />
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={handleChooseImage}
        >
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
            />
          ) : (
            <Text style={styles.imagePickerText}>Subir Imagen</Text>
          )}
        </TouchableOpacity>
        <Pressable
          style={styles.postButton}
          onPress={handlePost}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Cargando..." : "Publicar"}
          </Text>
        </Pressable>
      </View>
      <View style={styles.iconContainer}>
        <Link asChild href={"/social"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/start-icon.png")}
              style={styles.iconImage}
            />
          </Pressable>
        </Link>
        <Link asChild href={"/addPost"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/add-post-icon.png")}
              style={styles.iconImage}
            />
          </Pressable>
        </Link>
        <Link asChild href={"/myPosts"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/look-posts-icon.png")}
              style={styles.iconImage}
            />
          </Pressable>
        </Link>
      </View>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          fadeOut();
          setTimeout(() => setModalVisible(false), 500);
        }}
      >
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalText}>{modalMessage}</Text>

            {modalTitle === "Publicación exitosa" && (
              <Link asChild href="/store">
                <Pressable
                  style={styles.modalCloseButton}
                  onPress={() => {
                    setModalVisible(false);
                    fadeAnim.setValue(0);
                  }}
                >
                  <Text style={styles.modalCloseButtonText}>
                    Ir a la tienda
                  </Text>
                </Pressable>
              </Link>
            )}
            {modalTitle === "Error" && (
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => {
                  setModalVisible(false);
                  fadeAnim.setValue(0);
                }}
              >
                <Text style={styles.modalCloseButtonText}>Cerrar</Text>
              </Pressable>
            )}
            {modalTitle !== "Error" && (
              <Link asChild href="/social">
                <Pressable
                  style={styles.modalCloseButton}
                  onPress={() => {
                    setModalVisible(false);
                    fadeAnim.setValue(0);
                  }}
                >
                  <Text style={styles.modalCloseButtonText}>Cerrar</Text>
                </Pressable>
              </Link>
            )}
          </View>
        </Animated.View>
      </Modal>
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
  profileButton: {
    padding: 5,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    textAlignVertical: "top",
    marginBottom: 20,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  imagePicker: {
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  imagePickerText: {
    color: "#666",
    fontSize: 16,
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  postButton: {
    backgroundColor: "#009688",
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 100,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#006368",
    elevation: 5,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000", // Title color set to black
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
    textAlign: "center", // Center text
  },
  modalCloseButton: {
    backgroundColor: "#009688",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  modalCloseButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddPostScreen;
