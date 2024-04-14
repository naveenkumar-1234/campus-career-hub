// QuestionPage.js
import React, {  useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, Button, Image, Alert } from 'react-native';
import QuestionComponent from './QuesComponent';
import MenuBar from '../../assets/MenuBar.png';
import data1 from './data1';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Interpretation() {
    const router =useRoute()
  const [score, setScore] = useState(0);
  const navigater=useNavigation()
  const handleSubmit = () => {
    const user_id=router.params?.id
    console.log(user_id)
    console.log('Score:', score);

    Alert.alert("Score",`You got ${score}/5 ⭐`,[
      {text:'Done',onPress:()=>{navigater.navigate('skill',{id:user_id})}},
    
    ])
 
  };

  const handleSelectOption = (quesId, option) => {
    const question = data1.find(item => item.id === quesId);
    if (question && !question.answered) {
      question.answered = true;
      if (question.answer === option) {
        setScore(prev => prev + 1);
      }
    }
  };
  data1.forEach(item => {
    item.answered = false;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#6287A1D9', borderRadius: 25, paddingTop: 26, paddingBottom: 274 }}>
        <View style={{ flexDirection: 'row', marginBottom: 4, marginHorizontal: 15 }}>
          <Image source={MenuBar} resizeMode="stretch" style={{ width: 31, height: 33, marginTop: 5, marginRight: 24 }} />
          <Text style={{ color: '#000000', fontSize: 16, marginTop: 17 }}></Text>
          <View style={{ flex: 1 }} />
        </View>
        <View style={{ width: 374, height: 1, backgroundColor: '#000000', marginBottom: 20 ,marginHorizontal:10}} />
        {data1.map((item) => (
          <QuestionComponent
            key={item.id}
            question={item.question}
            options={item.options}
            quesId={item.id}
            onSelect={handleSelectOption}
          />
        ))}
        <View style={{ marginBottom: 50, marginHorizontal: 10 }}>
          <TouchableOpacity onPress={handleSubmit}>
            <Button title="Submit" onPress={handleSubmit} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
