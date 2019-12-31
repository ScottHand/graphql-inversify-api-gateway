### Prerequisites

- Docker Desktop to run MySQL database locally in a container

### Installation


    $ npm install
    
### Run project locally


The following command will initiate two tmux sessions: 1) the database in a docker container, and 2) the api.

    $ npm run offline
    
The database docker container will initiate a flyway migration to create the tables used by the application and seed the tables with mock data
    
To terminate the application:

    Ctrl+a k
    
 For additional tmux commands:
 
     Ctrl+a ?
     
     
### Movie Service Schema

     type Movie {
         id: Int!,
         title: String!,
         description: String,
         releaseDate: Date,
         createdBy: String,
         updatedBy: String,
         createdDate: Date,
         updatedDate: Date,
     }
     
     type Query {
         movie(id: Int): Movie
         movies: [Movie]
     }

### Get Movies

Graphql Query

     query {
       movies {
         id
         title
         description
         releaseDate
       }
     }
     
 Output Example:
 
      {
        "data": {
          "movies": [
            {
              "id": 1,
              "title": "Star Wars: Episode IX - The Rise of Skywalker",
              "description": "After Palpatine mysteriously returns, the Resistance faces the First Order once more in the final chapter of the Skywalker saga.",
              "releaseDate": "2019-12-20T05:00:00.000Z"
            },
            {
              "id": 2,
              "title": "Frozen II",
              "description": "Anna, Elsa, Kristoff, Olaf and Sven leave Arendelle to travel to an ancient, autumn-bound forest of an enchanted land. They set out to find the origin of Elsa's powers in order to save their kingdom.",
              "releaseDate": "2019-11-22T05:00:00.000Z"
            },
            {
              "id": 3,
              "title": "Forrest Gump",
              "description": "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.",
              "releaseDate": "1994-07-06T04:00:00.000Z"
            }
          ]
        }
      }
