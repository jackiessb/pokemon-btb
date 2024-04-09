import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appInitNav]'
})
export class InitNavDirective {
  constructor(private button: ElementRef<HTMLLIElement>) { }

  ngAfterViewInit() {
    let buttonId = this.button.nativeElement.id;
    
    if (buttonId == "page1") {
      this.button.nativeElement.className += "page-item active";
    }
  }
}
