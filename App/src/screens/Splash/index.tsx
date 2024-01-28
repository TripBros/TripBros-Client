import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Splash = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/splashScreen.png')} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 230,
        height: 133,
        resizeMode: 'contain', // 또는 'cover'
    },
});

export default Splash;
