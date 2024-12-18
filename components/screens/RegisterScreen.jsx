import React, { useState } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';

const RegisterScreen = () => {
  const [petFields, setPetFields] = useState([1]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [lastVaccineDate, setLastVaccineDate] = useState(new Date());
  const [showVaccineDate, setShowVaccineDate] = useState(false);
  const [petSpecies, setPetSpecies] = useState({});
  const [additionalFieldEnabled, setAdditionalFieldEnabled] = useState({});
  const [isChecked, setIsChecked] = useState(false);

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

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Image
          source={require('../../assets/icons/logo-mobile.png')}
          style={styles.navLogo}
        />
        <Text style={styles.navTitle}>My Pet's Health Hub</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Datos del usuario</Text>

          <TextInput
            placeholder="Nombre"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
          />
          <TextInput
            placeholder="Apellidos"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
          />
          <TextInput
            placeholder="DNI"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
          />
          <TextInput
            placeholder="Correo Electrónico"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
          />
          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            textAlign="left"
          />
          <Text style={styles.subtitle}>Datos de la cuenta</Text>
          <TextInput
            placeholder="Número de cuenta"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
          />
          <TextInput
            placeholder="Saldo"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
          />
          <Text style={styles.subtitle}>Información de las Mascotas</Text>
          {petFields.map((field, index) => (
            <View key={index} style={styles.petContainer}>
              <Text style={styles.subtitle}>Mascota {index + 1}</Text>
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
          <View style={styles.termsCheck}>
            <Checkbox
              value={isChecked}
              onValueChange={handleCheckboxToggle}
            />
            <Link asChild href={"/terms"}>
              <TouchableOpacity>
                <Text style={ styles.termsLink }>
                  Acepto los Términos y Condiciones de Uso
                </Text>
              </TouchableOpacity>
              </Link>
          </View>
          <Link asChild href= {"/"}>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Crear cuenta</Text>
            </Pressable>
            </Link>
        </View>
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
    justifyContent: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#006368',
    paddingHorizontal: 20,
  },
  navLogo: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 20,
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  innerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  petContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
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
  }, 
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
  }, 
  termsCheck: {
    marginTop: 20,
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 20,
  },
  termsLink: {
    color: '#006368',
    textDecorationLine: 'underline',
  },
  });

    export default RegisterScreen;