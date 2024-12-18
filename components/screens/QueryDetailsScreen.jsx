import React from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QueryDetailsScreen = () => {
  const query = {
    petName: 'Luna',
    date: '2024-12-15',
    time: '09:00 AM',
    vet: 'Dr. Smith',
    vetAddress: 'Calle Veterinaria, 10, Madrid',
    purpose: 'Vacunación de refuerzo y chequeo general',
    requiredActions: 'Asegúrese de que Luna esté al día con sus vacunas antes de la cita.',
    preVisitInstructions: 'No darle de comer 8 horas antes de la consulta.',
    followUpActions: 'Programar otra cita de control después de la vacunación.',
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
        <View style={styles.navbar}>
        <Link asChild href={"/home"}>
            <Pressable>
                <Image
                  source={require('../../assets/icons/logo-mobile.png')}
                  style={styles.logo}
                />
              </Pressable>
        </Link>
          <Text style={styles.navTitle}>Consultas programadas</Text>
          <Link asChild href={"/profile"}>
            <Pressable>
              <Image
                source={require('../../assets/icons/profile-icon.png')}
                style={styles.profileIcon}
              />
            </Pressable>
          </Link>
        </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Consulta de {query.petName}</Text>
          <Text style={styles.info}>Fecha: {query.date}</Text>
          <Text style={styles.info}>Hora: {query.time}</Text>
          <Text style={styles.info}>Veterinario: {query.vet}</Text>
          <Text style={styles.info}>Dirección: {query.vetAddress}</Text>

          <Text style={styles.subtitle}>Propósito de la Consulta:</Text>
          <Text style={styles.info}>{query.purpose}</Text>

          <Text style={styles.subtitle}>Acciones Requeridas:</Text>
          <Text style={styles.info}>{query.requiredActions}</Text>

          <Text style={styles.subtitle}>Instrucciones Previas a la Visita:</Text>
          <Text style={styles.info}>{query.preVisitInstructions}</Text>

          <Text style={styles.subtitle}>Próximas Acciones:</Text>
          <Text style={styles.info}>{query.followUpActions}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#B7E3DD',
  },
  container: {
    alignItems: "center",
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
    backgroundColor: '#006368',
    paddingHorizontal: 20,
    marginBottom: 20,
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
  detailsContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  info: {
    fontSize: 18,
    marginBottom: 12,
    color: '#555',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#000',
  },
});

export default QueryDetailsScreen;