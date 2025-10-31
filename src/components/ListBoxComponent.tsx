import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Define the user interface
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email_id: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

// Props interface
interface UserListProps {
  data: User[]; // 👈 dynamic user data passed as props
}

const ListBoxComponent: React.FC<UserListProps> = ({ data }) => {
  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.card}>
      <Text style={styles.name}>
        {item.first_name} {item.last_name}
      </Text>
      <Text style={styles.email}>{item.email_id}</Text>
      <Text style={styles.date}>
        Created: {new Date(item.created_at).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No users found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    color: '#555',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  separator: {
    height: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default ListBoxComponent;
