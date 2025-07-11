# Документация по взаимодействию с Rick and Morty API

**Базовый URL:**  
https://rickandmortyapi.com/api


## 1. Обзор

Rick and Morty API — это бесплатное RESTful API, предоставляющее информацию о персонажах, локациях и эпизодах из мультсериала **«Рик и Морти»**.

> ❗ API не требует авторизации или ключа API.

---

## 2. Работа эндпоинтом с `/character`

### Получить список персонажей

**GET** `/character`

#### Параметры запроса:

| Параметр | Тип     | Описание                                  |
|----------|---------|-------------------------------------------|
| `name`   | string  | Имя персонажа                             |
| `status` | string  | `alive`, `dead`, `unknown`                |
| `species`| string  | `Human`, `Alien`, `Humanoid`, `Animal`, `Robot`, `Cronenberg`, `Mythology`, `Disease`, `Unknown`                             |
| `gender` | string  | `female`, `male`, `genderless`, `unknown`|
| `page`   | integer | Номер страницы (пагинация)                |

#### Пример запроса:
```
GET https://rickandmortyapi.com/api/character?name=rick&status=alive
```

#### Пример ответа:
```json
{
  "info": {
    "count": 107,
    "pages": 6,
    "next": "https://rickandmortyapi.com/api/character?page=2",
    "prev": null
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "gender": "Male",
      "origin": {
        "name": "Earth (C-137)",
        "url": "https://rickandmortyapi.com/api/location/1"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      "episode": [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2"
      ]
    }
  ]
}
```

### Получить персонажа по ID
GET /character/{id}

Пример:
```
GET https://rickandmortyapi.com/api/character/2
```

#### Пример ответа:
```json
{
  "id": 2,
  "name": "Morty Smith",
  "status": "Alive",
  "species": "Human",
  "type": "",
  "gender": "Male",
  "origin": {
    "name": "Earth (C-137)",
    "url": "https://rickandmortyapi.com/api/location/1"
  },
  "location": {
    "name": "Citadel of Ricks",
    "url": "https://rickandmortyapi.com/api/location/3"
  },
  "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  "episode": [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
    "https://rickandmortyapi.com/api/episode/3",
    "https://rickandmortyapi.com/api/episode/4"
    // и так далее
  ],
  "url": "https://rickandmortyapi.com/api/character/2",
  "created": "2017-11-04T18:50:21.651Z"
}

```