import { Component, OnInit, Input} from '@angular/core';
import { StarWarsService } from '../star-wars-service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() character;
  @Input() number;
  swService : StarWarsService
  constructor(swService: StarWarsService) {
    this.swService = swService;
   }

  ngOnInit() {
  }

  onAssign(side) {
//    console.log(side);
//     this.character.side = side;
    // better practice to change back to tabs component
    let obj = {name: this.character.name, side};
    // const swService = new StarWarsService();
    this.swService.onSideChosen(obj);
//    this.sideAssigned.emit(obj);
  }
  getColor () {
    let color = '';
    switch (this.character.side) {
      case '':
        color = 'white';
        break;
        case 'dark':
        color = 'pink';
        break;
        case 'light':
        color = 'lightBlue';
        break;
      default:
        break;
    }
    return color;
  }
}
