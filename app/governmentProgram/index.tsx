import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking } from 'react-native';
const courses = [
    { id: '1', org: 'text', title: 'Minister urges cooperation to build GBV-free families', date: 'Wednesday, 27 November, 2024', img: "gp1.jpg" , link: "https://www.migeprof.gov.rw/news-detail/minister-urges-cooperation-to-build-gbv-free-families" },
    { id: '2', org: 'text', title: 'Minister Uwimana urges leaders to strengthen support for rural women', date: 'Tuesday, 22 October, 2024 ', img: "gp2.jpg", link: "https://www.migeprof.gov.rw/news-detail/minister-uwimana-urges-leaders-to-strengthen-support-for-rural-women" },
    { id: '3', org: 'text', title: 'MIGEPROF and Partners Strengthen Family Cohesion and Combat GBV in Eastern Province', date: ' Tuesday, 01 October, 2024 ', img: "gp3.jpg", link: "https://www.migeprof.gov.rw/news-detail/migeprof-and-partners-strengthen-family-cohesion-and-combat-gbv-in-eastern-province" },
    { id: '4', org: 'text', title: 'Strengthening Women\'s Roles for National Development: Highlights from the 23rd General Assembly of the National Women\'s Council', date: 'Tuesday, 01 October, 2024', img: "gp4.jpg", link: "https://www.migeprof.gov.rw/news-detail/strengthening-womens-roles-for-national-development-highlights-from-the-23rd-general-assembly-of-the-national-womens-council" },
    { id: '5', org: 'text', title: 'Minister Uwimana urges women leaders in local government to build safe and resilient families', date: 'Tuesday, 01 October, 2024', img: "gp5.png", link: "https://www.migeprof.gov.rw/news-detail/minister-uwimana-urges-women-leaders-in-local-government-to-build-safe-and-resilient-families" },

];

const CourseItem = ({ course }) => {

    return (
        <View style={styles.courseContainer}>

            <Text style={styles.title}>{course.title}</Text>
            <Text style={styles.content}>{course.content}</Text>
        </View>
    );
};

const GouvernmentProgram = () => {
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', minHeight: '100%' }}>
            <View style={{ padding: 20 }}>
                <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold', }}>Gouvernement Programs</Text>
                <Text style={{ color: "#7C82A1", fontSize: 16, textAlign: "justify", marginTop: 20 }}>You have a full access to different government programs to train and transform family ambassadors.</Text>
                <FlatList
                    data={courses}
                    renderItem={({ item }) => <CourseItem course={item} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    courseContainer: {
        padding: 5,
        marginVertical: 16,
        borderWidth: 1,
        borderColor: '#efefef',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        fontSize: 14,
        lineHeight: 20,
    },
});

export default GouvernmentProgram;
