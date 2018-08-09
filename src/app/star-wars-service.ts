import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Subject } from "rxjs";
import 'rxjs/add/operator/map';
import { LogService } from "./log.service";

@Injectable()
export class StarWarsService {
  private characters = [
    // {name: 'Luke Skywalker', side:''},
    // {name: 'Darth Vader', side:''},
  ];

  private logService: LogService;
  charactersChanged = new Subject<void>();
  http: Http;

  constructor(logService: LogService, http: Http) {
    this.logService = logService;
    this.http = http;
  }

  fetchCharacters() {
    this.http.get('https://swapi.co/api/people/')
    .map((response: Response)=>{
      const extractedChars = response.json()
        .results.map((char)=>{
        return {name: char.name, side : ''}
      });
      return extractedChars;
    })
    .subscribe((data) => {
      console.log(data);
      this.characters = data;
      this.charactersChanged.next();
    })
  }
  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((char)=>{
      return char.side === chosenList;
    })
  };
  onSideChosen(charInfo) {
    const pos = this.characters.findIndex((char)=>{
      return char.name === charInfo.name;
    });
    this.characters[pos].side = charInfo.side;
    this.logService.writeLog(`character ${charInfo.name} changed to side ${charInfo.side}`)
    this.charactersChanged.next();
  };
  addCharacter (character) {
    console.log('add character', character)
    const pos = this.characters.findIndex((char)=>{
      return char.name === character.name;
    });
    if (pos !== -1) {
      console.log('cant add - already there');
      return;
    }
    this.characters.push(character);
    console.log('list', this.characters);
  }
}
