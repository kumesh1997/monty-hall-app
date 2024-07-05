import { Component } from '@angular/core';
import { SimulationService } from '../simulation.service';

interface SimulationResults {
  numberOfWinsWithoutChanging: number;
  numberOfWinsWithChanging: number;
}

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent {
  //Properties
  numberOfSimulations!: number;
  changeDoor: boolean = true;
  results!: SimulationResults;

  constructor(private simulationService: SimulationService) {}

  onSubmit() {
    const params = {
      numberOfSimulations: this.numberOfSimulations,
      changeDoor: this.changeDoor
    };

    this.simulationService.simulateGame(params).subscribe(
      (results: SimulationResults) => {
        this.results = results;
      },
      (error) => {
        console.error('Error during simulation:', error);
      }
    );
  }
}
