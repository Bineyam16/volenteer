import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent {
  constructor(private modalService: NgbModal,
    private router: Router
  ) {
  }
  imageUrl = '../assets/images/avatar3.jpg';
  imageUrl2 = '../assets/images/avatar1.png';
  imageUrl3 = '../assets/images/avatar2.png';
  goToBack() {
    this.router.navigate(['']);
  }
}
