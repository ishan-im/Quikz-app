import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';

const OptionCard = ({option, handleSelectedOption}) => {
  const [selectedOption, setSelectedOption] = useState(false);

  const handleSelectOption = _option => {
    handleSelectedOption(_option);
    setSelectedOption(true);
  };

  return (
    <View style={styles.options}>
      <TouchableOpacity
        style={styles.optionsButton}
        onPress={() => handleSelectOption(option)}>
        <Text style={styles.option}>{option}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OptionCard;

const styles = StyleSheet.create({
  optionContainer: {
    paddingVertical: 20,
  },

  options: {
    marginVertical: 5,
    flex: 1,
  },
  optionsButton: {
    paddingVertical: 20,
    marginVertical: 6,
    backgroundColor: '#1a759f',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  selectedButton: {
    paddingVertical: 20,
    marginVertical: 6,
    backgroundColor: 'red',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  option: {
    fontSize: 18,
    color: 'white',
    fontWeight: 500,
  },
});
