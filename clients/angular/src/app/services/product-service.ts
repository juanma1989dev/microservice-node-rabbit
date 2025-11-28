import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectQuery } from '@ngneat/query';
import { map } from 'rxjs';
import { Product } from '../models/product.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getAll() {
    return this.#query({
      queryKey: ['products'],
      queryFn: () =>
        this.#http
          .get<ApiResponse<Product[]>>('http://localhost:8001/api/products')
          .pipe(map((res) => res.data)),
    });
  }

  getOne(id: string) {
    return this.#query({
      queryKey: ['product', id],
      queryFn: () =>
        this.#http
          .get<ApiResponse<Product>>(`http://localhost:8001/api/products/${id}`)
          .pipe(map((res) => res.data)),
    });
  }

  like(id: string) {
    return this.#http
      .post<ApiResponse<null>>(`http://localhost:8001/api/products/${id}/like`, {})
      .pipe(map((res) => res.data));
  }
}
