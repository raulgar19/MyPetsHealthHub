import React, { useState } from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, Pressable, Image, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RemoveQueryScreen = () => {
  const [queries, setQueries] = useState([
    { id: 1, date: '12/12/2023', time: '14:00', objective: 'Revisión médica' },
    { id: 2, date: '15/12/2023', time: '09:00', objective: 'Vacunación' },
  ]);

  const handleDelete = (id) => {
    Alert.alert(
      "Eliminar Consulta",
      "¿Estás seguro de que deseas eliminar esta consulta?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => {
          setQueries((prevQueries) => prevQueries.filter((query) => query.id !== id));
        }},
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.queryItem}>
      <View style={styles.queryTextContainer}>
        <Text style={styles.queryText}>
          <Text style={styles.bold}>Fecha:</Text> {item.date}
        </Text>
        <Text style={styles.queryText}>
          <Text style={styles.bold}>Hora:</Text> {item.time}
        </Text>
        <Text style={styles.queryText}>
          <Text style={styles.bold}>Objetivo:</Text> {item.objective}
        </Text>
      </View>
      <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </Pressable>
    </View>
  );

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
          <Text style={styles.navTitle}>Eliminar Consulta</Text>
        </View>
      </View>

      <Text style={styles.header}>Información de la mascota</Text>
      <View style={styles.petInfo}>
        <Text style={styles.label}>Nombre: <Text style={styles.value}>Firulais</Text></Text>
        <Text style={styles.label}>Raza: <Text style={styles.value}>Golden Retriever</Text></Text>
        <Text style={styles.label}>Edad: <Text style={styles.value}>3 años</Text></Text>
      </View>

      <FlatList
        data={queries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
        ListHeaderComponent={
          <Text style={styles.header}>Lista de Consultas</Text>
        }
        contentContainerStyle={styles.listContent}
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006368',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  petInfo: {
    backgroundColor: '#eaf8f6',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontWeight: 'normal',
  },
  queryItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  queryTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  queryText: {
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RemoveQueryScreen;