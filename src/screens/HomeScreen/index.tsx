import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { userAllDetailsThunk } from '../../store/thunks/user.thunk';
import { useAppDispatch, useAppSelector } from '../../store/thunks/hooks';

import ListBoxComponent from '../../components/ListBoxComponent';

import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }: any) => {

  const dispatch = useDispatch<AppDispatch>();

  const {
    userDetailsLoader = false,
    userAllDetails = []
  } = useAppSelector(state => state.userReducer);

  /* useEffect(() => {
    // Perform any setup or data fetching here
    dispatch(userAllDetailsThunk());
  }, []);
 */

  useFocusEffect(
    React.useCallback(() => {
      // 👇 This runs every time the screen is focused
      console.log('Screen is focused!');
       dispatch(userAllDetailsThunk());

      // Optional cleanup when screen is unfocused
      return () => {
        console.log('Screen is unfocused');
      };
    }, [])
  );




  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.header}>Welcome 👋</Text>
        <Text style={styles.subHeader}>Choose an option to get started</Text>

        <View style={styles.cardContainer}>
          {/* {console.log('HomeScreen - userAllDetails ----------------', userAllDetails)} */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.cardTitle}>Profile</Text>
            <Text style={styles.cardText}>View and edit your profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SettingsTab')}
          >
            <Text style={styles.cardTitle}>Settings11</Text>
            <Text style={styles.cardText}>Manage your preferences</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('About')}
          >
            <Text style={styles.cardTitle}>About</Text>
            <Text style={styles.cardText}>Learn more about this app</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1 }}>
        <ListBoxComponent
          data={userAllDetails}
        />
      </View>

    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
  },
  subHeader: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  cardContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  cardText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});
