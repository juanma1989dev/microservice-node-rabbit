import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../services/product-service';

@Component({
  selector: 'products-edit',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './component.html',
})
export class EditProductComponent {
  route = inject(ActivatedRoute);

  id = this.route.snapshot.paramMap.get('id');

  product = inject(ProductsService).getOne(this.id!).result;
}
