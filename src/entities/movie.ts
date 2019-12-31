import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('movie')
export class Movie {

  @PrimaryColumn( { name: 'id'})
  id: number;

  @Column( { name: 'title', nullable: false })
  title: string;

  @Column( { name: 'description' })
  description: string;

  @Column( { name: 'release_date' })
  releaseDate: string;

  @Column({name: 'created_by', nullable: false})
  createdBy: string;

  @Column({name: 'created_date', nullable: false})
  createdDate: Date;

  @Column({name: 'updated_by', nullable: false})
  updatedBy: string;

  @Column({name: 'updated_date', nullable: true})
  updatedDate: Date;
}
