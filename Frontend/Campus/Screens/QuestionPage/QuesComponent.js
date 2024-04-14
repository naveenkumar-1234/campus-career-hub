// QuestionComponent.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const QuestionComponent = ({ question, options, onSelect, quesId }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(quesId, option);
  };

  return (
    <View style={{ marginVertical: 10,marginHorizontal:15 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={{
            padding: 10,
            backgroundColor: selectedOption === option ? '#DDDDDD' : '#FFFFFF',
            borderWidth: selectedOption === option ? 2 : 0,
            borderRadius: 5,
            marginVertical: 5,
          }}
          onPress={() => handleSelectOption(option)}
        >
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuestionComponent;
