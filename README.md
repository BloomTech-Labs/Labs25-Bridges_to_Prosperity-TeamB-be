# 1️⃣ Bridge of Prosperity Backend

1️⃣ You can find the deployed project at https://bridges-b-api.herokuapp.com/

## 4️⃣ Contributors

|                                          [Cody Solomon](https://github.com/CodyFlys)                                          |                                                            [Robert Misch](https://github.com/RobertMisch)                                                            |                                                           [Xavier Hoskins](https://github.com/xavierhoskins)                                                           |
| :---------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    [<img src="https://avatars2.githubusercontent.com/u/60758834?s=460&u=e9fd1bd445778f124a4107689c839b624a4ad217&v=4" width = "200" />](https://github.com/CodyFlys)     | [<img src="https://avatars0.githubusercontent.com/u/24370208?s=400&v=4" width = "200" />](https://github.com/RobertMisch) | [<img src="https://avatars1.githubusercontent.com/u/59076433?s=460&u=7d6b6c0d420aec9596603733d2760b4912015f9d&v=4" width = "200" />](https://github.com/xavierhoskins) |
|                     [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/CodyFlys)                     |                                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/RobertMisch)                                       |                                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/xavierhoskins)                                       |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/robert-misch/) |                    [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/cody-solomon/)                     |                    [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/xavier-hoskins/)                     |

<br>
<br>

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Project Overview

1️⃣ [Trello Board] https://trello.com/b/x1iIzJdj/labs25bridgesjessica

#### [Back end] https://bridges-b-api.herokuapp.com/built using:

# APIs

# 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

```
DS_API_URL=
DS_API_TOKEN=
DATABASE_URL=
OKTA_URL_ISSUER=
```

# 4️⃣ Installation Instructions

- run: `npm install` to download all dependencies.
- run: `cp .env.sample .env` and update the enviornment variables to match your local setup.
- run: `npm run knex migrate:latest` to create the starting schema.
- run: `npm run knex seed:run` to populate your db with some data.
- run: `npm run tests` to confirm all is setup and tests pass.
- run: `npm run watch:dev` to start nodemon in local dev enviornment.

> Make sure to update the details of the app name, description and version in
> the `package.json` and `config/jsdoc.js` files.

<br/>

## API Documentation

<br/>

### Bridges Endpoints

<br/>
GET REQUEST TO:

https://bridges-b-api.herokuapp.com/data/bridges

Returns:

```
{
"id": 1,
"b2p_bridge_id": null,
"country": "Rwanda",
"province": "Western Province",
"district": "Rusizi",
"sector": "Giheke",
"cell": "Gakomeye",
"project_code": 1014107,
"project_stage": "Completed",
"sub_stage": null,
"bridge_type": "Suspended",
"span": "8 Meters",
"lat": -2.42056,
"long": 28.9662,
"communities_served": [
{
"id": 1,
"name": "Buzi"
}
```

<br/>

GET REQUEST TO:

https://bridges-b-api.herokuapp.com/bridges/communities/:id

Returns:

```
{
"id": 1,
"name": "Buzi"
}
```

<br/>

### Query Bridges Endpoints

<br/>

GET REQUEST TO:

https://bridges-b-api.herokuapp.com/bridges/status?project_stage=what

### Instructions:<br/>

Replace 'what' in the url above with whatever status/stage type you are filtering by.

### Returns:

All bridge sites with the status/stage you queried.
