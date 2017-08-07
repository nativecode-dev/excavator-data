import { Column, IBuildOptions, Table, Unique } from 'sequelize-typescript'
import { Model } from './Model'

@Table
export class Definition extends Model<Definition> {
  @Column
  public description: string

  @Unique
  @Column
  public name: string

  protected typename(): string {
    return this.name
  }
}
