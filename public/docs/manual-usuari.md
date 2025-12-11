# Manual d'Usuari - ComandesJSDR v0.5.0

ComandesJSDR és una aplicació web per a la gestió de comandes i productes. Permet als usuaris consultar el catàleg de productes, realitzar comandes i fer-ne el seguiment.

**Rols d'usuari:**
- **Usuari:** Pot veure productes, fer comandes i consultar les seves pròpies comandes
- **Administrador:** A més, pot gestionar productes, usuaris i veure estadístiques globals

## Índex de Contingut

1. [Login (Inici de Sessió)](#1-login-inici-de-sessió)
2. [Logout (Tancar Sessió)](#2-logout-tancar-sessió)
3. [Interfície Principal](#3-interfície-principal)
4. [Dashboard (Panell de Control)](#4-dashboard-panell-de-control)
5. [Productes](#5-productes)
6. [Gestió de Comandes](#6-gestió-de-comandes)
7. [Gestió de Productes](#7-gestió-de-productes-només-administrador) *(Administrador)*
8. [Gestió d'Usuaris](#8-gestió-dusuaris-només-administrador) *(Administrador)*
9. [Quant a (Informació del Projecte)](#9-quant-a-informació-del-projecte)
10. [Manual d'Usuari](#10-manual-dusuari)
11. [Notificacions](#11-notificacions)
12. [Consells d'Us](#12-consells-dus)

---

## 1. Login (Inici de Sessió)

### 1.1 Accedir a l'Aplicació

1. Obre l'aplicació al navegador
2. Veuràs la pantalla d'inici de sessió
3. Introdueix el teu nom d'usuari
4. Introdueix la teva contrasenya
5. Fes clic a "Entrar"

Si les credencials són correctes, seràs redirigit al Dashboard.

> **Nota:** Si oblidés la contrasenya, contacta amb l'administrador del sistema.

### 1.2 Credencials de Prova

Per a proves de desenvolupament:
- **Administrador:** `administrador` / `ComandesJSDR`
- **Usuari:** `usuari` / `ComandesJSDR`

[⬆️ Tornar a l'índex](#índex-de-contingut)

---

## 2. Logout (Tancar Sessió)

### 2.1 Tancar la Sessió

1. Fes clic al botó vermell "Sortir" a la capçalera superior (cantonada superior dreta)
2. Seràs redirigit automàticament a la pantalla d'inici de sessió
3. El carret es buida automàticament
4. La teva sessió es tancar de forma segura

[⬆️ Tornar a l'índex](#índex-de-contingut)

---

## 3. Interfície Principal

Un cop iniciada la sessió, l'aplicació es divideix en aquests elements principals:

### 3.1 Capçalera (Header)

La barra superior conté:
- **Logo** a l'esquerra: Enllaç al Dashboard
- **Nom d'usuari i Rol** al centre: Mostra qui ha iniciat sessió (ex: "usuari (User)" o "administrador (Administrator)")
- **Botó Sortir** a la dreta: Tanca la sessió (botó vermell)

### 3.2 Menú Lateral (Sidebar)

El menú de l'esquerra mostra les opcions disponibles segons el teu rol:

**Per a tots els usuaris:**
- 📊 **Dashboard** - Panell de control amb estadístiques
- 📦 **Productes** - Catàleg de productes disponibles
- 📋 **Gestió Comandes** - Llistat i seguiment de comandes

**Només per a administradors:**
- ⚙️ **Gestió Productes** - Gestió de productes
- 👥 **Gestió Usuaris** - Gestió d'usuaris

**A la part inferior del Sidebar:**
- Versió de l'aplicació: `© 2025 ComandesJSDR vX.X.X` (clicable per veure informació del projecte)
- Botó **Manual d'usuari** per accedir a aquest manual

### 3.3 Carret de Compra (Cart)

El carret es mostra als panells on es compren productes:

**Ubicació:** Panel desmuntable a la dreta quan consultes productes

**Contingut:**
- Llista de productes afegits amb:
  - Nom del producte
  - Preu unitari
  - Quantitat seleccionada
  - Total per línia (preu × quantitat)
- **Total general** de la comanda
- Botó **Realitzar comanda** per procedir amb la compra

**Accions al carret:**
- ➕ Augmentar quantitat d'un producte
- ➖ Reduir quantitat d'un producte
- 🗑️ Eliminar producte del carret

> **Nota:** El carret es buida automàticament quan tanques sessió.

[⬆️ Tornar a l'índex](#índex-de-contingut)

---

## 4. Dashboard (Panell de Control)

El Dashboard mostra un resum de l'activitat:

### Per a tots els usuaris:

#### Resum de Comandes
Taula amb el nombre de comandes per estat:
- Esborrany
- Pendent d'aprovació
- Aprovada
- En procés
- Enviada
- Finalitzada
- Cancel·lada

#### Gràfica de Comandes Mensuals
- Gràfic circular amb les comandes dels últims 12 mesos
- Mostra quantitat i import total per mes

### Només per a administradors:

#### Panell de Productes:
- **Novetats:** Últims 5 productes afegits
- **Últims Stocks:** Productes amb estoc baix (1-10 unitats)
- **Sobre Petició:** Productes sense estoc

[⬆️ Tornar a l'índex](#índex-de-contingut)

---

## 5. Productes

### 5.1 Veure Productes

1. Fes clic a "Productes" al menú
2. Veuràs una graella amb tots els productes disponibles

Cada targeta de producte mostra:
- Nom del producte
- Descripció
- Preu (en verd)
- Estoc disponible
- Estat (Actiu/Inactiu)

### 5.2 Cercar Productes

- Utilitza la barra de cerca a la part superior
- Escriu el nom del producte que busques
- La llista es filtra automàticament

### 5.3 Afegir Productes al Carret

1. Troba el producte desitjat
2. Fes clic al botó "Afegir"
3. S'obrirà el panell del carret a la dreta
4. El producte s'afegeix amb quantitat 1

> **Nota:** Els productes inactius o sense estoc no es poden afegir.

### 5.4 Gestionar el Carret

El panell del carret mostra:
- Llista de productes afegits
- Preu unitari × Quantitat
- Total per línia

**Accions disponibles:**
- **+** : Augmentar quantitat
- **-** : Reduir quantitat
- **🗑️** : Eliminar producte del carret

### 5.5 Realitzar una Comanda

1. Revisa els productes del carret
2. Verifica el Total a la part inferior
3. Fes clic a "Realitzar comanda"
4. Apareixerà un missatge de confirmació amb el número de comanda
5. El carret es buida automàticament

[⬆️ Tornar a l'índex](#índex-de-contingut)

---

## 6. Gestió de Comandes

### 6.1 Veure les teves Comandes

1. Fes clic a "Gestió Comandes" al menú
2. Veuràs una taula amb totes les teves comandes

**Columnes:**

| Columna | Descripció                               |
|---------|------------------------------------------|
| Número  | Identificador únic (ex: COM-2025-000001) |
| Data    | Data de creació                          |
| Total   | Import total de la comanda               |
| Estat   | Estat actual (amb color)                 |
| XML     | Botó per descarregar                     |

### 6.2 Cercar i Filtrar

- **Cerca:** Escriu el número de comanda
- **Filtre per estat:** Selecciona un estat del desplegable
- **Netejar filtres:** Elimina tots els filtres aplicats

### 6.3 Veure Detalls d'una Comanda

1. Fes clic sobre una fila de la taula
2. S'expandirà mostrant les línies de la comanda:
   - Producte
   - Quantitat
   - Total per línia

### 6.4 Descarregar XML

1. Fes clic al botó "⬇️ XML" de la comanda
2. Es descarregarà un fitxer `comanda-NUMERO.xml`
3. Format estàndard UBL per a facturació electrònica

### 6.5 Estats de les Comandes

| Color      | Estat             | Significat         |
|------------|-------------------|--------------------|
| ⚪ Gris     | Esborrany         | Comanda no enviada |
| 🟡 Groc    | Pendent aprovació | Esperant revisió   |
| 🔵 Blau    | Aprovada          | Comanda acceptada  |
| 🟣 Lila    | En procés         | En preparació      |
| 🔵 Indi    | Enviada           | Enviada al client  |
| 🟢 Verd    | Finalitzada       | Completada         |
| 🔴 Vermell | Cancel·lada       | Anul·lada          |

[⬆️ Tornar a l'índex](#índex-de-contingut)

---

## 7. Gestió de Productes (només administrador)

### 7.1 Accedir a la Gestió

1. Fes clic a "Gestió Productes" al menú

### 7.2 Crear un Nou Producte

1. Fes clic al botó verd "Afegir producte"
2. Omple el formulari:
   - Nom (obligatori)
   - Descripció
   - Preu (obligatori, > 0)
   - Estoc (obligatori, >= 0)
   - Categoria
   - Actiu (checkbox)
3. Fes clic a "Afegir"

### 7.3 Editar un Producte

1. Troba el producte a la taula
2. Fes clic a la icona 📝 (Editar)

### 7.4 Eliminar un Producte

1. Fes clic a la icona 🗑️ (Eliminar)
2. Confirma l'acció al diàleg
3. El producte serà eliminat

[⬆️ Tornar a l'índex](#índex-de-contingut)

---

## 8. Gestió d'Usuaris (només administrador)

### 8.1 Accedir a la Gestió

1. Fes clic a "Gestió Usuaris" al menú

### 8.2 Crear un Nou Usuari

1. Omple el formulari superior:
   - Nom d'usuari (obligatori)
   - Contrasenya (obligatori)
   - Rol: User o Administrator
2. Fes clic a "Crear"

### 8.3 Editar un Usuari

1. Fes clic a 📝 al costat de l'usuari
2. El formulari es carrega amb les dades
3. Modifica el Rol si cal
4. Per canviar contrasenya: introdueix la nova
5. Fes clic a "Actualitzar"

> **Nota:** El nom d'usuari no es pot modificar.

### 8.4 Eliminar un Usuari

1. Fes clic a 🗑️ al costat de l'usuari
2. Confirma l'eliminació

> **Important:** No pots eliminar el teu propi usuari.

[⬆️ Tornar a l'índex](#índex-de-contingut)

---

## 9. Quant a (Informació del Projecte)

Des de qualsevol pantalla de l'aplicació, pots accedir a informació sobre el projecte:

**Des del Sidebar (menú lateral):**
1. Fes clic al text "© 2025 ComandesJSDR vX.X.X" a la part inferior del sidebar
2. S'obrirà una finestra emergent amb:
   - Informació del projecte
   - Equip de desenvolupament i seus rols
   - Informació acadèmica
   - Versió de l'aplicació
   - Versió i data del backend
   - Enllaç al repositori GitHub

**Des de la Pantalla de Login:**
1. A la part inferior de la caixa de login
2. Fes clic a "Informació del projecte"
3. Es mostrarà la mateixa finestra emergent amb la informació del projecte

[⬆️ Tornar a l'índex](#índex-de-contingut)

---

## 10. Manual d'Usuari

### 10.1 Obrir el Manual

**Des del Sidebar (menú lateral):**
1. Fes clic al botó "Manual d'usuari" a la part inferior
2. S'obrirà una finestra emergent amb el manual complet

**Des de la Pantalla de Login:**
1. A la part inferior de la caixa de login
2. Fes clic a "Manual d'usuari"
3. Es mostrarà el manual en mode lectura

### 10.2 Descarregar el Manual en PDF

Dins de la finestra emergent del Manual:
1. Fes clic al botó blau "⬇️ Descarregar PDF" a la capçalera
2. Es descarregarà un fitxer `Manual-Usuari-ComandesJSDR-vX.X.X.pdf`
3. El fitxer inclou la versió de l'aplicació en el nom

### 10.3 Navegar pel Manual

- Pots fer scroll dins de la finestra emergent per veure tot el contingut
- El manual està formatat amb:
  - Títols i subtítols
  - Llistes numeradas i de punts
  - Taules de referència
  - Notes destacades amb color
- Tancar la finestra emergent: Fes clic a la "X" de la cantonada superior dreta

[⬆️ Tornar a l'índex](#índex-de-contingut)

---

## 11. Notificacions

L'aplicació mostra missatges emergents (Toast) per informar-te de:

| Color      | Tipus      | Exemple                       |
|------------|------------|-------------------------------|
| 🟢 Verd    | Èxit       | "Comanda creada correctament" |
| 🔴 Vermell | Error      | "Error al crear el producte"  |
| 🔵 Blau    | Informació | "Sessió expirada"             |

Els missatges es tanquen automàticament després de 4 segons o pots fer clic a la X.

[⬆️ Tornar a l'índex](#índex-de-contingut)

---

## 12. Consells d'Us

- Actualitza la pàgina si veus dades desactualitzades
- Revisa l'estoc abans d'afegir productes al carret
- Descarrega els XMLs per tenir còpia de les comandes
- Contacta l'administrador si necessites canviar de rol o recuperar contrasenya
- Comprova l'estat de les comandes regularment per no perdre'n el seguiment
- Els productes sense estoc no es poden afegir al carret fins que es reposin

[⬆️ Tornar a l'índex](#índex-de-contingut)