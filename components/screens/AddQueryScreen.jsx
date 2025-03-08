import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiService from "../../api";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const AddQueryScreen = () => {
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [purpose, setPurpose] = useState("");
  const [requiredActions, setRequiredActions] = useState("");
  const [preInstructions, setPreInstructions] = useState("");
  const [postActions, setPostActions] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const petID = await localStorage.getItem("petID");
        if (petID) {
          const response = await apiService.getPetById(petID);
          setPet(response.data);
        }
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    fetchPet();
  }, []);

  useEffect(() => {
    setIsFormValid(
      date.trim() !== "" && hour.trim() !== "" && purpose.trim() !== ""
    );
  }, [date, hour, purpose]);

  const handleSaveQuery = async () => {
    if (!isFormValid) {
      setModalVisible(true);
      return;
    }

    try {
      const addQueryModel = {
        date: new Date(date).toISOString(),
        hour: `${hour}:00`,
        purpose: purpose,
        requiredActions: requiredActions,
        preInstructions: preInstructions,
        postActions: postActions,
        petId: localStorage.getItem("petID"),
        vetId: localStorage.getItem("userID"),
      };

      await apiService.addQuery(addQueryModel);
      console.log("Consulta guardada correctamente.");
      router.push("/vetHome");
    } catch (error) {
      console.error("Error al guardar la consulta:", error);
    }
  };

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
          <Text style={styles.navTitle}>Añadir Cita</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Información de la mascota</Text>
        {pet ? (
          <View style={styles.petInfo}>
            <Text style={styles.label}>
              Nombre: <Text style={styles.value}>{pet.name}</Text>
            </Text>
            <Text style={styles.label}>
              Especie: <Text style={styles.value}>{pet.species}</Text>
            </Text>
            <Text style={styles.label}>
              Raza: <Text style={styles.value}>{pet.breed}</Text>
            </Text>
            <Text style={styles.label}>
              Fecha de nacimiento:{" "}
              <Text style={styles.value}>{formatDate(pet.birthday)}</Text>
            </Text>
          </View>
        ) : (
          <Text>Cargando información de la mascota...</Text>
        )}

        <Text style={styles.header}>Datos de la cita</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Fecha:</Text>
          <TextInput
            style={styles.input}
            placeholder="dd/mm/yyyy"
            value={date}
            onChangeText={setDate}
          />

          <Text style={styles.label}>Hora:</Text>
          <TextInput
            style={styles.input}
            placeholder="hh:mm"
            value={hour}
            onChangeText={setHour}
          />

          <Text style={styles.label}>Objetivo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Revisión médica"
            value={purpose}
            onChangeText={setPurpose}
          />

          <Text style={styles.label}>Acciones Requeridas:</Text>
          <TextInput
            style={styles.input}
            placeholder="Describe las acciones"
            value={requiredActions}
            onChangeText={setRequiredActions}
          />

          <Text style={styles.label}>Instrucciones Previas:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Ayuno de 8 horas"
            value={preInstructions}
            onChangeText={setPreInstructions}
          />

          <Text style={styles.label}>Acciones Posteriores:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Medicación a administrar"
            value={postActions}
            onChangeText={setPostActions}
          />
        </View>

        <Pressable style={styles.button} onPress={handleSaveQuery}>
          <Text style={styles.buttonText}>Guardar Consulta</Text>
        </Pressable>
      </ScrollView>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Por favor, completa todos los campos obligatorios.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#006368",
    marginBottom: 15,
    textAlign: "left",
  },
  petInfo: {
    backgroundColor: "#eaf8f6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontWeight: "normal",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#006368",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#006368",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AddQueryScreen;
