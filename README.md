# Movies API ![Status badge](https://img.shields.io/badge/status-in%20progress-yellow)

API de una aplicación de videos

## Instalación

1. Clona este repositorio.

```bash
git clone https://github.com/Carlos-Angel/movies-api.git
```

2. Ve a la carpeta del proyecto `movies-api`

```bash
cd movies-api
```

3. Copia los archivos `.env.example` que se encuentran en las carpetas `server-api` y `ssr-server` y cambia el nombre del archivo por `.env`

```bash
cp server-api/.env.example server-api/.env
cp server-api/.env.example ssr-server/.env

```

4. Crear las variables de entorno definidas dentro de los archivos `.env`.

5. Instala las dependencias del **server-api** y **ssr-server** ejecutando el siguiente comando

```bash
npm install
```

5. Corre el ambiente local de ambos servers ejecutando el siguiente comando

```bash
npm run dev
```

## License

The MIT License (MIT)
