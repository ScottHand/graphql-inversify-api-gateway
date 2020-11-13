This is a code sample of an API Gateway with Lambda integration that is written in Node.js using Typescript and implements the following: 
- [Graphql Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [TypeORM](https://typeorm.io/#/)
- [Inversify IoC container](http://inversify.io/)
- [Serverless framework](https://www.serverless.com/)
- [Flyway](https://flywaydb.org/)

The primary purpose of this sample is to demonstrate a repeatable OO design approach in terms of a recommended code structure, 
design patterns that could be used, and a sample unit testing strategy the demonstrates how to mock TypeORM.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) to run MySQL database locally in a container
- [Serverless Framework](https://serverless.com)

        $ npm install -g serverless
- [Node.js](https://nodejs.org/en/) v10.13.0

        # using node version manager
        $ nvm install 10.13.0
        $ nvm use 10.13.0
        
        # OR using brew
        $ brew unlink node
        $ brew install node@10.13.0
        $ brew link node@10.13.0
 
 - [Typescript](https://www.typescriptlang.org/)
 
        $ npm install -g typescript
 

### Installation
To install all the local dependencies required for this application, run the following command from the root of the project:

    $ npm install
    
### Run project (locally)
This project is designed to **only run locally** so that the focus remains on the OO design and implementations aforementioned and has not been instrumented to deploy to an AWS Account.  

Use the following procedures to run the application locally:

1. Start Docker Desktop
2. Open a terminal window and run the following command to start the MySQL database in a Docker container. 
The database Docker container will initiate a flyway migration to create the schema and tables used by the application and seed the tables with sample data.

        $ npm run db
        
3. Open a **second** terminal window and run the following command to start the API on localhost:3000.

        $ npm run localhost
        
4. Run the following cURL command to execute the `movies` query

        $ curl \
            -X POST \
            -H "Content-Type: application/json" \
            --data '{ "query": "{movies {id title description releaseDate} }" }' \
            http://localhost:3000/LOCAL/movie

Alternatively, execute the following command to initiate two side-by-side tmux sessions.  One containing the MySQL database 
and the second running the API application.

    $ npm run offline
    
To terminate the application while in tmux mode:

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

#### Get Movies

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

#### Get Movie By Id

Graphql Query

     query {
       movie(id: 1) {
         id
         title
         description
         releaseDate
       }
     }
     
 Output Example:
 
      {
        "data": {
          "movie": {
            "id": 1,
            "title": "Star Wars: Episode IX - The Rise of Skywalker",
            "description": "After Palpatine mysteriously returns, the Resistance faces the First Order once more in the final chapter of the Skywalker saga.",
            "releaseDate": "2019-12-20T05:00:00.000Z"
          }
        }
      }