import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

// Registra l'applicazione con il nome appropriato
AppRegistry.registerComponent(appName, () => App); 