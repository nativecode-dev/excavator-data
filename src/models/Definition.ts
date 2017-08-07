import { Column, HasMany, Table, Unique } from 'sequelize-typescript'
import { DefinitionValue } from './DefinitionValue'
import { Model } from './Model'

@Table
export class Definition extends Model<Definition> {
  @Column
  public description: string

  @Unique
  @Column
  public name: string

  @HasMany(() => DefinitionValue)
  public values: DefinitionValue[]

  protected typename(): string {
    return 'Definition'
  }
}
