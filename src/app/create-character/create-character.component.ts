import { Component, OnInit } from '@angular/core';
import {StarWarsService} from '../star-wars-service';
@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  availableSides = [
    {display: 'None', value:''},
    {display: 'Light', value:'light'},
    {display: 'Dark', value:'dark'}]
    private swService: StarWarsService;
  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit() {
  }
  onSubmit(submittedForm) {
    if (submittedForm.invalid) {
      return console.log('cannot submit - form invalid');
    }
    console.log('adding character - create', submittedForm.value.name);
    let character = {name: submittedForm.value.name, side: submittedForm.value.side};
    this.swService.addCharacter(character);
  }

}
