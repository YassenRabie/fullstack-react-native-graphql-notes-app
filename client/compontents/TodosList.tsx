import {useQuery} from "@apollo/client";
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";
import {TodoCard} from "./TodoCard";
import {Todo} from "../utils/types";
import {CreateTodo} from "./CreateTodo";
import {TODOS_LIST} from "../graphql";

export const TodosList = () => {
  const { data, refetch, loading } = useQuery(TODOS_LIST)

    const todos: [Todo] = data?.todos || [];

    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <View style={styles.container}>
            <CreateTodo onCreateTodo={refetch} />

            <Text style={styles.todosNumber}>{todos.length}</Text>

            <FlatList
                style={{ flex: 1 }}
                data={todos}
                renderItem={({ item }) => <TodoCard {...item} updateTodosList={refetch} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
    },
    todosNumber: {
        color: '#cbd5e1',
        fontSize: 12,
        marginStart: 4,
        marginBottom: 4,
    }
})