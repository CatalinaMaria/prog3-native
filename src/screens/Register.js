import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'
import FormRegister from '../components/FormRegister'

export default class Register extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    auth.onAuthStateChanged(( user )=> {
      if(user !== null){
        this.props.navigation.navigate('TabNavigation')
      }
    })
  }


  render() {
    return (
      <View>
        <FormRegister navegacion={this.props.navigation} />
      </View>
    )
  }
}