import React,{useState} from 'react';
import {View,Alert,AsyncStorage,Text,TextInput,TouchableOpacity} from 'react-native';

import api from '../services/api';

export default function Book({navigation}){

    [date,setDate] = useState('');
    const user_id = AsyncStorage.getItem('user');
    const spot_id = navigation.getParam('id');

    async function handleSubmit(){
            
        await api.post('/spots/:spot_id/bookings', {
            date,
            params:{
                spot_id
            },
            headers:{
                user_id
            }            
        });

        Alert.alert('Solicitação de reserva enviada');
        navigation.navigate('List');
    }

    function  handleCancel(){
        navigation.navigate('List');
    }

    return (
        <View>
            <Text> DATA DE INTERESSE * </Text>
            <TextInput
                placeholder = "Qual data você quer reservar?"
                placeholderTextColor = "#999"
                autoCapitalize = "words"
                autoCorrect = {false}
                value = {date}
                onChangeText = {setDate}
            />
            <TouchableOpacity onPress = {handleSubmit}>
                <Text>Solicitar Reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {handleCancel}>
                <Text>Cancelar Reserva</Text>
            </TouchableOpacity>
        </View>
    );
}
