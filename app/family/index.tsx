import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import users from '@/services/users'
import family from '@/services/family'
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const MyFamily = () => {
    const router = useRouter();

    const [familyName, setFamilyName] = useState<string | null>(null);
    const [familyMembers, setFamilyMembers] = useState<any[]>([]);
    const [familyScore, setFamilyScore] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchFamilyData = async () => {
            try {
                const data = await users.getData();
                
                if (!data.family) {
                    if (data.invite.name !== 0) {
                        router.replace('/family/join');
                        return;
                    }
                    setLoading(true);
                    return;
                }
                setFamilyName(data.family.name);
                setFamilyMembers(data.family.members || []);
                setFamilyScore(data.family.score.toFixed(2) || 0);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching family data:', error);
                setLoading(true);
            }
        };

        fetchFamilyData();
    }, []);

    const handleCreateFamily = async () => {
        if (!name.trim()) return;

        try {
            const resp = await family.create(name);
            if (resp.status === 201) {
                router.navigate('/(tabs)/profile');
            } else {
                console.log("Creation failed");
                setName("");
            }
        } catch (error) {
            console.error('Family creation error:', error);
        }
    };

    // Render family creation screen
    if (loading) {
        return (
            <LinearGradient 
                colors={['#F7F9FC', '#E6F0FF']} 
                style={styles.gradientContainer}
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.createFamilyContainer}>
                        <Text style={styles.mainTitle}>Create Your Family Profile</Text>
                        <Text style={styles.subtitle}>Start your family's digital journey together</Text>
                        
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Family Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your family name"
                                placeholderTextColor="#A0A0A0"
                                autoCapitalize='words'
                                returnKeyType='send'
                                value={name}
                                onChangeText={setName}
                            />
                            <TouchableOpacity 
                                style={[
                                    styles.button, 
                                    !name.trim() && styles.buttonDisabled
                                ]} 
                                onPress={handleCreateFamily}
                                disabled={!name.trim()}
                            >
                                <Text style={styles.buttonText}>Create Family</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }

    // Render family details screen
    return (
        <LinearGradient 
            colors={['#F7F9FC', '#E6F0FF']} 
            style={styles.gradientContainer}
        >
            <SafeAreaView style={styles.container}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={styles.headerContainer}>
                                <Text style={styles.familyTitle}>{familyName} Family</Text>
                                <View style={styles.scoreContainer}>
                                    <Ionicons name="trophy-outline" size={24} color="#00B98E" />
                                    <Text style={styles.scoreText}>Family Score: {familyScore}</Text>
                                </View>
                            </View>
                            <View style={styles.membersHeader}>
                                <Text style={styles.membersTitle}>Family Members</Text>
                                <TouchableOpacity 
                                    style={styles.addMemberButton}
                                    onPress={() => router.navigate('/family/invite')}
                                >
                                    <Ionicons name='add-circle-outline' size={32} color={"#00B98E"} />
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                    data={familyMembers}
                    keyExtractor={(member) => member._id}
                    renderItem={({ item, index }) => (
                        <View style={styles.memberItemContainer}>
                            <View style={[
                                styles.memberBadge, 
                                { backgroundColor: index % 2 === 0 ? '#E6F0FF' : '#F0F6FF' }
                            ]}>
                                <Ionicons name='person-outline' size={20} color="#00B98E" />
                                <Text style={styles.memberName}>
                                    {item.firstName} {item.lastName}
                                </Text>
                            </View>
                        </View>
                    )}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="people-outline" size={64} color="#A0A0A0" />
                            <Text style={styles.emptyText}>No family members yet</Text>
                            <Text style={styles.emptySubtext}>Invite your family to join</Text>
                        </View>
                    }
                />
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    createFamilyContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    inputLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#F9F9F9',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#00B98E',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#A0A0A0',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    familyTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    scoreText: {
        fontSize: 16,
        color: '#00B98E',
        marginLeft: 10,
    },
    membersHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    membersTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    addMemberButton: {
        padding: 5,
    },
    memberItemContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    memberBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F6FF',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    memberName: {
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
    },
    listContent: {
        paddingBottom: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.15,
    },
    emptyText: {
        fontSize: 20,
        color: '#666',
        marginTop: 20,
        fontWeight: '600',
    },
    emptySubtext: {
        fontSize: 16,
        color: '#A0A0A0',
        marginTop: 10,
    },
});

export default MyFamily