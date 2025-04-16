import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, ActivityIndicator, Portal, Modal, Card, Chip, Title, Paragraph } from 'react-native-paper';

const ScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState(null);

  // Richiedi i permessi della fotocamera all'avvio
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Gestisce il risultato della scansione
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setLoading(true);
    
    // Simula la ricerca del prodotto nel database
    setTimeout(() => {
      // Dati di esempio per un prodotto (in un'app reale, questi dati verrebbero da un'API)
      const mockProduct = {
        id: 5678912345,
        name: 'Detersivo Ecologico per Piatti',
        brand: 'EcoClean',
        ecoScore: 'A',
        carbonFootprint: 1.2,
        packaging: 'Plastica riciclata al 90%',
        ingredients: ['Tensioattivi vegetali', 'Acido citrico', 'Olio essenziale di limone'],
        recyclable: true,
        alternatives: [
          {
            id: 8765432198,
            name: 'Detersivo Piatti Zero Waste',
            brand: 'PlanetSafe',
            ecoScore: 'A+',
          },
          {
            id: 2345678901,
            name: 'Detersivo Biodegradabile',
            brand: 'GreenWash',
            ecoScore: 'A',
          }
        ]
      };
      
      setProduct(mockProduct);
      setLoading(false);
      setVisible(true);
    }, 1500);
  };

  // Se non abbiamo ancora i permessi
  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.permissionText}>Richiesta permessi della fotocamera...</Text>
      </View>
    );
  }
  
  // Se i permessi sono stati negati
  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>Accesso alla fotocamera negato</Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Torna indietro
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Overlay con istruzioni */}
      <View style={styles.overlay}>
        <Text style={styles.scanText}>Inquadra il codice a barre di un prodotto</Text>
      </View>
      
      {/* Area di scansione */}
      <View style={styles.scanArea}>
        <View style={styles.scanAreaTopLeft} />
        <View style={styles.scanAreaTopRight} />
        <View style={styles.scanAreaBottomLeft} />
        <View style={styles.scanAreaBottomRight} />
      </View>
      
      {/* Indicatore di caricamento */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Ricerca prodotto...</Text>
        </View>
      )}
      
      {/* Pulsante per scansionare di nuovo */}
      {scanned && !loading && !visible && (
        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" 
            onPress={() => setScanned(false)}
            style={styles.button}
          >
            Scansiona di nuovo
          </Button>
        </View>
      )}
      
      {/* Modal con i dettagli del prodotto */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modal}
        >
          {product && (
            <Card>
              <Card.Title 
                title={product.name}
                subtitle={product.brand}
              />
              <Card.Content>
                <View style={styles.scoreRow}>
                  <Chip icon="leaf" style={[styles.scoreChip, { backgroundColor: '#E8F5E9' }]}>
                    Eco-Score: {product.ecoScore}
                  </Chip>
                  <Chip icon="recycle" style={styles.scoreChip}>
                    {product.recyclable ? 'Riciclabile' : 'Non riciclabile'}
                  </Chip>
                </View>
                
                <Title style={styles.sectionTitle}>Informazioni Ambientali</Title>
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Impronta di CO₂</Text>
                    <Text style={styles.infoValue}>{product.carbonFootprint} kg</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Packaging</Text>
                    <Text style={styles.infoValue}>{product.packaging}</Text>
                  </View>
                </View>
                
                <Title style={styles.sectionTitle}>Ingredienti</Title>
                <View style={styles.ingredientsList}>
                  {product.ingredients.map((ingredient, index) => (
                    <Chip key={index} style={styles.ingredient} mode="outlined">
                      {ingredient}
                    </Chip>
                  ))}
                </View>
                
                <Title style={styles.sectionTitle}>Alternative Sostenibili</Title>
                {product.alternatives.map((alt) => (
                  <Card key={alt.id} style={styles.alternativeCard}>
                    <Card.Content>
                      <View style={styles.alternativeHeader}>
                        <View>
                          <Text style={styles.alternativeName}>{alt.name}</Text>
                          <Text style={styles.alternativeBrand}>{alt.brand}</Text>
                        </View>
                        <Chip style={[styles.ecoScoreChip, { 
                          backgroundColor: alt.ecoScore === 'A+' ? '#C8E6C9' : '#E8F5E9' 
                        }]}>
                          {alt.ecoScore}
                        </Chip>
                      </View>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => setVisible(false)}>Chiudi</Button>
                <Button onPress={() => {
                  setVisible(false);
                  setScanned(false);
                }}>
                  Nuova scansione
                </Button>
              </Card.Actions>
            </Card>
          )}
        </Modal>
      </Portal>
    </View>
  );
};

const { width } = Dimensions.get('window');
const scanAreaSize = width * 0.7;
const borderWidth = 3;
const borderLength = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 20,
  },
  scanArea: {
    width: scanAreaSize,
    height: scanAreaSize,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'transparent',
  },
  scanAreaTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: borderLength,
    height: borderWidth,
    backgroundColor: '#4CAF50',
  },
  scanAreaTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: borderLength,
    height: borderWidth,
    backgroundColor: '#4CAF50',
  },
  scanAreaBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: borderLength,
    height: borderWidth,
    backgroundColor: '#4CAF50',
  },
  scanAreaBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: borderLength,
    height: borderWidth,
    backgroundColor: '#4CAF50',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  scoreRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  scoreChip: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#757575',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredient: {
    margin: 4,
  },
  alternativeCard: {
    marginVertical: 5,
  },
  alternativeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alternativeName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  alternativeBrand: {
    fontSize: 12,
    color: '#757575',
  },
  ecoScoreChip: {
    height: 26,
  },
});

export default ScannerScreen; 