import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { Title, Card, Button, Chip, List, Avatar, ProgressBar, Badge, FAB, Portal, Modal } from 'react-native-paper';

const ChallengesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  // Dati fittizi per le sfide attive
  const activeChallenge = {
    id: 1,
    title: 'Acquista 5 prodotti eco-friendly',
    description: 'Acquista 5 prodotti con rating ecologico A o superiore in un mese.',
    progress: 3,
    total: 5,
    daysLeft: 12,
    reward: {
      points: 50,
      carbonSaved: 15
    },
    icon: 'leaf',
    color: '#4CAF50',
  };

  // Dati fittizi per le sfide disponibili
  const availableChallenges = [
    {
      id: 2,
      title: 'Usa solo borse riutilizzabili',
      description: 'Non utilizzare sacchetti di plastica per una settimana intera durante la spesa.',
      total: 7,
      reward: {
        points: 30,
        carbonSaved: 8
      },
      difficulty: 'Facile',
      icon: 'shopping',
      color: '#8BC34A',
    },
    {
      id: 3,
      title: 'Prodotti a km zero',
      description: 'Acquista solo prodotti locali per un weekend.',
      total: 2,
      reward: {
        points: 20,
        carbonSaved: 5
      },
      difficulty: 'Facile',
      icon: 'map-marker',
      color: '#CDDC39',
    },
    {
      id: 4,
      title: 'Zero imballaggi',
      description: 'Acquista 10 prodotti sfusi o senza imballaggio in plastica.',
      total: 10,
      reward: {
        points: 80,
        carbonSaved: 25
      },
      difficulty: 'Media',
      icon: 'package-variant-remove',
      color: '#FFC107',
    },
    {
      id: 5,
      title: 'Mese vegano',
      description: 'Acquista solo prodotti vegani per un intero mese.',
      total: 30,
      reward: {
        points: 150,
        carbonSaved: 120
      },
      difficulty: 'Difficile',
      icon: 'sprout',
      color: '#FF9800',
    },
  ];

  // Dati fittizi per le sfide completate
  const completedChallenges = [
    {
      id: 6,
      title: 'Settimana dei prodotti biologici',
      description: 'Acquista solo prodotti biologici per una settimana.',
      reward: {
        points: 40,
        carbonSaved: 12
      },
      completedDate: '10 aprile 2025',
      icon: 'flower',
      color: '#009688',
    },
    {
      id: 7,
      title: 'Rifiuti zero',
      description: 'Acquista 5 prodotti con imballaggio completamente riciclabile.',
      reward: {
        points: 25,
        carbonSaved: 7
      },
      completedDate: '2 aprile 2025',
      icon: 'recycle',
      color: '#3F51B5',
    },
  ];
  
  // Funzione per mostrare i dettagli di una sfida
  const showChallengeDetails = (challenge) => {
    setSelectedChallenge(challenge);
    setModalVisible(true);
  };

  // Funzione per calcolare lo stato della sfida
  const calculateProgress = (progress, total) => {
    return (progress / total).toFixed(2);
  };

  // Funzione per avviare una nuova sfida
  const startChallenge = () => {
    // In un'app reale, qui aggiungeresti la logica per avviare una sfida
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header con titolo */}
        <View style={styles.header}>
          <Title style={styles.headerTitle}>Le tue sfide sostenibili</Title>
        </View>
        
        {/* Sfida attiva */}
        <Card style={styles.activeCard}>
          <Card.Title 
            title="Sfida in corso" 
            subtitle={`${activeChallenge.daysLeft} giorni rimanenti`}
            left={(props) => (
              <Avatar.Icon 
                {...props} 
                icon={activeChallenge.icon} 
                color="#fff" 
                style={{backgroundColor: activeChallenge.color}} 
              />
            )}
            right={(props) => (
              <Button 
                mode="text"
                onPress={() => showChallengeDetails(activeChallenge)}
                color="#4CAF50"
              >
                Dettagli
              </Button>
            )}
          />
          <Card.Content>
            <Title style={styles.challengeTitle}>{activeChallenge.title}</Title>
            <Text style={styles.challengeDescription}>{activeChallenge.description}</Text>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressText}>
                  Progresso: {activeChallenge.progress}/{activeChallenge.total}
                </Text>
                <Text style={styles.percentageText}>
                  {Math.round((activeChallenge.progress / activeChallenge.total) * 100)}%
                </Text>
              </View>
              <ProgressBar 
                progress={calculateProgress(activeChallenge.progress, activeChallenge.total)} 
                color={activeChallenge.color}
                style={styles.progressBar}
              />
            </View>
            
            <View style={styles.rewardContainer}>
              <Chip icon="star" style={styles.rewardChip}>
                {activeChallenge.reward.points} punti
              </Chip>
              <Chip icon="molecule-co2" style={styles.rewardChip}>
                {activeChallenge.reward.carbonSaved} kg CO₂ risparmiati
              </Chip>
            </View>
          </Card.Content>
        </Card>
        
        {/* Sfide disponibili */}
        <Card style={styles.card}>
          <Card.Title 
            title="Sfide disponibili" 
            subtitle="Scegli la tua prossima sfida"
            left={(props) => (
              <Avatar.Icon 
                {...props} 
                icon="trophy" 
                color="#fff" 
                style={{backgroundColor: '#FFC107'}} 
              />
            )}
          />
          <Card.Content>
            <List.Section>
              {availableChallenges.map((challenge) => (
                <List.Item
                  key={challenge.id}
                  title={challenge.title}
                  description={challenge.description}
                  left={props => (
                    <Avatar.Icon 
                      {...props} 
                      size={40} 
                      icon={challenge.icon} 
                      color="#fff" 
                      style={{backgroundColor: challenge.color}}
                    />
                  )}
                  right={props => (
                    <View style={styles.challengeItemRightContainer}>
                      <Chip size={20} style={[styles.difficultyChip, {
                        backgroundColor: challenge.difficulty === 'Facile' ? '#E8F5E9' : 
                                        challenge.difficulty === 'Media' ? '#FFF8E1' : '#FFEBEE'
                      }]}>
                        {challenge.difficulty}
                      </Chip>
                      <Text style={styles.rewardPoints}>+{challenge.reward.points} punti</Text>
                    </View>
                  )}
                  onPress={() => showChallengeDetails(challenge)}
                  style={styles.listItem}
                />
              ))}
            </List.Section>
          </Card.Content>
        </Card>
        
        {/* Sfide completate */}
        <Card style={styles.card}>
          <Card.Title 
            title="Sfide completate" 
            subtitle="Le tue vittorie sostenibili"
            left={(props) => (
              <Avatar.Icon 
                {...props} 
                icon="check-circle" 
                color="#fff" 
                style={{backgroundColor: '#009688'}} 
              />
            )}
          />
          <Card.Content>
            <List.Section>
              {completedChallenges.map((challenge) => (
                <List.Item
                  key={challenge.id}
                  title={challenge.title}
                  description={`Completata il ${challenge.completedDate}`}
                  left={props => (
                    <Avatar.Icon 
                      {...props} 
                      size={40} 
                      icon={challenge.icon} 
                      color="#fff" 
                      style={{backgroundColor: challenge.color}}
                    />
                  )}
                  right={props => (
                    <View style={styles.challengeItemRightContainer}>
                      <Badge style={styles.completedBadge}>{challenge.reward.points}</Badge>
                      <Text style={styles.completedText}>Completata</Text>
                    </View>
                  )}
                  style={styles.listItem}
                />
              ))}
            </List.Section>
          </Card.Content>
        </Card>
      </ScrollView>
      
      {/* Modal con i dettagli della sfida */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {selectedChallenge && (
            <Card>
              <Card.Title 
                title={selectedChallenge.title}
                left={(props) => (
                  <Avatar.Icon 
                    {...props} 
                    icon={selectedChallenge.icon} 
                    color="#fff" 
                    style={{backgroundColor: selectedChallenge.color}} 
                  />
                )}
              />
              <Card.Content>
                <Text style={styles.modalDescription}>{selectedChallenge.description}</Text>
                
                {selectedChallenge.progress !== undefined && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressTextContainer}>
                      <Text style={styles.progressText}>
                        Progresso: {selectedChallenge.progress}/{selectedChallenge.total}
                      </Text>
                      <Text style={styles.percentageText}>
                        {Math.round((selectedChallenge.progress / selectedChallenge.total) * 100)}%
                      </Text>
                    </View>
                    <ProgressBar 
                      progress={calculateProgress(selectedChallenge.progress, selectedChallenge.total)} 
                      color={selectedChallenge.color}
                      style={styles.progressBar}
                    />
                  </View>
                )}
                
                <View style={styles.modalDetailsContainer}>
                  <View style={styles.modalDetailItem}>
                    <Text style={styles.modalDetailLabel}>Durata:</Text>
                    <Text style={styles.modalDetailValue}>
                      {selectedChallenge.total} {selectedChallenge.total === 1 ? 'giorno' : 'giorni'}
                    </Text>
                  </View>
                  
                  <View style={styles.modalDetailItem}>
                    <Text style={styles.modalDetailLabel}>Ricompensa:</Text>
                    <View style={styles.rewardContainer}>
                      <Chip icon="star" style={styles.rewardChip}>
                        {selectedChallenge.reward.points} punti
                      </Chip>
                      <Chip icon="molecule-co2" style={styles.rewardChip}>
                        {selectedChallenge.reward.carbonSaved} kg CO₂
                      </Chip>
                    </View>
                  </View>
                  
                  {selectedChallenge.difficulty && (
                    <View style={styles.modalDetailItem}>
                      <Text style={styles.modalDetailLabel}>Difficoltà:</Text>
                      <Chip style={[styles.difficultyChip, {
                        backgroundColor: selectedChallenge.difficulty === 'Facile' ? '#E8F5E9' : 
                                        selectedChallenge.difficulty === 'Media' ? '#FFF8E1' : '#FFEBEE'
                      }]}>
                        {selectedChallenge.difficulty}
                      </Chip>
                    </View>
                  )}
                </View>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => setModalVisible(false)}>Chiudi</Button>
                {selectedChallenge.progress === undefined && (
                  <Button 
                    mode="contained" 
                    onPress={startChallenge}
                    style={{backgroundColor: selectedChallenge.color}}
                  >
                    Inizia Sfida
                  </Button>
                )}
              </Card.Actions>
            </Card>
          )}
        </Modal>
      </Portal>
      
      {/* Floating Action Button per creare nuove sfide personalizzate */}
      <FAB
        style={styles.fab}
        icon="plus"
        color="#FFFFFF"
        onPress={() => console.log('Crea sfida personalizzata')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
  },
  activeCard: {
    margin: 10,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  card: {
    margin: 10,
    elevation: 2,
  },
  challengeTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  challengeDescription: {
    color: '#757575',
    marginBottom: 15,
  },
  progressContainer: {
    marginVertical: 15,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#757575',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  rewardContainer: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  rewardChip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#F1F8E9',
  },
  listItem: {
    paddingVertical: 5,
    marginVertical: 2,
  },
  challengeItemRightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  difficultyChip: {
    marginBottom: 5,
    height: 24,
  },
  rewardPoints: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  completedBadge: {
    backgroundColor: '#4CAF50',
    color: 'white',
    marginBottom: 5,
  },
  completedText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  modalContainer: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight: '80%',
  },
  modalDescription: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 22,
  },
  modalDetailsContainer: {
    marginTop: 10,
  },
  modalDetailItem: {
    marginBottom: 15,
  },
  modalDetailLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 5,
  },
  modalDetailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
  },
});

export default ChallengesScreen; 