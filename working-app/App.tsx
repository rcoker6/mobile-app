import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  const textColor = {
    color: isDarkMode ? '#fff' : '#000',
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <View style={styles.center}>
        <Text style={[styles.title, textColor]}>Hello World!</Text>
        <Text style={[styles.subtitle, textColor]}>
          Extra Chill Mobile App
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default App;