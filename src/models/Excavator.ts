import { Column, HasMany, Table, Unique } from 'sequelize-typescript'
import { ExcavatorMapping } from './ExcavatorMapping'
import { Model } from './Model'

@Table
export class Excavator extends Model<Excavator> {
  @Column
  public description: string

  @HasMany(() => ExcavatorMapping)
  public excavatorMappings: ExcavatorMapping[]

  @Unique
  @Column
  public name: string

  protected typename(): string {
    return 'Excavator'
  }
}
