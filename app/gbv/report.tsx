import React from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  Linking 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Phone, 
  Mail, 
  Shield, 
  ExternalLink 
} from 'lucide-react-native';

const Report = () => {
  const ContactButton = ({ type, label, value, onPress, icon }) => (
    <TouchableOpacity style={styles.contactButton} onPress={onPress}>
      <View style={styles.contactButtonContent}>
        {icon}
        <View style={styles.contactButtonTextContainer}>
          <Text style={styles.contactButtonTitle}>{type}</Text>
          <Text style={styles.contactButtonValue}>{value}</Text>
        </View>
        <ExternalLink color="#4ECDC4" size={20} />
      </View>
    </TouchableOpacity>
  );

  const governmentLogos = [
    { source: require('@/assets/images/gbvReport/RIB.jpeg'), name: 'RIB' },
    { source: require('@/assets/images/gbvReport/RNP.png'), name: 'RNP' },
    { source: require('@/assets/images/gbvReport/isange.png'), name: 'Isange' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF6B6B', '#4ECDC4']}
        style={styles.gradientHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Shield color="white" size={32} />
          <Text style={styles.headerTitle}>Report GBV Case</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.introText}>
          You can report your Gender-Based Violence case through the following government sectors and support services.
        </Text>

        <View style={styles.logoContainer}>
          {governmentLogos.map((logo, index) => (
            <View key={index} style={styles.logoWrapper}>
              <Image 
                source={logo.source} 
                style={styles.logoImage} 
                resizeMode="contain"
              />
              <Text style={styles.logoName}>{logo.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Phone color="#4ECDC4" size={24} />
            <Text style={styles.sectionTitle}>Hotlines</Text>
          </View>
          {[
            { type: 'RIB', value: '3512' },
            { type: 'RNP', value: '112' },
            { type: 'MIGEPROF', value: '9059' }
          ].map((contact, index) => (
            <ContactButton 
              key={index}
              type={contact.type}
              value={contact.value}
              onPress={() => Linking.openURL(`tel:${contact.value}`)}
              icon={<Phone color="#FF6B6B" size={24} />}
            />
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Mail color="#4ECDC4" size={24} />
            <Text style={styles.sectionTitle}>Contact Emails</Text>
          </View>
          {[
            { type: 'RIB', value: 'complaint@rib.gov.rw' },
            { type: 'RNP', value: 'info@police.gov.rw' },
            { type: 'MIGEPROF', value: 'info.migeprof@org.rw' }
          ].map((contact, index) => (
            <ContactButton 
              key={index}
              type={contact.type}
              value={contact.value}
              onPress={() => Linking.openURL(`mailto:${contact.value}`)}
              icon={<Mail color="#FF6B6B" size={24} />}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC', paddingTop: 60
  },
  gradientHeader: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 10,
  },
  scrollView: {
    paddingHorizontal: 15,
  },
  introText: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    height: 80,
    width: 80,
    borderRadius: 15,
  },
  logoName: {
    marginTop: 10,
    fontSize: 14,
    color: '#4A5568',
  },
  sectionContainer: {
    marginVertical: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2D3748',
    marginLeft: 10,
  },
  contactButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  contactButtonTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  contactButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  contactButtonValue: {
    fontSize: 14,
    color: '#4A5568',
    marginTop: 5,
  },
});

export default Report;