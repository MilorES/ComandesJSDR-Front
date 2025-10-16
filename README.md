# FRONT ComandesJSDR
ComandesJSDR és una plataforma centralitza la gestió de comandes, automatitzant processos que normalment són manuals. Gràcies a XML-UBL, permet interoperabilitat amb altres sistemes i compliment normatiu sense complicacions.

# Desenvolupament

Requereix Node.js version 20.19+ o 22.12+.

```shell
# Des de l'arrel del repo
npm install
npm run dev
```

# Desplegament
Aquest repositori inclou un `docker-compose.yml`.

Requereix Docker y Docker Compose.

```shell
# Des de l'arrel del repo
docker compose up --build -d

# Veure logs
docker compose logs -f

# Aturar i eliminar contenidors
docker compose down
```
