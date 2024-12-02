import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const FeaturedCourses = (title: string, desc: string, img: string) => {
    return (
        <View style={styles.main}>
            <Image source={require(img)} style={styles.img} />
            <View style={styles.sec}>
                <Text style={styles.title} >{title}</Text>
                <Text style={styles.desc}>{desc}</Text>
            </View>
        </View>
    )
}

export default FeaturedCourses; // Export the component properly

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap'
    },
    img: {
        height: 80,
        width: 80,
        marginRight: 10,
    },
    sec: {
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    },
    title: {
        color: '#3C82A1',
        fontWeight: 100,
    },
    desc: {

    }

})