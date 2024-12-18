import React, { useState } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, TextInput, Pressable, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const AddPostMobile = () => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Cambiado por un array explícito
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handlePost = () => {
    if (content && selectedImage) {
      console.log('Post creado:', { content, image: selectedImage });
      setContent('');
      setSelectedImage(null);
      alert('¡Publicación creada con éxito!');
    } else {
      alert('Por favor, ingrese contenido y seleccione una imagen.');
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
        <Text style={styles.navTitle}>Crear nueva publicación</Text>
        <Link asChild href={"/profile"}>
          <Pressable style={styles.profileButton}>
            <Image
              source={require('../../assets/icons/profile-icon.png')}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Escribe aquí el contenido de tu publicación..."
          value={content}
          onChangeText={setContent}
          multiline
        />
        <TouchableOpacity style={styles.imagePicker} onPress={handleChooseImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : (
            <Text style={styles.imagePickerText}>Subir Imagen</Text>
          )}
        </TouchableOpacity>
        <Pressable style={styles.postButton} onPress={handlePost}>
          <Text style={styles.buttonText}>Publicar</Text>
        </Pressable>
      </View>
      <View style={styles.iconContainer}>
        <Link asChild href={"/social"}>
          <Pressable>
            <Image source={require('../../assets/icons/start-icon.png')} style={styles.iconImage} />
          </Pressable>
        </Link>
        <Link asChild href={"/addPost"}>
          <Pressable>
            <Image source={require('../../assets/icons/add-post-icon.png')} style={styles.iconImage} />
          </Pressable>
        </Link>
        <Link asChild href={"/myPosts"}>
          <Pressable>
            <Image source={require('../../assets/icons/look-posts-icon.png')} style={styles.iconImage} />
          </Pressable>
        </Link>
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
  profileButton: {
    padding: 5,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  imagePicker: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  imagePickerText: {
    color: '#666',
    fontSize: 16,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  postButton: {
    backgroundColor: '#009688',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 100,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#006368',
    elevation: 5,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
});

export default AddPostMobile;