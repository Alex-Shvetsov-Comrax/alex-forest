import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  TemplateRef,
  Type,
  ViewRef,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  public setTemplate<T>(component: Type<T>): {
    componentRef: ComponentRef<T>;
    viewRef: ViewRef;
  } {
    return (() => {
      const factory =
        this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = factory.create(this.injector);
      const viewRef = componentRef.hostView;
      return { componentRef, viewRef };
    })();
  }


}
