import React,{useState} from 'react';
import {View,Alert,AsyncStorage,Text,TextInput,TouchableOpacity,StyleSheet} from 'react-native';

import api from '../services/api';

export default function Book({navigation}){

    [date,setDate] = useState('');
    const user_id = AsyncStorage.getItem('user');
    const spot_id = navigation.getParam('id');

    async function handleSubmit(){
        //console.log(user_id);
        const response = await api.post(`/spots/${spot_id}/bookings`, {
            date,
            headers:{
                user_id
            }            
        });

        console.log(response);

        Alert.alert('Solicitação de reserva enviada');
        navigation.navigate('List');
    }

    function  handleCancel(){
        navigation.navigate('List');
    }

    return (
        <View style = {styles.containter}>
            <Text style = {styles.label}> DATA DE INTERESSE * </Text>
            <TextInput
                style = {styles.input}
                placeholder = "Qual data você quer reservar?"
                placeholderTextColor = "#999"
                autoCapitalize = "words"
                autoCorrect = {false}
                value = {date}
                onChangeText = {setDate}
            />
            <TouchableOpacity style = {styles.button} onPress = {handleSubmit}>
                <Text style = {styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.button,styles.cancelButton]} onPress = {handleCancel}>
                <Text style = {styles.buttonText}>Cancelar Reserva</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containter:{
        margin:30
    },
    label:{
        fontWeight:'bold',
        color:'#444',
        marginBottom:8,
        marginTop:30
    },
    input:{
        borderWidth:1,
        borderColor:'#ddd',
        paddingHorizontal:20,
        fontSize:16,
        color:'#444',
        height:44,
        marginBottom:20,
        borderRadius:2
    },
    button:{
        height:42,
        backgroundColor:'#f05a5b',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:2,
        marginVertical:10,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10
    },
    buttonText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:16
    }

})
