import { Entity, ObjectId, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  title: string;

  @Column("varchar")
  image: string;

  @Column("int", { default: 0 })
  likes: number;
}
