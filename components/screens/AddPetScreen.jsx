import React, { useState } from "react";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import apiService from "../../api";

const convertDateFormat = (dateStr) => {
  const parts = dateStr.split("/");
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

const AddPetScreen = () => {
  const [date, setDate] = useState(new Date());
  const [lastVaccineDate, setLastVaccineDate] = useState(new Date());
  const [showVaccineField, setShowVaccineField] = useState(false);
  const [petData, setPetData] = useState({
    chip: "",
    name: "",
    species: "",
    breed: "",
    gender: "",
    birthDay: "",
    weight: "",
    notes: "",
    lastVaccineDate: "",
    userId: parseInt(localStorage.getItem("userID"), 10),
  });

  const handleSpeciesChange = (text) => {
    setShowVaccineField(text.toLowerCase() === "perro");
  };

  const handleInputChange = (name, value) => {
    setPetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !petData.chip ||
      !petData.name ||
      !petData.species ||
      !petData.breed ||
      !petData.gender ||
      !petData.birthDay ||
      !petData.weight ||
      !petData.userId
    ) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    const formattedBirthDay = petData.birthDay
      ? convertDateFormat(petData.birthDay)
      : null;
    const formattedLastVaccineDate = petData.lastVaccineDate
      ? convertDateFormat(petData.lastVaccineDate)
      : null;

    const petRegisterModel = {
      chip: petData.chip,
      name: petData.name,
      species: petData.species,
      breed: petData.breed,
      birthday: formattedBirthDay
        ? new Date(formattedBirthDay).toISOString()
        : null,
      weight: parseFloat(petData.weight),
      gender: petData.gender,
      notes: petData.notes || null,
      lastVaccination: formattedLastVaccineDate
        ? new Date(formattedLastVaccineDate).toISOString()
        : null,
      userId: petData.userId,
    };

    try {
      await apiService.addPet(petRegisterModel);
      console.log("Mascota registrada con éxito");
    } catch (error) {
      console.error(
        "Error al añadir mascota:",
        error.response ? error.response.data : error
      );
    }
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
        <Text style={styles.navTitle}>Añadir Mascota</Text>
        <Link asChild href={"/profile"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/profile-icon.png")}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.petContainer}>
          <Text style={styles.header}>Información de la Mascota</Text>
          <TextInput
            placeholder="Nombre"
            style={styles.input}
            value={petData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <TextInput
            placeholder="Nº Chip"
            style={styles.input}
            value={petData.chip}
            onChangeText={(text) => handleInputChange("chip", text)}
          />
          <TextInput
            placeholder="Especie (e.g., Perro, Gato)"
            style={styles.input}
            value={petData.species}
            onChangeText={(text) => {
              handleInputChange("species", text);
              handleSpeciesChange(text);
            }}
          />
          <TextInput
            placeholder="Raza"
            style={styles.input}
            value={petData.breed}
            onChangeText={(text) => handleInputChange("breed", text)}
          />
          <TextInput
            placeholder="Sexo"
            style={styles.input}
            value={petData.gender}
            onChangeText={(text) => handleInputChange("gender", text)}
          />

          {Platform.OS === "web" ? (
            <TextInput
              style={styles.input}
              placeholder="Fecha de nacimiento (dd/mm/yyyy)"
              value={petData.birthDay}
              onChangeText={(text) => handleInputChange("birthDay", text)}
            />
          ) : (
            <TouchableOpacity style={styles.input}>
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const dateStr = selectedDate
                    ? selectedDate.toISOString().split("T")[0]
                    : "";
                  setDate(selectedDate || new Date());
                  handleInputChange("birthDay", dateStr);
                }}
                maximumDate={new Date()}
              />
            </TouchableOpacity>
          )}

          <TextInput
            placeholder="Peso (kg)"
            style={styles.input}
            value={petData.weight}
            onChangeText={(text) => handleInputChange("weight", text)}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Observaciones (e.g., alergias, tratamientos)"
            style={[styles.input, styles.textArea]}
            value={petData.notes}
            onChangeText={(text) => handleInputChange("notes", text)}
            multiline
            numberOfLines={4}
          />

          {showVaccineField && (
            <>
              <Text style={styles.subtitle}>Vacunas Obligatorias</Text>
              {Platform.OS === "web" ? (
                <TextInput
                  style={styles.input}
                  placeholder="Fecha última vacuna Rabia (dd/mm/yyyy)"
                  value={petData.lastVaccineDate}
                  onChangeText={(text) =>
                    handleInputChange("lastVaccineDate", text)
                  }
                />
              ) : (
                <TouchableOpacity style={styles.input}>
                  <DateTimePicker
                    value={lastVaccineDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      const vaccineDate = selectedDate
                        ? selectedDate.toISOString().split("T")[0]
                        : "";
                      setLastVaccineDate(selectedDate || new Date());
                      handleInputChange("lastVaccineDate", vaccineDate);
                    }}
                    maximumDate={new Date()}
                  />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
        <Link asChild href={"/home"}>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Registrar</Text>
          </Pressable>
        </Link>
      </ScrollView>
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
  scrollContainer: {
    padding: 20,
  },
  petContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 20,
    textAlign: "center",
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderColor: "#006368",
    borderWidth: 1,
  },
  textArea: {
    height: 100,
    paddingVertical: 10,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#009688",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddPetScreen;
