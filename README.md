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
