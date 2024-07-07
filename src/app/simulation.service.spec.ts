import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SimulationService } from './simulation.service';

describe('SimulationService', () => {
  let service: SimulationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SimulationService]
    });
    service = TestBed.inject(SimulationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should simulate game correctly', () => {
    const mockParams = {
      numberOfSimulations: 100,
      changeDoor: true
    };

    const mockResults = {
      numberOfWinsWithoutChanging: 5,
      numberOfWinsWithChanging: 7
    };

    service.simulateGame(mockParams).subscribe(results => {
      expect(results).toEqual(mockResults);
    });

    const req = httpMock.expectOne('http://localhost:5098/Simulation/simulate');
    expect(req.request.method).toBe('POST');
    req.flush(mockResults);
  });

  // Add more tests as needed for error handling, edge cases, etc.
});

