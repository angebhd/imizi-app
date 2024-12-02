import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MyHeader = (a:string) => {
    return (
        <Text style={styles.header}>{a}</Text>
    )
}

export default MyHeader

const styles = StyleSheet.create({
    header: {

        flex: 3,
        flexDirection: 'row',
        // padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    }

})