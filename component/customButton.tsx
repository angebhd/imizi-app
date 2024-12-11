

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const customButton = ({props}) => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    button: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        width: '40%',
        backgroundColor: '#79C3C52B',
        borderColor: '#00B98E',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',


    },
    textButton: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        color: '#666C8E'

    }
})

export default customButton
