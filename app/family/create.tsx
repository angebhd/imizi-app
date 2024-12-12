import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import family from '@/services/family'
import { useRouter } from 'expo-router'

const CreateFamily = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const add = async () => {
        const resp = await family.create(name);
        if (resp.status === 201) {
            router.navigate('/(tabs)/profile');
        } else {
            console.log("Creation failed");
            setName("");
        }

    }
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', minHeight: '100%', padding: 20 }}>
            <ScrollView style={{ padding: 20, paddingTop: 60 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Create your family profile </Text>
                <Text> You're not yet member of a family nor received in invitation</Text>
                <View style={{ marginTop: 80 }}>
                    <Text> Enter your family name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Family Name"
                        autoCapitalize='words'
                        returnKeyType='send'
                        value={name}
                        onChangeText={setName}
                    />
                    <TouchableOpacity style={styles.button} onPress={add}><Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Create</Text></TouchableOpacity>
                </View>

            </ScrollView>

        </SafeAreaView>

    )
}

export default CreateFamily

const styles = StyleSheet.create({})