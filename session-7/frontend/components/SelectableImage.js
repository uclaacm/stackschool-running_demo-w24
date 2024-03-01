import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SelectableImage = ({ image, isSelected, onSelect }) => {
    const handleCheckmark = () => {
        onSelect(image);
    };

    return (
      <TouchableOpacity onPress={handleCheckmark}>
        <Image source={image} style={styles.mofu} />
        {isSelected && <Ionicons name="checkmark-circle" size={30} style={styles.checkmark} />}
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mofu: {
        width: 150,
        height: 150,
        margin: 15,
        borderColor: 'black',
        borderRadius: 100,
        borderWidth: 1,
    },
    checkmark: {
        position: 'absolute',
        right: 15,
        top: 25,
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
    }
});

export default SelectableImage;
