import "reflect-metadata";
import { Entity, ObjectIdColumn, Column, Index } from "typeorm";

@Entity()
export class Product {
  @ObjectIdColumn()
  id: string;

  @Index({ unique: true }) // Así se define unique en Mongo
  @Column()
  admin_id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  likes: number = 0; // valor por defecto
}
