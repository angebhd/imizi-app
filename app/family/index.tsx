import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';

import users from '@/services/users'
import family from '@/services/family'
import { Ionicons } from '@expo/vector-icons';

const MyFamily = () => {
    const router = useRouter();

    const [familyName, setFamilyName] = useState(null);
    const [familyMembers, setFamilyMembers] = useState(null);
    const [familyScore, setFamilyScore] = useState(0);
    const [loading, setLoading] = useState<boolean>(true); // To track loading state
    // for family creation
    const [name, setName] = useState("");
    // router.navigate('/family/join');

    // useEffect(() => {
        const redirections = async()=>{
            const data = await users.getData();
            if(!data.family){
                if (data.invite.name != 0) { router.replace('/family/join'); }
            }

        }
        const getFamilyData = async () => {
            const data = await users.getData();
            setFamilyName(data.family.name);
            setFamilyMembers(data.family.members);
            if (data.family.score !== undefined) { setFamilyScore(data.family.score); }
            if (data.family.name != 0) setLoading(false);

        }
        redirections()
        getFamilyData()

    // }, []);

    if (loading) {
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

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', minHeight: '100%', padding: 20 }}>
            <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold', marginTop: 50 }}>{familyName} Family</Text>
            <Text style={{ fontStyle: 'italic', fontSize: 16, color: '#00B98E', textAlign: 'right' }}>Overall Score: {familyScore}</Text>
            <View style={{ flexDirection: 'row', padding: 10, paddingTop: 50, justifyContent: 'space-between', borderTopWidth: 2 }}>
                <Text style={{ fontStyle: 'italic', fontSize: 24, }}>Members</Text>
                <TouchableOpacity onPress={() => router.navigate('/family/invite')}>
                    <Ionicons name='add-circle-outline' size={32} color={"#00B98E"} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={familyMembers}
                keyExtractor={(member) => member._id}  // Extract unique key for each item
                renderItem={({ item }) => (
                    <Text style={{ marginLeft: 30, textAlignVertical: 'center', fontSize: 24 }}> <Ionicons name='person-outline' size={14} /> {item.firstName} {item.lastName}</Text>
                )}
            />

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

export default MyFamily
