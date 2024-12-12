import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import family from '@/services/family';

const FamilyInvite = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    //invite logic
    const invite = async () => {
        const resp = await family.invite(email);
        if (resp.status === 201){ 
            router.back()
        }else{
            console.log("Invite failed");
            setEmail("")
            
        }

    }
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', minHeight: '100%', padding: 20 }}>
            <ScrollView style={{ padding: 20, paddingTop: 60 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Invite your family members to join you </Text>
                <View style={{ marginTop: 40 }}>
                    <Text> Enter his/her mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        inputMode='email'
                        autoCapitalize='none'
                        returnKeyType='send'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TouchableOpacity style={styles.button} onPress={invite}><Text style={{ textAlign: 'center' }}>Invite</Text></TouchableOpacity>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#79C3C52B'
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#00B98E',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
})

export default FamilyInvite
