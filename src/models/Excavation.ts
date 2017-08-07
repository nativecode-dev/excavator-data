import { Column, ForeignKey, IsUrl, Table } from 'sequelize-typescript'
import { Excavator } from './Excavator'
import { Model } from './Model'

@Table
export class Excavation extends Model<Excavation> {
  @ForeignKey(() => Excavator)
  @Column
  public excavatorId: number

  @IsUrl
  @Column
  public url: string

  protected typename(): string {
    return 'Excavation'
  }
}
