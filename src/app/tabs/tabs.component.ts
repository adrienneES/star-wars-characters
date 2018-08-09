import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../star-wars-service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  characters = [];
  chosenList = 'all';
  swService : StarWarsService
  constructor(swService: StarWarsService) {
    this.swService = swService;
   }

  ngOnInit() {
  }

  getCharacters ( ){
    // const swService = new StarWarsService();
    const characters = this.swService.getCharacters(this.chosenList);
    return characters;
  }
  onChoose(side) {
    this.chosenList = side;
    let charList = this.characters.filter((char)=>{
      return char.side === this.chosenList;
    });
  }
}
