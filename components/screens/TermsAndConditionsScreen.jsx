import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TermsAndConditionsMobile = () => {
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
        <Text style={styles.header}>Términos y Condiciones</Text>
        <Text style={styles.content}>
          {`Por favor, lee estos términos y condiciones de uso cuidadosamente antes de utilizar nuestra aplicación. Al utilizar nuestra aplicación, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con estos términos, no debes usar nuestra aplicación.
          
1. **Uso de la Aplicación**: Solo puedes utilizar nuestra aplicación para fines legales y de acuerdo con estas condiciones. No debes usar la aplicación de ninguna manera que cause daño a la aplicación o a la disponibilidad de la misma.

2. **Responsabilidad**: No nos hacemos responsables de ningún daño que pueda surgir del uso o la imposibilidad de uso de nuestra aplicación.

3. **Modificaciones**: Nos reservamos el derecho a modificar estos términos en cualquier momento. Te recomendamos que revises estos términos periódicamente para estar informado sobre las actualizaciones.

4. **Ley Aplicable**: Estos términos se regirán e interpretarán de acuerdo con las leyes del país en el que operamos.

5. **Contacta con Nosotros**: Si tienes alguna pregunta sobre estos términos, no dudes en contactarnos.`}
        </Text>
        <Link asChild href={"/register"}>
          <Pressable style={styles.returnButton}>
            <Text style={styles.buttonText}>Volver</Text>
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
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'justify',
  },
  returnButton: {
    marginTop: 30,
    marginHorizontal: 100,
    backgroundColor: '#009688',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TermsAndConditionsMobile;