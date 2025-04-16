import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Title, Card, Paragraph, Button, Avatar, Chip, Text } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  // Dati fittizi per simulare l'impronta di carbonio dell'utente
  const carbonData = {
    current: 125,
    average: 180,
    saved: 55,
  };

  // Dati fittizi per le sfide
  const challenges = [
    {
      id: 1,
      title: 'Acquista 5 prodotti eco-friendly',
      progress: 3,
      total: 5,
      reward: '50 punti',
    },
    {
      id: 2,
      title: 'Usa borse riutilizzabili per 1 settimana',
      progress: 5,
      total: 7,
      reward: '30 punti',
    },
  ];

  // Dati fittizi per i prodotti consigliati
  const recommendedProducts = [
    {
      id: 1,
      name: 'Detersivo biologico EcoClean',
      brand: 'EcoClean',
      rating: 4.5,
      ecoScore: 'A',
    },
    {
      id: 2,
      name: 'Sacchetti biodegradabili',
      brand: 'GreenBag',
      rating: 4.8,
      ecoScore: 'A+',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header con benvenuto */}
      <View style={styles.header}>
        <Title style={styles.title}>Benvenuto in EcoShopper</Title>
        <Paragraph style={styles.subtitle}>
          Fai scelte sostenibili per il pianeta
        </Paragraph>
      </View>

      {/* Card dell'impronta di carbonio */}
      <Card style={styles.card}>
        <Card.Title 
          title="La tua impronta di carbonio" 
          subtitle="Questo mese"
          left={(props) => <Avatar.Icon {...props} icon="eco" color="#fff" style={{backgroundColor: '#4CAF50'}} />}
        />
        <Card.Content>
          <View style={styles.carbonStats}>
            <View style={styles.carbonItem}>
              <Text style={styles.carbonValue}>{carbonData.current}</Text>
              <Text style={styles.carbonLabel}>kg CO₂</Text>
            </View>
            <View style={styles.carbonItem}>
              <Text style={styles.carbonValue}>{carbonData.average}</Text>
              <Text style={styles.carbonLabel}>Media</Text>
            </View>
            <View style={styles.carbonItem}>
              <Text style={styles.carbonValue}>-{carbonData.saved}</Text>
              <Text style={styles.carbonLabel}>Risparmiati</Text>
            </View>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button 
            onPress={() => navigation.navigate('Impronta')}
            mode="text"
            color="#4CAF50"
          >
            Vedi dettagli
          </Button>
        </Card.Actions>
      </Card>

      {/* Sfide in corso */}
      <Card style={styles.card}>
        <Card.Title 
          title="Le tue sfide" 
          subtitle="In corso"
          left={(props) => <Avatar.Icon {...props} icon="trophy" color="#fff" style={{backgroundColor: '#FFC107'}} />}
        />
        <Card.Content>
          {challenges.map(challenge => (
            <View key={challenge.id} style={styles.challengeItem}>
              <View style={styles.challengeHeader}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Chip mode="outlined" style={styles.rewardChip}>{challenge.reward}</Chip>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${(challenge.progress / challenge.total) * 100}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {challenge.progress}/{challenge.total} completati
              </Text>
            </View>
          ))}
        </Card.Content>
        <Card.Actions>
          <Button 
            onPress={() => navigation.navigate('Sfide')}
            mode="text"
            color="#FFC107"
          >
            Tutte le sfide
          </Button>
        </Card.Actions>
      </Card>

      {/* Prodotti consigliati */}
      <Card style={styles.card}>
        <Card.Title 
          title="Prodotti eco consigliati" 
          subtitle="Basati sulle tue preferenze"
          left={(props) => <Avatar.Icon {...props} icon="shopping" color="#fff" style={{backgroundColor: '#8BC34A'}} />}
        />
        <Card.Content>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {recommendedProducts.map(product => (
              <Card key={product.id} style={styles.productCard}>
                <Card.Content>
                  <View style={styles.productHeader}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Chip mode="outlined" style={styles.ecoScoreChip}>{product.ecoScore}</Chip>
                  </View>
                  <Text style={styles.productBrand}>{product.brand}</Text>
                  <Text style={styles.productRating}>★ {product.rating}/5</Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </Card.Content>
        <Card.Actions>
          <Button 
            onPress={() => navigation.navigate('Prodotti')}
            mode="text"
            color="#8BC34A"
          >
            Esplora prodotti
          </Button>
        </Card.Actions>
      </Card>

      {/* Bottone per lo scanner */}
      <Button 
        mode="contained"
        icon="barcode-scan"
        style={styles.scanButton}
        labelStyle={styles.scanButtonLabel}
        onPress={() => navigation.navigate('Scanner')}
      >
        Scansiona un prodotto
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
  },
  card: {
    margin: 10,
    elevation: 2,
  },
  carbonStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  carbonItem: {
    alignItems: 'center',
  },
  carbonValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  carbonLabel: {
    fontSize: 14,
    color: '#757575',
  },
  challengeItem: {
    marginVertical: 10,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  rewardChip: {
    backgroundColor: '#FFF8E1',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    marginVertical: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFC107',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'right',
  },
  productCard: {
    width: 180,
    marginRight: 10,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 5,
  },
  ecoScoreChip: {
    backgroundColor: '#E8F5E9',
    height: 26,
  },
  productBrand: {
    fontSize: 12,
    color: '#757575',
    marginVertical: 5,
  },
  productRating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFC107',
    marginTop: 5,
  },
  scanButton: {
    margin: 20,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
  },
  scanButtonLabel: {
    fontSize: 16,
  },
});

export default HomeScreen; 