import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html',
})

export class FooterComponent {
    @Input() public name: string;
    @Input() public version: string;
    public test = new Date();
}
