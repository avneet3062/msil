import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-footer-cmp',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss']
})

export class FooterComponent {
    test: Date = new Date();
}
