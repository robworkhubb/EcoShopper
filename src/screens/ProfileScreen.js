import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Title, Text, Avatar, Card, Button, Switch, Divider, List, Badge, Portal, Modal, TextInput } from 'react-native-paper';

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [switchValues, setSwitchValues] = useState({
    vegan: true,
    biological: true,
    localProducts: false,
    plasticFree: true,
    crueltyFree: true,
    fairTrade: false,
  });

  // Dati fittizi per il profilo utente
  const userProfile = {
    name: 'Marco Rossi',
    email: 'marco.rossi@email.com',
    joined: 'Aprile 2025',
    totalPoints: 780,
    level: 'Eco-Warrior',
    achievements: 12,
    totalCarbonSaved: 235,
    challengesCompleted: 8,
    ecoShoppingScore: 82,
  };

  // Dati fittizi per le medaglie/riconoscimenti
  const badges = [
    { id: 1, name: 'Primo Acquisto Green', icon: 'leaf', achieved: true },
    { id: 2, name: 'Risparmia 100kg CO₂', icon: 'molecule-co2', achieved: true },
    { id: 3, name: '5 Sfide Completate', icon: 'trophy', achieved: true },
    { id: 4, name: 'Plastic Free Hero', icon: 'bottle-soda-outline', achieved: false },
    { id: 5, name: 'Vegan Master', icon: 'sprout', achieved: false },
  ];

  // Gestisce il cambiamento degli switch delle preferenze
  const toggleSwitch = (preference) => {
    setSwitchValues({
      ...switchValues,
      [preference]: !switchValues[preference]
    });
  };

  // Funzione per simulare il logout
  const handleLogout = () => {
    console.log('Logout effettuato');
    // In un'app reale, qui ci sarebbe il codice per effettuare il logout
  };

  // Funzione per simulare il salvataggio delle preferenze
  const saveProfile = () => {
    setModalVisible(false);
    // In un'app reale, qui ci sarebbe il codice per salvare le preferenze dell'utente
    console.log('Preferenze salvate:', switchValues);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header con le informazioni dell'utente */}
      <View style={styles.header}>
        <View style={styles.profileHeader}>
          <Avatar.Text 
            size={80} 
            label={userProfile.name.split(' ').map(n => n[0]).join('')} 
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Title style={styles.userName}>{userProfile.name}</Title>
            <Text style={styles.userEmail}>{userProfile.email}</Text>
            <Text style={styles.userJoined}>Iscritto da {userProfile.joined}</Text>
          </View>
        </View>
        <View style={styles.userStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userProfile.totalPoints}</Text>
            <Text style={styles.statLabel}>Punti</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userProfile.level}</Text>
            <Text style={styles.statLabel}>Livello</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userProfile.achievements}</Text>
            <Text style={styles.statLabel}>Medaglie</Text>
          </View>
        </View>
      </View>

      {/* Riassunto delle statistiche */}
      <Card style={styles.card}>
        <Card.Title title="Le tue Statistiche" subtitle="Impatto ambientale" />
        <Card.Content>
          <View style={styles.statsGrid}>
            <View style={styles.statsGridItem}>
              <Avatar.Icon 
                size={40} 
                icon="molecule-co2" 
                color="#fff" 
                style={{backgroundColor: '#4CAF50'}} 
              />
              <Text style={styles.statsGridValue}>{userProfile.totalCarbonSaved} kg</Text>
              <Text style={styles.statsGridLabel}>CO₂ risparmiata</Text>
            </View>
            
            <View style={styles.statsGridItem}>
              <Avatar.Icon 
                size={40} 
                icon="trophy" 
                color="#fff" 
                style={{backgroundColor: '#FFC107'}} 
              />
              <Text style={styles.statsGridValue}>{userProfile.challengesCompleted}</Text>
              <Text style={styles.statsGridLabel}>Sfide completate</Text>
            </View>
            
            <View style={styles.statsGridItem}>
              <Avatar.Icon 
                size={40} 
                icon="shopping" 
                color="#fff" 
                style={{backgroundColor: '#9C27B0'}} 
              />
              <Text style={styles.statsGridValue}>{userProfile.ecoShoppingScore}/100</Text>
              <Text style={styles.statsGridLabel}>Eco-punteggio</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Medaglie e riconoscimenti */}
      <Card style={styles.card}>
        <Card.Title title="Medaglie" subtitle="I tuoi riconoscimenti" />
        <Card.Content>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.badgesContainer}
          >
            {badges.map((badge) => (
              <View key={badge.id} style={styles.badgeItem}>
                <Avatar.Icon 
                  size={60} 
                  icon={badge.icon} 
                  color={badge.achieved ? "#fff" : "#bdbdbd"} 
                  style={{
                    backgroundColor: badge.achieved ? '#4CAF50' : '#e0e0e0',
                    opacity: badge.achieved ? 1 : 0.7,
                  }} 
                />
                <Text style={[
                  styles.badgeName, 
                  {color: badge.achieved ? '#000000' : '#757575'}
                ]}>
                  {badge.name}
                </Text>
                {badge.achieved ? (
                  <Badge style={styles.achievedBadge}>✓</Badge>
                ) : (
                  <Badge style={styles.lockedBadge}>?</Badge>
                )}
              </View>
            ))}
          </ScrollView>
        </Card.Content>
      </Card>

      {/* Preferenze sostenibili */}
      <Card style={styles.card}>
        <Card.Title title="Preferenze Sostenibili" subtitle="Le tue priorità" />
        <Card.Content>
          <List.Item
            title="Vegano"
            description="Preferisco prodotti senza ingredienti di origine animale"
            left={props => <List.Icon {...props} icon="sprout" color={switchValues.vegan ? '#4CAF50' : '#757575'} />}
            right={props => <Switch value={switchValues.vegan} onValueChange={() => toggleSwitch('vegan')} color="#4CAF50" />}
          />
          <Divider />
          <List.Item
            title="Biologico"
            description="Preferisco prodotti con ingredienti biologici certificati"
            left={props => <List.Icon {...props} icon="flower" color={switchValues.biological ? '#4CAF50' : '#757575'} />}
            right={props => <Switch value={switchValues.biological} onValueChange={() => toggleSwitch('biological')} color="#4CAF50" />}
          />
          <Divider />
          <List.Item
            title="Prodotti Locali"
            description="Preferisco prodotti locali per ridurre l'impronta di carbonio"
            left={props => <List.Icon {...props} icon="map-marker" color={switchValues.localProducts ? '#4CAF50' : '#757575'} />}
            right={props => <Switch value={switchValues.localProducts} onValueChange={() => toggleSwitch('localProducts')} color="#4CAF50" />}
          />
          <Divider />
          <List.Item
            title="Senza Plastica"
            description="Preferisco prodotti senza imballaggi in plastica"
            left={props => <List.Icon {...props} icon="bottle-soda-outline" color={switchValues.plasticFree ? '#4CAF50' : '#757575'} />}
            right={props => <Switch value={switchValues.plasticFree} onValueChange={() => toggleSwitch('plasticFree')} color="#4CAF50" />}
          />
          <Divider />
          <List.Item
            title="Cruelty-Free"
            description="Preferisco prodotti non testati su animali"
            left={props => <List.Icon {...props} icon="rabbit" color={switchValues.crueltyFree ? '#4CAF50' : '#757575'} />}
            right={props => <Switch value={switchValues.crueltyFree} onValueChange={() => toggleSwitch('crueltyFree')} color="#4CAF50" />}
          />
          <Divider />
          <List.Item
            title="Commercio Equo"
            description="Preferisco prodotti da commercio equo e solidale"
            left={props => <List.Icon {...props} icon="handshake" color={switchValues.fairTrade ? '#4CAF50' : '#757575'} />}
            right={props => <Switch value={switchValues.fairTrade} onValueChange={() => toggleSwitch('fairTrade')} color="#4CAF50" />}
          />
          <Divider />
          <Button 
            mode="outlined" 
            onPress={() => setModalVisible(true)}
            style={styles.editButton}
            color="#4CAF50"
          >
            Gestisci preferenze
          </Button>
        </Card.Content>
      </Card>

      {/* Pulsanti azioni */}
      <View style={styles.actionsContainer}>
        <Button
          mode="contained"
          icon="cog"
          onPress={() => console.log('Impostazioni')}
          style={[styles.actionButton, {backgroundColor: '#8BC34A'}]}
        >
          Impostazioni
        </Button>
        <Button
          mode="contained"
          icon="logout"
          onPress={handleLogout}
          style={[styles.actionButton, {backgroundColor: '#F44336'}]}
        >
          Logout
        </Button>
      </View>

      {/* Modal per modificare le preferenze */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Title style={styles.modalTitle}>Gestisci Preferenze</Title>
          <Divider style={{marginVertical: 10}} />
          
          <ScrollView>
            {Object.keys(switchValues).map((key) => (
              <View key={key} style={styles.preferenceItem}>
                <View style={styles.preferenceTextContainer}>
                  <Text style={styles.preferenceTitle}>
                    {key === 'vegan' ? 'Vegano' : 
                     key === 'biological' ? 'Biologico' : 
                     key === 'localProducts' ? 'Prodotti Locali' : 
                     key === 'plasticFree' ? 'Senza Plastica' : 
                     key === 'crueltyFree' ? 'Cruelty-Free' : 
                     'Commercio Equo'}
                  </Text>
                  <Text style={styles.preferenceDescription}>
                    Importanza per le tue raccomandazioni
                  </Text>
                </View>
                <Switch 
                  value={switchValues[key]} 
                  onValueChange={() => toggleSwitch(key)}
                  color="#4CAF50"
                />
              </View>
            ))}
          </ScrollView>

          <Divider style={{marginVertical: 10}} />
          <View style={styles.modalActions}>
            <Button 
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            >
              Annulla
            </Button>
            <Button 
              mode="contained" 
              onPress={saveProfile}
              style={[styles.modalButton, {backgroundColor: '#4CAF50'}]}
            >
              Salva
            </Button>
          </View>
        </Modal>
      </Portal>
    </ScrollView>
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
    paddingBottom: 30,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#FFFFFF',
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  userEmail: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
  userJoined: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 12,
    marginTop: 4,
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#FFFFFF',
    opacity: 0.8,
    fontSize: 12,
  },
  card: {
    margin: 10,
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  statsGridItem: {
    alignItems: 'center',
  },
  statsGridValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statsGridLabel: {
    fontSize: 12,
    color: '#757575',
  },
  badgesContainer: {
    paddingVertical: 10,
  },
  badgeItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
    position: 'relative',
  },
  badgeName: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  achievedBadge: {
    position: 'absolute',
    top: 0,
    right: 5,
    backgroundColor: '#4CAF50',
  },
  lockedBadge: {
    position: 'absolute',
    top: 0,
    right: 5,
    backgroundColor: '#9E9E9E',
  },
  editButton: {
    marginTop: 15,
    borderColor: '#4CAF50',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  preferenceTextContainer: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  preferenceDescription: {
    fontSize: 12,
    color: '#757575',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    marginLeft: 10,
  },
});

export default ProfileScreen; 