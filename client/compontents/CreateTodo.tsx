import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";
import {Feather} from "@expo/vector-icons";
import {useMutation} from "@apollo/client";
import {CREATE_TODO} from "../graphql";
import {useState} from "react";

export const CreateTodo = ({ onCreateTodo } : { onCreateTodo: () => void }) => {
    const [todoText, setTodoText] = useState('');

    const [createTodoMutation] = useMutation(CREATE_TODO);

    const handleAddTodoClient = async () => {
        if (!todoText) return;

        await createTodoMutation({
            variables: {
                title: todoText,
            }
        })

        Keyboard.dismiss();
        onCreateTodo();
        setTodoText("");
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                value={todoText}
                onChangeText={setTodoText}
                placeholder={'Write your note here...'}
            />

            <Pressable onPress={handleAddTodoClient}>
                <Feather name={'plus'} color={'#333333'} size={18} style={styles.addIcon} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 16,
        marginBottom: 16,
        backgroundColor: '#475569',
        borderLeftWidth: 3,
        borderColor: '#94a3b8',
        elevation: 1,
        gap: 16,
    },
    textInput: {
        backgroundColor: '#94a3b8',
        borderRadius: 4,
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    addIcon: {
        backgroundColor: '#598EF3',
        color: '#fff',
        borderRadius: 100,
        padding: 4,
    }
})
