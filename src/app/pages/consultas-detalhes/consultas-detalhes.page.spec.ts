import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultasDetalhesPage } from './consultas-detalhes.page';

describe('ConsultasDetalhesPage', () => {
  let component: ConsultasDetalhesPage;
  let fixture: ComponentFixture<ConsultasDetalhesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConsultasDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
