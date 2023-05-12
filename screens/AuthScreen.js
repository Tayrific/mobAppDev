import { SimpleLineIcons, MaterialCommunityIcons , Zocial } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Input from '../components/Input';
import PageContainer from '../components/PageContainer';
import SubmitButton from '../components/SubmitButton';

const AuthScreen = props => {
    
    return <SafeAreaView style={{ flex: 1}}>
        <PageContainer>
            <Input
                label="First name"
                icon="user"
                iconSize = {25}
                iconPack={SimpleLineIcons} />

            <Input
                label="Last name"
                icon="user"
                iconSize = {25}
                iconPack={SimpleLineIcons} />

            <Input
                label="Email"
                icon="email-outline"
                iconSize = {25}
                iconPack={MaterialCommunityIcons} />

            <Input
                label="Password"
                icon="lock"
                iconSize = {25}
                iconPack={SimpleLineIcons} />

            <SubmitButton disabled ={true}/>

        </PageContainer>
    </SafeAreaView>
};

const styles = StyleSheet.create({
    
})

export default AuthScreen;