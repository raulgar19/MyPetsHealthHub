import React, { useState } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddMoney = () => {

  const handleAddMoney = () => {
    Alert.alert("Éxito", "Se han añadido los fondos correctamente a la cuenta.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.navbar}>
          <Link asChild href={"/home"}>
            <Pressable style= {styles.button}>
                <Image
                  source={require('../../assets/icons/logo-mobile.png')}
                  style={styles.logo}
                />
              </Pressable>
          </Link>
        <Text style={styles.navTitle}>Añadir Fondos</Text>
        <Link asChild href= {"/profile"}>
          <Pressable style={styles.button}>
            <Image
              source={require('../../assets/icons/profile-icon.png')}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>
        <View style= {styles.container}>
            <Text style={styles.title}>Cantidad a añadir</Text>
            <TextInput
                style={styles.input}
                placeholder="Escribe la cantidad"
                keyboardType="numeric"
            />
            <Pressable style={styles.addButton} onPress={handleAddMoney}>
                <Text style={styles.buttonText}>Añadir Fondos</Text>
            </Pressable>
        </View>
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
    button: {
        padding: 5,
    },
    profileIcon: {
        width: 40,
        height: 40,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333',
        textAlign: 'center',
    },
    input: {
        height: 50,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#009688',
        borderRadius: 8,
        marginHorizontal: 100,
        marginVertical: 20,
        paddingVertical: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddMoney;