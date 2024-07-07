import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { SimulationComponent } from './simulation.component';
import { SimulationService } from '../simulation.service';

describe('SimulationComponent', () => {
  let component: SimulationComponent;
  let fixture: ComponentFixture<SimulationComponent>;
  let simulationService: SimulationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimulationComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [SimulationService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationComponent);
    component = fixture.componentInstance;
    simulationService = TestBed.inject(SimulationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should simulate game on form submission', () => {
    const mockResults = {
      numberOfWinsWithoutChanging: 5,
      numberOfWinsWithChanging: 7
    };

    spyOn(simulationService, 'simulateGame').and.returnValue(of(mockResults));

    component.numberOfSimulations = 100;
    component.changeDoor = true;
    component.onSubmit();

    expect(simulationService.simulateGame).toHaveBeenCalledWith({
      numberOfSimulations: 100,
      changeDoor: true
    });

    expect(component.results).toEqual(mockResults);
  });
});

