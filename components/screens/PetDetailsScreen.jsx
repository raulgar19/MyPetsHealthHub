import React from 'react';
import { Link } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PetDetailsScreen = () => {
  const pet = {
    name: 'Bobby',
    breed: 'Labrador',
    age: 5,
    weight: 25,
    image: require('../../assets/icons/logo-mobile.png'),
    observations: 'Le encanta jugar con la pelota.',
    vaccines: 'Rabia, Parvovirus',
    lastVisit: '2023-08-15',
    specialConditions: 'Ninguna',
    chip: '1234567890',
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
        <View style={styles.petDetailsContainer}>
          <Image source={pet.image} style={styles.petImage} />
          <Text style={styles.petName}>{pet.name}</Text>
          <Text style={styles.petBreed}>Raza: {pet.breed}</Text>
          <Text style={styles.petAge}>Edad: {pet.age} años</Text>
          <Text style={styles.petWeight}>Peso: {pet.weight} kg</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Identificación</Text>
            <Text style={styles.sectionContent}>Chip: {pet.chip || 'No disponible'}</Text>
            
            <View style={styles.petCardContainer}>
                <Text style={styles.sectionContent}>PetCard: </Text>
                <Link asChild href={"/petCard"}>
                  <Pressable style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>Ver</Text>
                  </Pressable>
                </Link>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Historial Médico</Text>
            <Text style={styles.sectionContent}>Vacunas: {pet.vaccines || 'No disponible'}</Text>
            <Text style={styles.sectionContent}>Última consulta: {pet.lastVisit || 'No disponible'}</Text>
            <Text style={styles.sectionContent}>Condiciones especiales: {pet.specialConditions || 'No tiene'}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Observaciones</Text>
            <Text style={styles.sectionContent}>{pet.observations}</Text>
          </View>

          <Pressable title="Editar Datos" />
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
  scrollContainer: {
    paddingBottom: 20,
  },
  petDetailsContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  petName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  petBreed: {
    fontSize: 18,
    color: '#009688',
    marginBottom: 5,
  },
  petAge: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  petWeight: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006368',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#333',
  },
  petCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  viewButton: {
    backgroundColor: '#006368',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginLeft: 10,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PetDetailsScreen;