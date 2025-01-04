import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import DropdownMenu from './components/DropdownMenu'; // Import dropdown component

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <DropdownMenu />
    </SafeAreaView>
  );
};

export default App;
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
