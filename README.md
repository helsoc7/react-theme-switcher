# React Grundlagen 6: Theme Switcher
Erstelle eine React Anwendung mit einer Header, Footer und Main Componente. Im Header soll ein Theme Switch vorhanden sein, der das Theme von light auf dark umstellt. Nutze für das Styling Deiner Anwendung Tailwind.

#### Funktionen:
- Schaltfläche zum Umschalten zwischen hellem und dunklem Thema.
- Globale Anwendung des gewählten Themas.
- Es soll jeweils eine Header, Footer und Main Komponente integriert sein.
- Der Footer soll "sticky" sein, sich also immer am Ende der Seite befinden.
- Der Theme Switcher Button soll sein Erscheinungsbild auch ändern.

#### Hinweise:
- Nutze die Context-API, um den Themenzustand über die gesamte Anwendung hinweg verfügbar zu machen.
- Erstelle benutzerdefinierte Hooks (`useTheme`), um das Thema in deinen Komponenten leicht zugänglich zu machen.
- Das Theme soll mit Tailwind erstellt werden, für den Theme Switcher Button benutze Lucide Icons (Sun/Moon)
- Das ausgewählte Thema wird nur im lokalen Zustand gespeichert und bleibt nicht erhalten, wenn du den Browser schließt.
- Die Verwendung von Tailwind CSS sollte konsistent und ästhetisch ansprechend sein.

---
### Schritt 1: Projekt erstellen
Erstelle ein neues React-Projekt mit `npx create-react-app theme-switcher`.
Navigiere in das Projektverzeichnis mit `cd theme-switcher`.
Danach installieren wir die notwendigen Abhängigkeiten mit `npm install tailwindcss lucide-react`. Lucide React ist eine Icon-Bibliothek, die eine Sammlung von SVG-Icons bietet, die sich leicht in React-Anwendungen integrieren lassen. Der Hauptgrund für die Verwendung von Lucide React in diesem Projekt besteht darin, die Sun- und Moon-Icons bereitzustellen, die wir für den Theme-Switcher-Button verwenden. Dann müssen wir natürlich noch die Tailwind-Konfigurationsdatei erstellen, indem wir `npx tailwindcss init` ausführen. 
Dann konfigurieren wir die `tailwind.config.js` Datei:
```
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [],
}

```
Danach erstellen wir in unserem `src`-Ordner eine neue Datei namens `index.css` und fügen folgenden Inhalt ein:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
### Schritt 2: Theme Context erstellen
Erstelle einen neuen Ordner namens `context` im `src`-Ordner und darin eine neue Datei namens `ThemeContext.js`. Füge folgenden Inhalt ein:
```
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'light' : 'dark'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```
Wir erstellen mit ThemeContext einen neuen Kontext. Dieser wird verwendet, um Werte wie das aktuelle Theme und die Funktion zum Umschalten des Themes über die gesamte Anwendung hinweg verfügbar zu machen. Mit `ThemeProvider` wird der Kontext bereitgestellt und das aktuelle Thema verwaltet. Die `toggleTheme`-Funktion wird verwendet, um zwischen den Themen zu wechseln. const [theme, setTheme] = useState('light');: Dies definiert einen State-Hook, der das aktuelle Thema speichert. Der Standardwert ist 'light'. Mit `useTheme` wird der Kontext in den Komponenten verwendet, um das aktuelle Thema und die Funktion zum Umschalten des Themas abzurufen. export const useTheme = () => useContext(ThemeContext);: Dies ist ein benutzerdefinierter Hook namens useTheme. Er ermöglicht es jeder Komponente, die diesen Hook aufruft, auf den ThemeContext zuzugreifen und somit das aktuelle Thema (theme) und die Funktion zum Umschalten des Themas (toggleTheme) zu nutzen.

### Schritt 3: Header, Footer und Main Komponenten erstellen
Erstelle einen neuen Ordner namens `components` im `src`-Ordner und darin drei Dateien: `Header.js`, `Footer.js` und `Main.js`. Füge folgenden Inhalt in die Dateien ein:
`Header.js`:
```
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-gray-200 dark:bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Theme Switcher App</h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
      >
        {theme === 'light' ? <Sun className="text-yellow-500" /> : <Moon className="text-white" />}
      </button>
    </header>
  );
};

export default Header;
```
Das ist ein normaler Header. Auffällig ist aber der `useTheme`-Hook, der das aktuelle Theme und die Funktion zum Umschalten des Themes abruft. Der Theme-Switcher-Button wird mit einem Sun- oder Moon-Icon angezeigt, je nachdem, ob das aktuelle Thema 'light' oder 'dark' ist. Der Button wird mit einer Hintergrundfarbe versehen, die sich je nach Theme ändert.
`Footer.js`:
```
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 p-4 text-center">
      <p>© 2024 Theme Switcher App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
```
Das ist ein normaler Footer. Er wird am unteren Rand der Seite angezeigt und enthält den Copyright-Text.
`Main.js`:
```
import React from 'react';

const Main = () => {
  return (
    <main className="flex-grow p-4">
      <h2 className="text-2xl">Welcome to the Theme Switcher App</h2>
      <p>Use the button in the header to toggle between light and dark themes.</p>
    </main>
  );
};

export default Main;
```
Das ist die Hauptkomponente. Sie enthält eine Überschrift und eine kurze Beschreibung der Anwendung. Hier wird aber auch nicht der Theme-Switcher-Button angezeigt. Dieser befindet sich im Header.
### Schritt 4: App-Komponente erstellen
In der `App.js`-Datei fügen wir folgenden Inhalt ein:
```
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Main />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
```
Hier verwenden wir dann für die gesamte Anwendung einen ThemeProvider. Dieser umschließt quasi unsere App. 



