import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';

import users from '@/services/users'
import family from '@/services/family'

const JoinFamily = () => {
    const router = useRouter();

    const [invitation, setInvitation] = useState(null);
    const [famName, setFamName] = useState("");
    

    const getFamilyData = async () => {
        const resp = await users.getData();
        if (resp){
            setInvitation(resp.invite)
            setFamName(resp.invite.name)
        } 
    }
    useEffect(() => { getFamilyData() }, []);

    const join = async () => {
        const resp = await family.join();
        if (resp === 200){ 
            router.navigate('/(tabs)/profile')
        }else{
            console.log("Invite failed");
            
        }

    }
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', minHeight: '100%', padding: 20 }}>
            <ScrollView style={{ padding: 20, paddingTop: 60 }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold' }}>You recived and invitation</Text>
                <View style={{ marginTop: 80 }}>
                    <Text style={{fontSize: 24}}>Click this button to join {famName} family</Text>
                    
                    <TouchableOpacity style={styles.button} onPress={join}><Text style={{ textAlign: 'center' }}>Join</Text></TouchableOpacity>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
   
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#00B98E',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginTop: 30
    },
})

export default JoinFamily
