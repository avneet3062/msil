import { Component, OnInit, Renderer, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
    @ViewChild('app-navbar-cmp') button;
    @Output() year: EventEmitter<string> = new EventEmitter(null);
    @Input() selectedYear: string;
    @Input() yearList: string[];
    yearList1 = ['2018', '2019', '2020', '2021'];
    constructor(location: Location, private renderer: Renderer, private router: Router, private element: ElementRef) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }
    getTitle() {
        let titlee = window.location.pathname;
        titlee = titlee.substring(1);
        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
    sidebarToggle() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];

        if (this.sidebarVisible === false) {
            setTimeout(() => {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }

    yearChange(year) {
        // this.year.emit(year);
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['login']);
    }
}
