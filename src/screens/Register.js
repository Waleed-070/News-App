// Import the functions you need from the SDKs you need
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import React, { useState } from "react";
import { Text, TextInput, Button, View, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword as registerUser } from "firebase/auth";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  
  const registerWithEmailAndPassword = async(name,email,password) => {
    console.log(name,email,password)
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user=res.user;
        const userDocRef = doc(db,"users",user.uid)
        await setDoc(userDocRef,{
            uid:user.uid,
                name,
                email
        })
        return {success:true}
    } catch (error) {
        console.error(error)
    }
}

  const handleRegister = async () => {
    try{
   await registerWithEmailAndPassword(username, email, password);
    }catch(e){
      console.log("error", e);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Register</Text>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Already have an account? Login here!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
