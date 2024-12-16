import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

const Report = () => {
    return (
        <SafeAreaView style={{ backgroundColor: '#FFF9FA', minHeight: '99%', maxHeight: '100%', padding: 20, marginBottom: 20 }}>
            <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold', padding: 10, marginTop: 30 }}>Report on Government sector  </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ color: "#7C82A1", fontSize: 16, textAlign: "justify", marginTop: 20 }}>You need to report your GBV case on the following sector to help you</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 40 }}>
                    <Image source={require('@/assets/images/gbvReport/RIB.jpeg')} style={styles.imgs} />
                    <Image source={require('@/assets/images/gbvReport/RNP.png')} style={styles.imgs} />
                    <Image source={require('@/assets/images/gbvReport/isange.png')} style={styles.imgs} />
                </View>
                <Text style={{ marginTop: 60, textAlign: 'center', fontSize: 24 }}> Hot lines </Text>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL("tel:3512")} ><Text>RIB</Text><Text>3512</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL("tel:112")} ><Text>RNP</Text><Text>112</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL("tel:9059")} ><Text>MIGEPROF</Text><Text>9059</Text></TouchableOpacity>
                </View>

                <Text style={{ marginTop: 60, textAlign: 'center', fontSize: 24 }}> Mails </Text>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL("mailto:complaint@rib.gov.rw")} ><Text>RIB</Text><Text>complaint@rib.gov.rw</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL("mailto:info@police.gov.rw")} ><Text>RNP</Text><Text>info@police.gov.rw</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL("mailto:info.migeprof@org.rw")} ><Text>MIGEPROF</Text><Text>info.migeprof@org.rw</Text></TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Report

const styles = StyleSheet.create({
    imgs: {
        height: 60,
        maxWidth: 60
    },
    btn: {
        flexDirection: "row",
        width: '80%',
        justifyContent: 'space-between',
        padding: 8,
        marginVertical: 10,
        borderColor: '#00B98E80',
        borderWidth: 3,
        borderRadius: 10,
    }
})