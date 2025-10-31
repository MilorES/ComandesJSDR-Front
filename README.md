# FRONT ComandesJSDR
ComandesJSDR és una plataforma centralitza la gestió de comandes, automatitzant processos que normalment són manuals. Gràcies a XML-UBL, permet interoperabilitat amb altres sistemes i compliment normatiu sense complicacions.

# Configuració inicial

- Requereix Node.js version 20.19+ o 22.12+.

```shell
# Crear els fitxers si no existeixen
cp .env.example .env
cp .env.example .env.production
# Edita .env amb els teus valors
```
No pujar el `.env` ni  `.env.production` al repo. 

# Desenvolupament

```shell
# Instal·la dependències i executa
npm install
npm run dev
```

# Desplegament
Aquest repositori inclou un `docker-compose.yml`.

Requereix Docker y Docker Compose.

```shell
# Compilar i executar
docker compose up --build -d

# Veure logs
docker compose logs -f

# Aturar i eliminar contenidors
docker compose down

#PERILLOS: Començar desde zero (elimina volumns)
docker compose down -v
```
