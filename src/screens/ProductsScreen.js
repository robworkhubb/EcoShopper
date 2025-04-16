import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Searchbar, Chip, Card, Title, Paragraph, Text, Avatar, Divider, Button, ActivityIndicator } from 'react-native-paper';

const ProductsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Dati fittizi per i filtri disponibili
  const filterCategories = [
    {
      name: 'Categorie',
      filters: ['Alimentari', 'Pulizia', 'Cura personale', 'Abbigliamento', 'Casa']
    },
    {
      name: 'Eco-Score',
      filters: ['A+', 'A', 'B', 'C']
    },
    {
      name: 'Caratteristiche',
      filters: ['Biologico', 'Vegan', 'Cruelty-free', 'Commercio equo', 'Plastic-free', 'Biodegradabile']
    }
  ];

  // Dati fittizi per i prodotti eco-friendly
  const products = [
    {
      id: 1,
      name: 'Detersivo eco Lavastoviglie',
      brand: 'EcoClean',
      description: 'Detersivo ecologico per lavastoviglie con ingredienti biodegradabili',
      ecoScore: 'A+',
      price: '5,90',
      categories: ['Pulizia'],
      features: ['Biologico', 'Biodegradabile', 'Plastic-free'],
      carbonFootprint: 1.2,
      image: null // In un'app reale, qui ci sarebbe un'immagine
    },
    {
      id: 2,
      name: 'Shampoo Solido',
      brand: 'NaturEco',
      description: 'Shampoo solido senza plastica per tutti i tipi di capelli',
      ecoScore: 'A',
      price: '8,50',
      categories: ['Cura personale'],
      features: ['Vegan', 'Cruelty-free', 'Plastic-free'],
      carbonFootprint: 0.9,
      image: null
    },
    {
      id: 3,
      name: 'T-shirt in Cotone Biologico',
      brand: 'GreenWear',
      description: 'T-shirt in cotone biologico certificato, tinture naturali',
      ecoScore: 'A',
      price: '25,00',
      categories: ['Abbigliamento'],
      features: ['Biologico', 'Commercio equo'],
      carbonFootprint: 3.4,
      image: null
    },
    {
      id: 4,
      name: 'Pasta Integrale Biologica',
      brand: 'BioFood',
      description: 'Pasta integrale da grano biologico italiano',
      ecoScore: 'A+',
      price: '2,80',
      categories: ['Alimentari'],
      features: ['Biologico', 'Vegan'],
      carbonFootprint: 0.7,
      image: null
    },
    {
      id: 5,
      name: 'Set Posate Bambù',
      brand: 'EcoLiving',
      description: 'Set di posate in bambù riutilizzabili e biodegradabili',
      ecoScore: 'A+',
      price: '9,99',
      categories: ['Casa'],
      features: ['Biodegradabile', 'Plastic-free'],
      carbonFootprint: 0.5,
      image: null
    },
    {
      id: 6,
      name: 'Sapone Mani Ecologico',
      brand: 'PureNature',
      description: 'Sapone per le mani con ingredienti naturali e packaging riciclabile',
      ecoScore: 'B',
      price: '4,50',
      categories: ['Cura personale'],
      features: ['Cruelty-free', 'Biodegradabile'],
      carbonFootprint: 1.8,
      image: null
    },
  ];

  // Gestisce la logica di filtro dei prodotti
  const getFilteredProducts = () => {
    if (activeFilters.length === 0 && searchQuery === '') {
      return products;
    }

    return products.filter(product => {
      // Filtra in base alla ricerca testuale
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Se non corrisponde alla ricerca, escludi il prodotto
      if (!matchesSearch) return false;

      // Se non ci sono filtri attivi, includi il prodotto
      if (activeFilters.length === 0) return true;

      // Verifica se il prodotto corrisponde a tutti i filtri attivi
      const productProperties = [
        ...product.categories,
        product.ecoScore,
        ...product.features
      ];

      // Un prodotto viene mostrato se corrisponde ad almeno uno dei filtri attivi
      return activeFilters.some(filter => productProperties.includes(filter));
    });
  };

  // Gestisce l'aggiunta/rimozione di un filtro
  const toggleFilter = (filter) => {
    setIsLoading(true);
    
    // Simula un ritardo di caricamento per dare l'impressione di una ricerca reale
    setTimeout(() => {
      if (activeFilters.includes(filter)) {
        setActiveFilters(activeFilters.filter(f => f !== filter));
      } else {
        setActiveFilters([...activeFilters, filter]);
      }
      setIsLoading(false);
    }, 300);
  };

  // Simula la visualizzazione dei dettagli di un prodotto
  const viewProductDetails = (product) => {
    console.log('Visualizza dettagli del prodotto:', product.id);
    // In un'app reale, qui ci sarebbe la navigazione alla schermata di dettaglio
  };

  const filteredProducts = getFilteredProducts();

  return (
    <View style={styles.container}>
      {/* Barra di ricerca */}
      <Searchbar
        placeholder="Cerca prodotti sostenibili..."
        onChangeText={query => {
          setSearchQuery(query);
          setIsLoading(true);
          // Simula un ritardo per la ricerca
          setTimeout(() => setIsLoading(false), 300);
        }}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      {/* Filtri principali */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScrollView}
        contentContainerStyle={styles.filtersContainer}
      >
        {/* Chip per visualizzare tutti i filtri */}
        <Chip 
          icon={showMoreFilters ? "chevron-up" : "tune"} 
          onPress={() => setShowMoreFilters(!showMoreFilters)}
          style={styles.filterChip}
          selected={showMoreFilters}
        >
          {showMoreFilters ? "Meno filtri" : "Filtri"}
        </Chip>
        
        {/* Filtri applicati */}
        {activeFilters.length > 0 && (
          <Chip 
            icon="close" 
            onPress={() => {
              setActiveFilters([]);
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 300);
            }}
            style={styles.clearFilterChip}
          >
            Cancella filtri
          </Chip>
        )}
        
        {/* Mostra solo alcuni filtri popolari nella barra orizzontale */}
        {!showMoreFilters && (
          <>
            <Chip 
              onPress={() => toggleFilter('Biologico')} 
              selected={activeFilters.includes('Biologico')}
              style={styles.filterChip}
            >
              Biologico
            </Chip>
            <Chip 
              onPress={() => toggleFilter('Vegan')} 
              selected={activeFilters.includes('Vegan')}
              style={styles.filterChip}
            >
              Vegan
            </Chip>
            <Chip 
              onPress={() => toggleFilter('Plastic-free')} 
              selected={activeFilters.includes('Plastic-free')}
              style={styles.filterChip}
            >
              Senza plastica
            </Chip>
            <Chip 
              onPress={() => toggleFilter('A+')} 
              selected={activeFilters.includes('A+')}
              style={styles.filterChip}
            >
              Eco-Score: A+
            </Chip>
          </>
        )}
      </ScrollView>
      
      {/* Pannello filtri esteso */}
      {showMoreFilters && (
        <View style={styles.expandedFiltersContainer}>
          {filterCategories.map((category, index) => (
            <View key={index}>
              <Text style={styles.filterCategoryTitle}>{category.name}</Text>
              <View style={styles.filtersGroup}>
                {category.filters.map((filter, filterIndex) => (
                  <Chip
                    key={filterIndex}
                    onPress={() => toggleFilter(filter)}
                    selected={activeFilters.includes(filter)}
                    style={styles.filterChip}
                    mode="outlined"
                  >
                    {filter}
                  </Chip>
                ))}
              </View>
              {index < filterCategories.length - 1 && <Divider style={styles.divider} />}
            </View>
          ))}
        </View>
      )}
      
      {/* Indicatore di caricamento */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Ricerca prodotti...</Text>
        </View>
      ) : (
        <>
          {/* Risultati della ricerca */}
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>{filteredProducts.length} prodotti trovati</Text>
          </View>
          
          {/* Lista dei prodotti */}
          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <Card style={styles.productCard} onPress={() => viewProductDetails(item)}>
                <Card.Content>
                  <View style={styles.productHeader}>
                    <View style={styles.productTitleContainer}>
                      <Title style={styles.productTitle}>{item.name}</Title>
                      <Text style={styles.productBrand}>{item.brand}</Text>
                    </View>
                    <Chip style={[styles.ecoScoreChip, {
                      backgroundColor: 
                        item.ecoScore === 'A+' ? '#C8E6C9' : 
                        item.ecoScore === 'A' ? '#E8F5E9' : 
                        item.ecoScore === 'B' ? '#FFF9C4' : '#FFECB3'
                    }]}>
                      {item.ecoScore}
                    </Chip>
                  </View>
                  
                  <Paragraph style={styles.productDescription}>{item.description}</Paragraph>
                  
                  <View style={styles.featuresContainer}>
                    {item.features.slice(0, 3).map((feature, index) => (
                      <Chip 
                        key={index} 
                        style={styles.featureChip} 
                        mode="outlined"
                        selected={activeFilters.includes(feature)}
                        onPress={() => toggleFilter(feature)}
                      >
                        {feature}
                      </Chip>
                    ))}
                    
                    {/* Se ci sono più di 3 caratteristiche, mostra un +X */}
                    {item.features.length > 3 && (
                      <Chip 
                        style={styles.featureChip} 
                        mode="outlined"
                      >
                        +{item.features.length - 3}
                      </Chip>
                    )}
                  </View>
                  
                  <View style={styles.productFooter}>
                    <View style={styles.carbonFootprint}>
                      <Avatar.Icon
                        size={24}
                        icon="molecule-co2"
                        color="#757575"
                        style={{ backgroundColor: 'transparent' }}
                      />
                      <Text style={styles.carbonText}>{item.carbonFootprint} kg CO₂</Text>
                    </View>
                    <Text style={styles.priceText}>{item.price} €</Text>
                  </View>
                </Card.Content>
              </Card>
            )}
            contentContainerStyle={styles.productsList}
          />
          
          {/* Se non ci sono risultati */}
          {filteredProducts.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Avatar.Icon
                size={60}
                icon="alert-circle-outline"
                color="#757575"
                style={{ backgroundColor: 'transparent' }}
              />
              <Text style={styles.noResultsText}>Nessun prodotto trovato</Text>
              <Text style={styles.noResultsSubtext}>Prova a modificare i filtri o i termini di ricerca</Text>
              <Button 
                mode="contained" 
                onPress={() => {
                  setSearchQuery('');
                  setActiveFilters([]);
                }}
                style={styles.resetButton}
              >
                Reset ricerca
              </Button>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchBar: {
    margin: 10,
    elevation: 2,
  },
  filtersScrollView: {
    maxHeight: 60,
  },
  filtersContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  clearFilterChip: {
    marginRight: 8,
    backgroundColor: '#FFCDD2',
  },
  expandedFiltersContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterCategoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  filtersGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  divider: {
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#757575',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  resultsCount: {
    fontSize: 14,
    color: '#757575',
  },
  productsList: {
    padding: 10,
  },
  productCard: {
    marginBottom: 10,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productTitleContainer: {
    flex: 1,
    marginRight: 10,
  },
  productTitle: {
    fontSize: 16,
  },
  productBrand: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 5,
  },
  ecoScoreChip: {
    height: 26,
  },
  productDescription: {
    fontSize: 14,
    marginVertical: 8,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  featureChip: {
    marginRight: 6,
    marginBottom: 6,
    height: 28,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  carbonFootprint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carbonText: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#757575',
    marginTop: 5,
    textAlign: 'center',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
  },
});

export default ProductsScreen; 