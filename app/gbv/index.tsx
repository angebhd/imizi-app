import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  StyleSheet 
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, ExternalLink, AlertTriangle } from 'lucide-react-native';

const GBVInformationScreen = () => {
  const router = useRouter();

  const GBVInfoCard = ({ title, description, icon }) => (
    <View style={styles.infoCard}>
      {icon}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </View>
  );

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
          <Text style={styles.headerTitle}>GBV Information</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.introText}>
          Gender-based violence (GBV) is a critical human rights issue that affects individuals across all backgrounds, with devastating physical, emotional, and social consequences.
        </Text>

        <View style={styles.infoCardsContainer}>
          <GBVInfoCard 
            title="Sexual Violence" 
            description="Any sexual act performed without consent, including rape, harassment, and exploitation."
            icon={<AlertTriangle color="#FF6B6B" size={24} />}
          />
          <GBVInfoCard 
            title="Emotional Abuse" 
            description="Psychological manipulation, isolation, and degrading treatment that undermines personal dignity."
            icon={<AlertTriangle color="#FF6B6B" size={24} />}
          />
          <GBVInfoCard 
            title="Domestic Violence" 
            description="Physical, psychological, and economic abuse within familial or intimate partner relationships."
            icon={<AlertTriangle color="#FF6B6B" size={24} />}
          />
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.learnMoreButton} 
            onPress={() => Linking.openURL("https://www.who.int/news-room/fact-sheets/detail/violence-against-women")}
          >
            <Text style={styles.learnMoreButtonText}>Learn More</Text>
            <ExternalLink color="white" size={16} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.reportButton} 
            onPress={() => router.navigate('/gbv/report')}
          >
            <Text style={styles.reportButtonText}>Report a Case</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingTop: 60,
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
  infoCardsContainer: {
    gap: 15,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    marginLeft: 15,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  learnMoreButton: {
    flex: 1,
    backgroundColor: '#4ECDC4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
    gap: 10,
  },
  learnMoreButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  reportButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default GBVInformationScreen;