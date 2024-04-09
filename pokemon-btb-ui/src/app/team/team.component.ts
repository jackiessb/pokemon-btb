import { Component } from '@angular/core';
import { Pokemon } from 'pokenode-ts';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass']
})
export class TeamComponent {
  slots: Pokemon[] = [];
}
