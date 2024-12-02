import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, ImageBackground } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../assets/images/Home/Vector.png')} style={styles.logo} />
          <Text style={styles.title}> Family Cohesion</Text>
        </View>
        <Image source={require('../../assets/images/Home/Group 121.png')} />
      </View>
      <View>
        <Text style={{ color: "#7C82A1", fontSize: 16, textAlign: "left" }}> Set aside regular time for open and honest
          communication.</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.menu}>
        <TouchableOpacity style={styles.buttonh}>
          <Text style={{ color: "#fff", }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Budgeting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Courses</Text>
        </TouchableOpacity><TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
      </ScrollView>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.featured}>
        <View style={{ borderRadius: 20, marginRight: 30, overflow: "hidden" }}>
          <ImageBackground source={require('../../assets/images/Home/1.png')} style={styles.imgb}>
            <Image source={require('@/assets/images/Home/vec.png')} style={styles.featuredImg} />
            <View style={styles.blogButton}>
              <Text style={styles.blogButtonh}>Blog</Text>
              <Text style={styles.blogButtonText}>Successful Stories in Family Engagement</Text>
            </View>
          </ImageBackground>

        </View>
        <View style={{ borderRadius: 20, marginRight: 30, overflow: "hidden" }}>
          <ImageBackground source={require('../../assets/images/Home/2.jpeg')} style={styles.imgb}>
            <Image source={require('@/assets/images/Home/vec.png')} style={styles.featuredImg} />
            <View style={styles.blogButton}>
              <Text style={styles.blogButtonh}>ART</Text>
              <Text style={styles.blogButtonText}>An updated daily front page</Text>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
      <View style={styles.courses}>
 
      <View style={styles.main}>
            <Image source={require('@/assets/images/Home/rec1.png')} style={styles.img}/>
            <View style= {styles.sec}>
                <Text style={styles.titlec} >Little Scientists: Exploring the World</Text>
                <Text style= {styles.desc}>Young learners become scientists as they explore</Text>
            </View>
        </View>
        <View style={styles.main}>
            <Image source={require('@/assets/images/Home/rec1.png')} style={styles.img}/>
            <View style= {styles.sec}>
                <Text style={styles.titlec} >Little Scientists: Exploring the World</Text>
                <Text style= {styles.desc}>Young learners become scientists as they explore</Text>
            </View>
        </View>
        <View style={styles.main}>
            <Image source={require('@/assets/images/Home/rec1.png')} style={styles.img}/>
            <View style= {styles.sec}>
                <Text style={styles.titlec} >Little Scientists: Exploring the World</Text>
                <Text style= {styles.desc}>Young learners become scientists as they explore</Text>
            </View>
        </View>
        <View style={styles.main}>
            <Image source={require('@/assets/images/Home/rec1.png')} style={styles.img}/>
            <View style= {styles.sec}>
                <Text style={styles.titlec} >Little Scientists: Exploring the World</Text>
                <Text style= {styles.desc}>Young learners become scientists as they explore</Text>
            </View>
        </View>
        <View style={styles.main}>
            <Image source={require('@/assets/images/Home/rec1.png')} style={styles.img}/>
            <View style= {styles.sec}>
                <Text style={styles.titlec} >Little Scientists: Exploring the World</Text>
                <Text style= {styles.desc}>Young learners become scientists as they explore</Text>
            </View>
        </View>
        <View style={styles.main}>
            <Image source={require('@/assets/images/Home/rec1.png')} style={styles.img}/>
            <View style= {styles.sec}>
                <Text style={styles.titlec} >Little Scientists: Exploring the World</Text>
                <Text style= {styles.desc}>Young learners become scientists as they explore</Text>
            </View>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom:20
  },
  header: {
    flex: 3,
    flexDirection: 'row',
    // padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  logo: {
    width: 20,
    height: 20,
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menu: {
    flex: 1,
    width: '100%',
  },
  button: {
    backgroundColor: '#F3F4F6',
    borderRadius: 5,
    padding: 15,
    paddingBottom: 8,
    paddingTop: 8,
    margin: 10,
    marginVertical: 5,
  },
  buttonh: {
    backgroundColor: '#00B98E',
    borderRadius: 5,
    padding: 15,
    paddingBottom: 8,
    paddingTop: 8,
    margin: 10,
    marginVertical: 5,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  featured: {
    flex: 1,
    marginTop: 20
  },
  imgb: {
    width: 300,
    height: 250,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  featuredImg: {
    marginRight: 20,
    marginTop: 20
  },
  blogButton: {
    backgroundColor: '#00B98E80',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    width: '100%'
  },
  blogButtonh: {
    color: '#fff',
    fontWeight: '100'
  },
  blogButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  courses:{
    display: 'flex',
    marginTop:30,
    marginBottom: 40
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop:10

},
img: {
    height: 80,
    width: 80,
    marginRight:10,
},
sec:{
    flex:1,
    flexDirection: 'column',
    width: '100%'
},
titlec:{
    color:'#3C82A1',
    fontWeight: 100,
},
desc:{

}


});

export default HomeScreen;