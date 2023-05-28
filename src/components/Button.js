import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Entypo} from  '@expo/vector-icons' 

export default function Button({title, onPress, color}) {
    return(
        <TouchableOpacity>
            <Entypo name={icon} size={28} color={color ? color : '#f1f1f1'} />
            <Text style = {styles.text.text}> {title} </Text>
        </TouchableOpacity>
    )
}