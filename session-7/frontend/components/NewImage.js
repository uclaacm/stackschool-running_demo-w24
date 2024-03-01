import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import SelectableImage from './SelectableImage';

const URL = 'http://localhost:8000';

export default function NewImage({ visible, onClose, userId, currentImage }) {
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(currentImage);
  }, [currentImage]);

  async function handleConfirm() {
    try {
      const response = await fetch(`${URL}/users/edit/picture`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, image: `mofu${selected}.jpeg` }),
      });
    } catch (error) {
      alert('Error uploading image:', error.message);
    }
    onClose();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Icon</Text>
          <View style={styles.grid}>
            <View style={styles.row}>
              <SelectableImage 
                image={require('../assets/mofu1.jpeg')} 
                isSelected={selected === 1}
                onSelect={() => setSelected(1)} 
              />
              <SelectableImage 
                image={require('../assets/mofu2.jpeg')}
                isSelected={selected === 2}
                onSelect={() => setSelected(2)}
              />
            </View>
            <View style={styles.row}>
              <SelectableImage 
                image={require('../assets/mofu3.jpeg')}
                isSelected={selected === 3}
                onSelect={() => setSelected(3)}
              />
              <SelectableImage 
                image={require('../assets/mofu4.jpeg')} 
                isSelected={selected === 4}
                onSelect={() => setSelected(4)}
              />
            </View>
          </View>

          <TouchableOpacity onPress={handleConfirm} style={styles.postButton}>
            <Text style={styles.postText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '85%',
  },
  modalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  postButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  postText: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  grid: {
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row', 
  },
});
