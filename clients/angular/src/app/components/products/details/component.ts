import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'products-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './component.html',
})
export class ProductDetails {
  @Input({ required: true }) product!: Product;

  @Output() like = new EventEmitter<string>();

  onLike() {
    console.log('Like clicked for product ID:', this.product.id);
    this.like.emit(this.product.id);
  }
}
