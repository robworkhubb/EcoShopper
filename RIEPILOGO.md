# EcoShopper - Riepilogo del Progetto

## Panoramica
EcoShopper è un'applicazione mobile che aiuta gli utenti a fare scelte di acquisto più sostenibili. Fornisce funzionalità per scansionare i codici a barre dei prodotti, ottenere valutazioni sulla sostenibilità, suggerire alternative eco-friendly e tenere traccia dell'impronta di carbonio.

## Struttura del Progetto

### File principali
- `index.js` - Punto di ingresso dell'applicazione
- `app.json` - Configurazione dell'app
- `package.json` - Gestione delle dipendenze e script
- `src/App.js` - Componente principale dell'app con navigazione

### Schermate
- `HomeScreen.js` - Schermata principale con riassunto delle attività dell'utente
- `ScannerScreen.js` - Scanner dei codici a barre dei prodotti
- `ProductsScreen.js` - Catalogo di prodotti eco-friendly con filtri di ricerca
- `CarbonFootprintScreen.js` - Tracciamento dell'impronta di carbonio
- `ChallengesScreen.js` - Sfide sostenibili per incentivare comportamenti eco-friendly
- `ProfileScreen.js` - Profilo utente con preferenze e statistiche

## Funzionalità Principali

### 1. Scanner di Codici a Barre
Consente agli utenti di scansionare i prodotti durante lo shopping per ottenere informazioni sulla sostenibilità in tempo reale. La schermata mostra:
- Valutazione eco-score del prodotto
- Impronta di carbonio
- Informazioni sul packaging
- Ingredienti
- Alternative più sostenibili

### 2. Catalogo Prodotti Eco-Friendly
Presenta un database di prodotti sostenibili che possono essere:
- Filtrati per categoria, caratteristiche o eco-score
- Cercati per nome o marchio
- Visualizzati con dettagli sulla sostenibilità

### 3. Tracciamento dell'Impronta di Carbonio
Offre una visualizzazione dell'impatto ambientale degli acquisti dell'utente con:
- Grafici per diversi periodi (settimana, mese, anno)
- Ripartizione per categoria di prodotti
- Consigli per ridurre l'impronta di carbonio

### 4. Sfide Sostenibili
Motiva gli utenti con sfide che incoraggiano comportamenti eco-friendly:
- Sfide attive con monitoraggio del progresso
- Sfide disponibili da intraprendere 
- Sfide completate con ricompense
- Sistema di punti e riconoscimenti

### 5. Profilo Personalizzato
Consente agli utenti di:
- Impostare preferenze per prodotti sostenibili (es. vegan, biologico, plastic-free)
- Visualizzare statistiche personali e medaglie
- Gestire impostazioni dell'app

## Requisiti Tecnici e Dipendenze
L'applicazione è costruita con:
- React Native / Expo - Framework per lo sviluppo mobile cross-platform
- React Navigation - Per la navigazione tra le schermate
- React Native Paper - Componenti UI material design
- Expo Barcode Scanner - Per la funzionalità di scansione

## Installazione

Per installare e avviare l'applicazione:

```bash
# Clona il repository
git clone https://github.com/robworkhubb/EcoShopper.git

# Naviga nella directory del progetto
cd EcoShopper

# Installa le dipendenze
npm install

# Avvia l'applicazione
npm start
```

## Modello di Monetizzazione
L'app implementa un modello di business basato su:
- Abbonamento Premium con analisi avanzate e funzionalità esclusive
- Partnership con marchi eco-friendly per promuovere i loro prodotti

## Prossimi Passi
- Implementare un backend reale per archiviare dati utente e prodotti
- Sviluppare un'API per la scansione dei codici a barre reali
- Aggiungere autenticazione e gestione degli account
- Integrare con piattaforme di e-commerce per acquisti diretti
- Implementare funzionalità sociali per condividere risultati e sfide 