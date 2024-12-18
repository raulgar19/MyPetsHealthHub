import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SocialNetworkMobile = () => {
  const posts = [
    {
      id: '1',
      user: 'Ana',
      content: '¡Mi perro está disfrutando del parque!',
      image: require('../../assets/icons/logo-mobile.png'),
    },
    {
      id: '2',
      user: 'Carlos',
      content: 'Adopté un gato y es adorable.',
      image: require('../../assets/icons/logo-mobile.png'),
    },
    {
      id: '3',
      user: 'María',
      content: '¡Mi loro habla y es muy divertido!',
      image: require('../../assets/icons/logo-mobile.png'),
    },
  ];

  const renderPostItem = ({ item }) => (
    <View style={styles.postItem}>
      <Text style={styles.userName}>{item.user}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <Image source={item.image} style={styles.postImage} />
    </View>
  );

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
        <Text style={styles.navTitle}>Comunidad</Text>
        <Link asChild href= {"/profile"}>
          <Pressable style={styles.profileButton}>
            <Image
              source={require('../../assets/icons/profile-icon.png')}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    padding: 20,
  },
  postItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004D40',
  },
  postContent: {
    fontSize: 15,
    marginVertical: 5,
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
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

export default SocialNetworkMobile;