import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

export default function CalculatorScreen() {
  const [currentOperand, setCurrentOperand] = useState('0');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operation, setOperation] = useState<string | null>(null);

  const clear = () => {
    setCurrentOperand('0');
    setPreviousOperand('');
    setOperation(null);
  };

  const deleteNumber = () => {
    if (currentOperand === '0') return;
    if (currentOperand.length === 1) {
      setCurrentOperand('0');
    } else {
      setCurrentOperand(currentOperand.slice(0, -1));
    }
  };

  const appendNumber = (number: string) => {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
      setCurrentOperand(number);
    } else {
      setCurrentOperand(currentOperand + number);
    }
  };

  const chooseOperation = (op: string) => {
    if (currentOperand === '0') return;
    if (previousOperand !== '') {
      compute();
    }
    setOperation(op);
    setPreviousOperand(currentOperand);
    setCurrentOperand('0');
  };

  const compute = () => {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    let computation: number;
    switch (operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }

    setCurrentOperand(computation.toString());
    setOperation(null);
    setPreviousOperand('');
  };

  const getDisplayNumber = (number: string) => {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay: string;
    if (isNaN(integerDigits)) {
      integerDisplay = '0';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.calculator}>
        <View style={styles.display}>
          <Text style={styles.previousOperand}>
            {previousOperand} {operation}
          </Text>
          <Text style={styles.currentOperand}>
            {getDisplayNumber(currentOperand)}
          </Text>
        </View>
        <View style={styles.buttonsGrid}>
          <TouchableOpacity style={[styles.button, styles.spanTwo, styles.brutalistBtn]} onPress={clear}>
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.neoBtn]} onPress={deleteNumber}>
            <Text style={styles.buttonText}>DEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.glassBtn]} onPress={() => chooseOperation('÷')}>
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.neoBtn]} onPress={() => appendNumber('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.neoBtn]} onPress={() => appendNumber('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.neoBtn]} onPress={() => appendNumber('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.glassBtn]} onPress={() => chooseOperation('×')}>
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.neoBtn]} onPress={() => appendNumber('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.neoBtn]} onPress={() => appendNumber('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.neoBtn]} onPress={() => appendNumber('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.glassBtn]} onPress={() => chooseOperation('-')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.neoBtn]} onPress={() => appendNumber('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.neoBtn]} onPress={() => appendNumber('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.neoBtn]} onPress={() => appendNumber('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.glassBtn]} onPress={() => chooseOperation('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.neoBtn]} onPress={() => appendNumber('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.neoBtn]} onPress={() => appendNumber('.')}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.spanTwo, styles.brutalistBtn]} onPress={compute}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  calculator: {
    flex: 1,
    padding: 20,
  },
  display: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  previousOperand: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 24,
    marginBottom: 5,
  },
  currentOperand: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  buttonsGrid: {
    flex: 0.7,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    width: '22%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 10,
  },
  spanTwo: {
    width: '47%',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  neoBtn: {
    backgroundColor: '#2a2a2a',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  glassBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  brutalistBtn: {
    backgroundColor: '#4f46e5',
  },
}); 