import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerComponent } from '../spinner/spinner.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  overlayRef: OverlayRef = this.overlay.create({
    positionStrategy: this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically(),
    hasBackdrop: true,
    backdropClass: 'cdk-overlay-dark-backdrop',
  });

  constructor(private overlay: Overlay) {}

  show(): void {
    this.hide();
    this.overlayRef.attach(new ComponentPortal(SpinnerComponent));
  }

  hide(): void {
    this.overlayRef.detach();
  }
}
