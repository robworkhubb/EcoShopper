import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

// Importazione delle schermate principali
import HomeScreen from './screens/HomeScreen';
import ScannerScreen from './screens/ScannerScreen';
import ProductsScreen from './screens/ProductsScreen';
import CarbonFootprintScreen from './screens/CarbonFootprintScreen';
import ChallengesScreen from './screens/ChallengesScreen';
import ProfileScreen from './screens/ProfileScreen';

// Creazione del navigatore a tab
const Tab = createBottomTabNavigator();

// Definizione del tema dell'applicazione
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50',     // Verde principale
    accent: '#8BC34A',      // Verde chiaro
    background: '#F5F5F5',  // Grigio chiaro
    surface: '#FFFFFF',     // Bianco
    text: '#212121',        // Nero testo
    error: '#D32F2F',       // Rosso errore
  },
};

// Componente principale dell'app
const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              // Assegna l'icona appropriata a ciascuna scheda
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Scanner') {
                iconName = 'qr-code-scanner';
              } else if (route.name === 'Prodotti') {
                iconName = 'shopping-cart';
              } else if (route.name === 'Impronta') {
                iconName = 'eco';
              } else if (route.name === 'Sfide') {
                iconName = 'emoji-events';
              } else if (route.name === 'Profilo') {
                iconName = 'person';
              }

              return <MaterialIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'EcoShopper' }}
          />
          <Tab.Screen 
            name="Scanner" 
            component={ScannerScreen} 
            options={{ title: 'Scansiona' }}
          />
          <Tab.Screen 
            name="Prodotti" 
            component={ProductsScreen} 
            options={{ title: 'Prodotti Eco' }}
          />
          <Tab.Screen 
            name="Impronta" 
            component={CarbonFootprintScreen} 
            options={{ title: 'Impronta CO₂' }}
          />
          <Tab.Screen 
            name="Sfide" 
            component={ChallengesScreen} 
            options={{ title: 'Sfide' }}
          />
          <Tab.Screen 
            name="Profilo" 
            component={ProfileScreen} 
            options={{ title: 'Profilo' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App; 