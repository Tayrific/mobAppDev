import React, {Component} from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

class homeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            listData:[]
        }
    }

    componentDidMount(){
        this.unsubscribe = this.props.navigation.addListener("focus", () => {
        this.checkLoggedIn();
        });

        this.getData();
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    getData = async () => {
       const value = await AsyncStorage.getItem('@session_token');
       return fetch ("http://localhost:3333/api/1.0.0/user/{user_id}", {
              method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': value
                },
            })
            .then((response) => {
                if(response.status === 200){
                    return response.json()
                }else if(response.status === 401){
                    throw 'Unauthorised';
                }else{
                    throw 'Something went wrong';
                }
            })
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    listData: responseJson
                })
            })
            .catch((error) => {
                console.log(error);
            })
    };

    checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if(value == null){
            this.props.navigation.navigate('authScreen');
        }
    };


    render(){
        return (
            <View style={styles.container}>
                <Text>Home screen</Text>
                <Text>Welcome {this.state.user.firstName} {this.state.user.lastName}</Text>
            </View>
        );
    }
}