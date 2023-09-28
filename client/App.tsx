import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { TodosList} from "./compontents/TodosList";

export default function App() {
  const client = new ApolloClient({
    uri: 'API_LINK',
    cache: new InMemoryCache(),
    credentials: 'same-origin',
  });

  return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Text style={styles.title}>TODOS</Text>

          <TodosList />

          <StatusBar style={"light"} />
        </View>
      </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: '#1e293b'
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 32,
    fontWeight: 'bold',
    color: "#cbd5e1"
  }
});
