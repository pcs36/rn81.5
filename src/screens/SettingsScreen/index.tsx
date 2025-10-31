import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';

import { removeToken } from '../../store/slice/user.slice';
import { useAppDispatch } from '../../store/thunks/hooks';

import { clearLocalStorage } from '../../store/services/localStorage.service';
import { LS_KEY_AUTH_TOKEN } from '../../constants/storageKeys.const';
import store from '../../store/store';
import { resetUserSlice } from '../../store/slice/user.slice';

import eventBus from '../../utils/eventBus';


const SettingsScreen = ({ navigation }: any) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    console.log("@1")
    clearLocalStorage(LS_KEY_AUTH_TOKEN);
    dispatch(removeToken());
    store.dispatch(resetUserSlice());
    console.log("@4")
    // 🔔 Notify App.tsx
    eventBus.emit('userLogout');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Settings ⚙️</Text>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.itemText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <Text style={styles.itemText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.itemRow}>
          <Text style={styles.itemText}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            thumbColor={notificationsEnabled ? '#2563EB' : '#9CA3AF'}
          />
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.itemText}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            thumbColor={darkModeEnabled ? '#2563EB' : '#9CA3AF'}
          />
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('About')}
        >
          <Text style={styles.itemText}>About This App</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      {/* <TouchableOpacity style={styles.logoutButton} onPress={() => Alert.alert('Logged out', 'You have been successfully logged out.')}> */}
      <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;

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
    color: '#111827',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  item: {
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },
  itemText: {
    fontSize: 16,
    color: '#111827',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
