import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {whiteColor,darkColor, lightDark,touchableLight} from '../../../styles/colors';

const styles = StyleSheet.create({
    buttonWrapper:{},
    button:{
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: whiteColor,
        shadowColor: darkColor,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    buttonLabel: {
        textAlign: 'center',
        padding: 8,
        fontWeight: '700',
        fontSize:14,
        color: lightDark
    }
});

const BottomNavigationButton = ({pressHandler, Icon, title, label, size = 32}) => {
    return (
        <View style={styles.buttonWrapper}>
            <TouchableHighlight style={styles.button} onPress={pressHandler} title={title} underlayColor={touchableLight}>
                <Icon width={size} height={size}/>
            </TouchableHighlight>
            {/* <Text style={styles.buttonLabel}>{label}</Text> */}
        </View>
    )
};

export default BottomNavigationButton;