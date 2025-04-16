import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import { Title, Card, Paragraph, Chip, Button, Avatar, Divider } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

const CarbonFootprintScreen = () => {
  // Dati fittizi per i grafici
  const [timeFrame, setTimeFrame] = useState('month'); // 'week', 'month', 'year'
  
  // Dati dell'impronta di carbonio per i diversi periodi di tempo
  const carbonData = {
    week: {
      labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
      datasets: [
        {
          data: [12, 18, 15, 22, 10, 25, 20],
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          strokeWidth: 2
        }
      ],
      total: 122,
      average: 17.4,
      saving: 35
    },
    month: {
      labels: ['Sett 1', 'Sett 2', 'Sett 3', 'Sett 4'],
      datasets: [
        {
          data: [80, 125, 90, 75],
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          strokeWidth: 2
        }
      ],
      total: 370,
      average: 92.5,
      saving: 130
    },
    year: {
      labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
      datasets: [
        {
          data: [350, 380, 320, 290, 275, 240, 210, 230, 250, 270, 310, 330],
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          strokeWidth: 2
        }
      ],
      total: 3455,
      average: 287.9,
      saving: 720
    }
  };

  // Dati fittizi per le categorie di prodotti acquistati
  const categories = [
    { name: 'Alimentari', footprint: 120, percentage: 32 },
    { name: 'Pulizia Casa', footprint: 85, percentage: 23 },
    { name: 'Abbigliamento', footprint: 75, percentage: 20 },
    { name: 'Elettronica', footprint: 55, percentage: 15 },
    { name: 'Altro', footprint: 35, percentage: 10 },
  ];

  // Dati fittizi per i consigli di riduzione
  const tips = [
    { 
      id: 1, 
      title: 'Scegli prodotti locali', 
      description: 'I prodotti locali richiedono meno trasporto e quindi producono meno CO₂.',
      potentialSaving: 35,
      icon: 'map-marker',
      color: '#4CAF50'
    },
    { 
      id: 2, 
      title: 'Preferisci prodotti sfusi', 
      description: 'I prodotti sfusi riducono l\'imballaggio e quindi l\'impronta di carbonio.',
      potentialSaving: 28,
      icon: 'package-variant',
      color: '#8BC34A'
    },
    { 
      id: 3, 
      title: 'Utilizza borse riutilizzabili', 
      description: 'Evita sacchetti di plastica usa e getta per ridurre i rifiuti.',
      potentialSaving: 15,
      icon: 'shopping',
      color: '#CDDC39'
    },
  ];

  // Calcola la larghezza dello schermo per il grafico
  const screenWidth = Dimensions.get('window').width - 30;

  // Configurazione del grafico
  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#4CAF50',
    },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header con titolo */}
      <View style={styles.header}>
        <Title style={styles.headerTitle}>La tua impronta di carbonio</Title>
        <Paragraph style={styles.headerSubtitle}>
          Monitora e riduci la tua impronta di CO₂
        </Paragraph>
      </View>

      {/* Selettore del periodo di tempo */}
      <View style={styles.timeSelector}>
        <Button 
          mode={timeFrame === 'week' ? 'contained' : 'outlined'} 
          onPress={() => setTimeFrame('week')}
          style={styles.timeButton}
          color="#4CAF50"
        >
          Settimana
        </Button>
        <Button 
          mode={timeFrame === 'month' ? 'contained' : 'outlined'} 
          onPress={() => setTimeFrame('month')}
          style={styles.timeButton}
          color="#4CAF50"
        >
          Mese
        </Button>
        <Button 
          mode={timeFrame === 'year' ? 'contained' : 'outlined'} 
          onPress={() => setTimeFrame('year')}
          style={styles.timeButton}
          color="#4CAF50"
        >
          Anno
        </Button>
      </View>

      {/* Grafico dell'impronta di carbonio */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.chartHeader}>
            <Title style={styles.chartTitle}>
              {timeFrame === 'week' ? 'Questa settimana' : 
               timeFrame === 'month' ? 'Questo mese' : 'Quest\'anno'}
            </Title>
            <Chip icon="trending-down" mode="outlined" style={styles.savingChip}>
              -{carbonData[timeFrame].saving} kg
            </Chip>
          </View>
          <LineChart
            data={carbonData[timeFrame]}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{carbonData[timeFrame].total}</Text>
              <Text style={styles.statLabel}>kg CO₂ totali</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{carbonData[timeFrame].average}</Text>
              <Text style={styles.statLabel}>Media</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: '#4CAF50'}]}>
                -{carbonData[timeFrame].saving}
              </Text>
              <Text style={styles.statLabel}>Risparmiati</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Breakdown per categoria */}
      <Card style={styles.card}>
        <Card.Title 
          title="Ripartizione per categoria" 
          subtitle="Dove è concentrata la tua impronta"
          left={(props) => <Avatar.Icon {...props} icon="chart-pie" color="#fff" style={{backgroundColor: '#FF9800'}} />}
        />
        <Card.Content>
          {categories.map((category, index) => (
            <View key={index}>
              <View style={styles.categoryItem}>
                <View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryValue}>{category.footprint} kg CO₂</Text>
                </View>
                <Text style={styles.categoryPercentage}>{category.percentage}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${category.percentage}%`,
                      backgroundColor: index === 0 ? '#4CAF50' : 
                                      index === 1 ? '#8BC34A' : 
                                      index === 2 ? '#CDDC39' : 
                                      index === 3 ? '#FFD54F' : '#FFA000'
                    }
                  ]} 
                />
              </View>
              {index < categories.length - 1 && <Divider style={styles.divider} />}
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Consigli per ridurre l'impronta */}
      <Card style={styles.card}>
        <Card.Title 
          title="Consigli per ridurre" 
          subtitle="Come diminuire la tua impronta di carbonio"
          left={(props) => <Avatar.Icon {...props} icon="lightbulb-on" color="#fff" style={{backgroundColor: '#FFC107'}} />}
        />
        <Card.Content>
          {tips.map((tip) => (
            <Card key={tip.id} style={styles.tipCard}>
              <Card.Content>
                <View style={styles.tipHeader}>
                  <Avatar.Icon size={40} icon={tip.icon} color="#fff" style={{backgroundColor: tip.color}} />
                  <View style={styles.tipTitleContainer}>
                    <Text style={styles.tipTitle}>{tip.title}</Text>
                    <Chip mode="outlined" style={styles.savingTipChip}>
                      Risparmio: {tip.potentialSaving} kg
                    </Chip>
                  </View>
                </View>
                <Paragraph style={styles.tipDescription}>
                  {tip.description}
                </Paragraph>
              </Card.Content>
            </Card>
          ))}
        </Card.Content>
      </Card>
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
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
  },
  headerSubtitle: {
    color: 'white',
    opacity: 0.8,
  },
  timeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  timeButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  card: {
    margin: 10,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 18,
  },
  savingChip: {
    backgroundColor: '#E8F5E9',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryValue: {
    fontSize: 12,
    color: '#757575',
  },
  categoryPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 4,
    marginVertical: 5,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  divider: {
    marginVertical: 10,
  },
  tipCard: {
    marginVertical: 8,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  savingTipChip: {
    alignSelf: 'flex-start',
    height: 24,
  },
  tipDescription: {
    fontSize: 14,
    marginLeft: 50,
  },
});

export default CarbonFootprintScreen; 