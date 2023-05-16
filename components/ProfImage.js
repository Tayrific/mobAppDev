import React from 'react';
import { View, Text, Image,StyleSheet } from 'react-native';

import defaultUser from '../assets/images/defaultUser.png';

const ProfImage = props => {
    return (
        <View>

            <Image 
            style = {{...styles.image, ...{width: props.size, height: props.size}}}
            source = {defaultUser}/>

            <View>
                
            </View>

            
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1
    }
})

export default ProfImage;