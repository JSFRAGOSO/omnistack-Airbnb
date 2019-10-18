import React, {useState,useEffect} from 'react';
import socketio from 'socket.io-client';
import { Alert, View,Text,TouchableOpacity, ScrollView, StyleSheet, Image, AsyncStorage,YellowBox } from 'react-native';
import SpotList from '../components/SpotList';
import logo from '../../assets/logo.png';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

export default function List({navigation}){

    const [techs,setTechs] = useState([]);
    
    useEffect(() => {
      AsyncStorage.getItem('user').then(user_id => {
        const socket = socketio('http://192.168.56.1:3333', {
          query: { user_id }
        })
  
        socket.on('booking_response', booking => {
          Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
        })
      })
    }, []);

    useEffect(() => {
      AsyncStorage.getItem('techs').then(storagedTechs => {
        const techsArray = storagedTechs.split(',').map(tech => tech.trim());
  
        setTechs(techsArray);
      })
    }, []);

    function handleCancel(){
      AsyncStorage.clear()
      navigation.navigate('Login')
    }

    return (
      <>
        <TouchableOpacity style = {styles.exit}onPress = {handleCancel}>
            <Text style = {styles.exitText}>Sair</Text>
          </TouchableOpacity>
        <View style={styles.container}>
          <Image style={styles.logo} source={logo} />

    
          <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech} />)}            
          </ScrollView>
        </View>
       </> 
      )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10
      },
    exit:{
      flexDirection:'row',
      alignSelf:'flex-end',
      height:20,
      width:100,
      backgroundColor:'#999',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:2
    },
    exitText:{
      color:'#fff',
        fontWeight:'bold',
        fontSize:16
    }  

})