import React from 'react';
import { Link } from 'expo-router';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddQueryScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href="/vetHome" style={styles.link}>
          <Pressable>
            <Image
              source={require('../../assets/icons/logo-mobile.png')}
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
        <View style={styles.petInfo}>
          <Text style={styles.label}>Nombre: <Text style={styles.value}>Firulais</Text></Text>
          <Text style={styles.label}>Raza: <Text style={styles.value}>Golden Retriever</Text></Text>
          <Text style={styles.label}>Edad: <Text style={styles.value}>3 años</Text></Text>
        </View>

        <Text style={styles.header}>Datos de la cita</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Fecha:</Text>
          <TextInput style={styles.input} placeholder="dd/mm/yyyy" />

          <Text style={styles.label}>Hora:</Text>
          <TextInput style={styles.input} placeholder="hh:mm" />

          <Text style={styles.label}>Objetivo:</Text>
          <TextInput style={styles.input} placeholder="Ej. Revisión médica" />

          <Text style={styles.label}>Acciones Requeridas:</Text>
          <TextInput style={styles.input} placeholder="Describe las acciones" />

          <Text style={styles.label}>Instrucciones Previas:</Text>
          <TextInput style={styles.input} placeholder="Ej. Ayuno de 8 horas" />

          <Text style={styles.label}>Acciones Posteriores:</Text>
          <TextInput style={styles.input} placeholder="Ej. Medicación a administrar" />
        </View>

        <Button title="Guardar Consulta" onPress={() => {}} color="#006368" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#B7E3DD'
  },
  navbar: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#006368',
    paddingHorizontal: 20,
  },
  link: {
    position: 'absolute',
    left: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  navTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006368',
    marginBottom: 15,
    textAlign: 'left',
  },
  petInfo: {
    backgroundColor: '#eaf8f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontWeight: 'normal',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default AddQueryScreen;