import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const GBV = () => {
    return (
        <SafeAreaView style={{ backgroundColor: '#FFF9FA', maxHeight: '100%', padding: 20, marginBottom: 20 }}>
            <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold', padding: 10, marginTop: 30 }}>GBV Information ⛑️ </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ color: "#7C82A1", fontSize: 16, textAlign: "justify", marginTop: 20 }}>Gender-based violence (GBV) is violence committed against a person because of his or her sex or gender. It is forcing another person to do something against his or her will through violence, coercion, threats, deception, cultural expectations, or economic means. Although the majority of survivors of GBV are girls and women, boys and men can also be targeted through GBV.</Text>
                <Text style={{ textAlign: 'right', color: '#00B98E', fontWeight: 'bold' }}>Report your Gbv</Text>
                <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold', padding: 10, marginTop: 30 }}>Forms of gender-based violence </Text>
                <Text style={styles.textt}>There are several forms that gender-based violence can take:</Text>


                <Text style={styles.textt}><Text style={{ fontWeight: 'bold' }}>Sexual violence </Text> is any act, attempted or threatened, that is sexual in nature and carried out without the consent of the victim. Sexual violence includes rape, sexual abuse and harassment, exploitation, and forced prostitution. It can happen within marriages, especially when there is a lack of consent for sexual activity by one of the spouses.</Text>
                <Text style={styles.textt}>Any sexual activity with a child (any person who has not yet completed 18 years of age) constitutes sexual violence. It has devastating effects on the development of the child involved, as well as on his or her physical and mental health.Physical violence such as beating, punching, maiming and killing (with or without weapons) is often combined with non-violent forms of GBV, including emotional and psychological violence.</Text>

                <Text style={styles.textt}><Text style={{ fontWeight: 'bold' }}>Emotional or psychological violence </Text> is non-sexual, verbal abuse that is insulting and degrading to the survivor. This can include isolating a person from his or her friends and family, and restricting the person’s freedom of movement.</Text>


                <Text style={styles.textt}><Text style={{ fontWeight: 'bold' }}>Socio-economic violence </Text>which excludes a person from participating in society. This includes the denial of access of the person to health services, education and work, and the denial of his or her civil, social, economic, cultural and political rights.</Text>

                <Text style={styles.textt}><Text style={{ fontWeight: 'bold' }}>Domestic violence</Text> is any physical, sexual, psychological, verbal and economic violence between one person and another within the family. It may be committed by family members and/or people considered as family members, whether or not they live in the same household.</Text>



                <Text style={{ textAlign: 'justify', marginTop: 50, fontSize: 16 }}>GBV is a serious human rights  violation and a major public health issue. It is under-reported but known to happen in all contexts. Women and girls everywhere are disproportionately affected and are at heightened risk. Asylum-seekers, refugees, stateless
                    persons, internally displaced persons,and returnees are at heightenedrisk of GBV, irrespective of their age, gender or other diversity considerations.</Text>

                <View style={{marginTop: 50, flexDirection:'row', flex:2, width: '100%', justifyContent: 'space-around', alignContent: 'space-around'}}>
                    <TouchableOpacity style={styles.touchable} onPress={() => Linking.openURL("https://www.who.int/news-room/fact-sheets/detail/violence-against-women")}><Text style={styles.txt}>Learn More About GBV </Text></TouchableOpacity>
                    <TouchableOpacity style={styles.touchable}><Text style={{color: 'red', fontWeight: 'bold', textAlign: 'center'}}>Report a GBV case </Text></TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default GBV

const styles = StyleSheet.create({
    textt: {
        fontSize: 16,
        textAlign: 'justify'
    },
    touchable:{
        maxWidth: '40%',
        backgroundColor: '#00B98E80',
        padding: 8,
        justifyContent: 'center',
        borderRadius: 10
    },
    txt:{
        textAlign: 'center',
        fontWeight: 'bold',
    }
})