import { Admin } from './../../admin';
import { Client } from './../client';
import { Adresse } from './../adresse';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    let admin : Admin = {
    nom : 'doe',
    prenom : 'john',
    imgPath : 'https://kylebrycegd.files.wordpress.com/2015/12/unknown-8.jpg'
  };

    let clients: Client[] = [
      {
        id: 1, nom: 'Pitt', prenom: 'Brad', description: 'brad pitt est connu pour avoir joué dans le Seven au côté de Morgan Freeman, sa carrière n\'a fait que grandir',
        imgPath: 'http://www.actu-maroc.com/wp-content/uploads/2016/11/brad-pitt_980x571.jpg',
        telephone: '0102030405', email: 'bradp@gmail.com', genre: 'homme',
        adresse: {
    rue: "24 Rue de la Johardière",
    zipcode: "44800",
    ville: "Saint-Herblain",
    pays: "France",
    latitude: 47.22714149999999,
    longitude: -1.6509673000000475
  }
      },
      {
        id: 2, nom: 'Damon', prenom: 'Matt', description: 'Surtout connu pour son rôle de Jason Bourne, il a fait derrière de très bon films tel que les Infiltrés au côté de son alter égo Leonardo Dicaprio',
        imgPath: 'http://cdn.cnsnews.com/matt_damon2.jpg',
        telephone: '0102030405', email: 'mattd@gmail.com', genre: 'homme',
        adresse: {
    rue: "29 Avenue Jean Jaurès",
    zipcode: "75019",
    ville: "Paris",
    pays: "France",
    latitude: 48.88389129999999,
    longitude: 2.3735090999999784
  }
      },
      {
        id: 3, nom: 'Dicaprio', prenom: 'Leonardo', description: 'Tout le monde connaît le film qui l\'a fait naître au grand jour: titanic, puis s\'en est suivi une liste de films énormes à son actif tel que Inception pour n\'en citer qu\'un' ,
        imgPath: 'http://www.telegraph.co.uk/content/dam/film/the%20revenant/leo-head-xlarge.jpg',
        telephone: '0102030405', email: 'leonardo@gmail.com', genre: 'homme',
         adresse: {
    rue: "3 Promenade des Anglais",
    zipcode: "06200",
    ville: "Nice",
    pays: "France",
    latitude: 43.6952444,
    longitude: 7.265125000000012
  }
      },
      {
        id: 4, nom: 'Jackman', prenom: 'Hugh', description: 'Surtout connu pour son rôle de wolverine dans les films Marvel, depuis ils ne font qu\'un',
        imgPath: 'http://media.ellentv.com/2013/09/10/091613-hugh-jackman-blog-1200x630.jpg',
        telephone: '0102030405', email: 'hughj@gmail.com', genre: 'homme',
        adresse: {
    rue: "25 Rue de la Caravelle",
    zipcode: "31500",
    ville: "Toulouse",
    pays: "France",
    latitude: 43.6163245,
    longitude: 1.462073299999929
  }
      },
      {
        id: 5, nom: 'Pratt', prenom: 'Chris', description: 'Connu dans la série comique Parks and Recreation, il voit le jour sur le grand écran à l\'occasion du film Marvel les gardiens de la galaxie',
        imgPath: 'http://fr.web.img6.acsta.net/videothumbnails/16/07/15/13/01/107080.jpg',
        telephone: '0102030405', email: 'chrisp@gmail.com', genre: 'homme',
        adresse: {
    rue: "2 Avenue des Champs-Élysées",
    zipcode: "75008",
    ville: "Paris-8E-Arrondissement",
    pays: "France",
    latitude: 48.8665906,
    longitude: 2.317465200000015
  }
      }

    ];
    return { clients };
  }

}
