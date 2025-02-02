import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, Pressable, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiService from '../../api';

const AllQueriesScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userID');
    if (!userId) {
      setError('Veterinario no encontrado');
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await apiService.getVetQueries(userId);
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las citas');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.appointment}>
      <Text style={styles.petName}>{item.pet.name}</Text>
      <Text style={styles.details}>
        Propietario: <Text style={styles.bold}>{item.pet.appUser.name + " " + item.pet.appUser.surnames}</Text>
      </Text>
      <Text style={styles.details}>
        Fecha: <Text style={styles.bold}>{item.date}</Text>
      </Text>
      <Text style={styles.details}>
        Hora: <Text style={styles.bold}>{item.hour}</Text>
      </Text>
      <Text style={styles.details}>Detalles: {item.purpose}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.loadingText}>Cargando citas...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.navTitle}>Citas Pendientes</Text>
        </View>
      </View>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        ListEmptyComponent={<Text style={styles.noAppointments}>No hay citas disponibles</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#B7E3DD',
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
    padding: 16,
  },
  appointment: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#009688',
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#006368',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  noAppointments: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#D9534F',
  },
});

export default AllQueriesScreen;