import React from 'react';
import { Link } from 'expo-router';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScheduledQueriesScreen = () => {
  const queries = [
    { id: '1', petName: 'Luna', date: '2024-11-20', time: '10:30 AM', vet: 'Dr. Smith' },
    { id: '2', petName: 'Max', date: '2024-11-22', time: '02:00 PM', vet: 'Dr. Johnson' },
    { id: '3', petName: 'Bella', date: '2024-11-25', time: '09:00 AM', vet: 'Dr. Taylor' },
  ];

  const renderQuery = ({ item }) => (
    <Link asChild href={"/queryDetails"}>
        <Pressable style={styles.queryContainer}>
        <Text style={styles.petName}>Mascota: {item.petName}</Text>
        <Text style={styles.details}>Fecha: {item.date}</Text>
        <Text style={styles.details}>Hora: {item.time}</Text>
        <Text style={styles.details}>Veterinario: {item.vet}</Text>
        </Pressable>
    </Link>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
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
        <FlatList
          data={queries}
          renderItem={renderQuery}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#B7E3DD',
  },
  container: {
    flex: 1,
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
  listContainer: {
    paddingBottom: 16,
    marginHorizontal: 20,
  },
  queryContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
});

export default ScheduledQueriesScreen;