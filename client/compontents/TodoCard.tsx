import {FlatList, Pressable, StyleSheet, Text, Touchable, View} from "react-native";
import {Todo} from "../utils/types";
import {Feather, MaterialIcons} from "@expo/vector-icons";
import {useMutation} from "@apollo/client";
import {DELETE_TODO, UPDATE_TODO} from "../graphql";

export const TodoCard = ( todo: Todo & { updateTodosList: () => void } ) => {
    const { id, completed, title, updateTodosList } = todo;

    const [deleteTodoMutation] = useMutation(DELETE_TODO);
    const [updateTodoMutation] = useMutation(UPDATE_TODO);

    const handleDeleteClick = async () => {
        await deleteTodoMutation({
            variables: {
                id,
            }
        })

        updateTodosList();
    };

    const handleToggleCompleted = async () => {
        await updateTodoMutation({
            variables: {
                id,
                completed: !completed,
            }
        })

        updateTodosList();
    }

    return (
        <View style={[styles.container, completed && { opacity: 0.6 }]}>
            <Text
                style={[styles.title, completed && { textDecorationLine: "line-through" }]}
            >
                {title}
            </Text>

            <View style={styles.actionsContainer}>
                <Pressable onPress={handleDeleteClick}>
                    <Feather name={'trash'} size={18} style={styles.deleteIcon} />
                </Pressable>

                <Pressable onPress={handleToggleCompleted}>
                    {completed ?
                        <MaterialIcons name={'radio-button-checked'} size={24} color={'#cbd5e1'} /> :
                        <MaterialIcons name={'radio-button-unchecked'} size={24} color={'#cbd5e1'} />}
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 16,
        marginBottom: 8,
        backgroundColor: '#475569',
        borderLeftWidth: 3,
        borderColor: '#94a3b8',
        elevation: 1,
    },
    title: {
        color: '#cbd5e1',
        flex: 1,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    deleteIcon: {
        borderRadius: 100,
        padding: 4,
        color: "#94a3b8"
    }
})