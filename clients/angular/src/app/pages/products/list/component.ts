import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../services/product-service';
import { ProductDetails } from '../../../components/products/details/component';
import { injectQueryClient } from '@ngneat/query';

@Component({
  selector: 'products-list',
  standalone: true,
  imports: [CommonModule, ProductDetails],
  templateUrl: './component.html',
})
export class ListProductsComponent {
  service = inject(ProductsService);
  client = injectQueryClient();

  products = this.service.getAll().result;

  likeProduct(id: string) {
    this.service.like(id).subscribe({
      next: () => {
        console.log('Like enviado correctamente');
        this.client.invalidateQueries({ queryKey: ['products'] });
      },
      error: (err) => console.error('Error al hacer like', err),
    });
  }
}
