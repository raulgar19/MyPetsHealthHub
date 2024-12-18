import React, { useState } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddPetMobile = () => {
  const [petFields, setPetFields] = useState([1]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [lastVaccineDate, setLastVaccineDate] = useState(new Date());
  const [showVaccineDate, setShowVaccineDate] = useState(false);
  const [petSpecies, setPetSpecies] = useState({});
  const [additionalFieldEnabled, setAdditionalFieldEnabled] = useState({});

  const addPetFields = () => {
    setPetFields([...petFields, petFields.length + 1]);
  };

  const removePetFields = () => {
    if (petFields.length > 1) {
      setPetFields(petFields.slice(0, -1));
      const newPetSpecies = { ...petSpecies };
      const newAdditionalFieldEnabled = { ...additionalFieldEnabled };
      delete newPetSpecies[petFields.length - 1];
      delete newAdditionalFieldEnabled[petFields.length - 1];
      setPetSpecies(newPetSpecies);
      setAdditionalFieldEnabled(newAdditionalFieldEnabled);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const onChangeVaccineDate = (event, selectedDate) => {
    const currentDate = selectedDate || lastVaccineDate;
    setShowVaccineDate(false);
    setLastVaccineDate(currentDate);
  };

  const handleSpeciesChange = (index, text) => {
    setPetSpecies(prev => ({
      ...prev,
      [index]: text,
    }));
    if (text.toLowerCase() === 'perro') {
      setAdditionalFieldEnabled(prev => ({
        ...prev,
        [index]: true,
      }));
    } else {
      setAdditionalFieldEnabled(prev => ({
        ...prev,
        [index]: false,
      }));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href={"/home"}>
            <Pressable>
                <Image
                  source={require('../../assets/icons/logo-mobile.png')}
                  style={styles.logo}
                />
              </Pressable>
        </Link>
        <Text style={styles.navTitle}>Añadir Mascota</Text>
        <Link asChild href= {"/profile"}>
          <Pressable>
            <Image
              source={require('../../assets/icons/profile-icon.png')}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {petFields.map((field, index) => (
          <View key={index} style={styles.petContainer}>
            <Text style={styles.header}>Mascota {index + 1}</Text>
            <TextInput
              placeholder="Nombre de la Mascota"
              style={styles.input}
              placeholderTextColor="#A9A9A9"
              textAlign="left"
            />
            <TextInput
              placeholder="Nº Chip"
              style={styles.input}
              placeholderTextColor="#A9A9A9"
              textAlign="left"
            />
            <TextInput
              placeholder="Especie (e.g., perro, gato)"
              style={styles.input}
              placeholderTextColor="#A9A9A9"
              textAlign="left"
              onChangeText={(text) => handleSpeciesChange(index, text)}
            />
            <TextInput
              placeholder="Raza"
              style={styles.input}
              placeholderTextColor="#A9A9A9"
              textAlign="left"
            />
            <TextInput
              placeholder="Sexo"
              style={styles.input}
              placeholderTextColor="#A9A9A9"
              textAlign="left"
            />
            <TouchableOpacity
              onPress={() => setShow(true)}
              style={styles.input}
            >
              <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
                maximumDate={new Date()}
              />
            )}
            <TextInput
              placeholder="Peso (kg)"
              style={styles.input}
              placeholderTextColor="#A9A9A9"
              keyboardType="numeric"
              textAlign="left"
            />
            <TextInput
              placeholder="Observaciones (e.g., alergias, tratamientos)"
              style={[styles.input, styles.textArea]}
              placeholderTextColor="#A9A9A9"
              multiline
              numberOfLines={4}
              textAlign="left"
            />
            {additionalFieldEnabled[index] && (
              <>
                <Text style={styles.subtitle}>Vacunas Obligatorias</Text>
                <TouchableOpacity
                  onPress={() => setShowVaccineDate(true)}
                  style={styles.input}
                >
                  <Text style={styles.dateText}>
                    Última vacuna antirrábica: {lastVaccineDate.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
                {showVaccineDate && (
                  <DateTimePicker
                    value={lastVaccineDate}
                    mode="date"
                    display="default"
                    onChange={onChangeVaccineDate}
                    maximumDate={new Date()}
                  />
                )}
              </>
            )}
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.addButton} onPress={addPetFields}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
          <Pressable style={styles.removeButton} onPress={removePetFields}>
            <Text style={styles.removeButtonText}>-</Text>
          </Pressable>
        </View>
        <Link asChild href={"/home"}>
          <Pressable style={styles.button}>
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
    backgroundColor: '#B7E3DD',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
    backgroundColor: '#006368',
    paddingHorizontal: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  scrollContainer: {
    padding: 20,
  },
  petContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderColor: '#006368',
    borderWidth: 1,
    textAlign: 'left',
  },
  dateText: {
    color: '#A9A9A9',
    textAlign: 'left',
    lineHeight: 50,
  },
  textArea: {
    height: 100,
    paddingVertical: 10,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#009688',
    borderRadius: 50,
    width: 50, 
    height: 50, 
    alignItems: 'center', 
    justifyContent: 'center',
  }, 
  removeButton: { 
    backgroundColor: '#F44336', 
    borderRadius: 50, 
    width: 50, 
    height: 50, 
    alignItems: 'center', 
    justifyContent: 'center', 
  }, 
  addButtonText: { 
    color: '#fff', 
    fontSize: 30, 
    fontWeight: 'bold',
  }, 
  removeButtonText: { 
    color: '#fff', 
    fontSize: 30, 
    fontWeight: 'bold', 
  }, 
  button: { 
    backgroundColor: '#009688', 
    borderRadius: 5, 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    marginTop: 20, 
    alignSelf: 'center',
  }, 
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
  },
});

export default AddPetMobile;