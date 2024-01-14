import { Injectable } from '@angular/core';
import { IUser } from '../components/editable-table/editable-table.types';
import { ColumnConfig, BaseColumnService } from '../app.types';

@Injectable()
export class UsersColumnsService implements BaseColumnService {
  private columns: ColumnConfig[] = [
    {
      columnName: 'ID пользователя',
      columnDef: '_id',
      cell: (data: IUser) => data._id,
      isVisible: true,
    },
    {
      columnName: 'Активен',
      columnDef: 'isActive',
      cell: (data: IUser) => (data.isActive ? 'Да' : 'Нет'),
      isVisible: true,
    },
    {
      columnName: 'Баланс счета',
      columnDef: 'balance',
      cell: (data: IUser) => data.balance,
      isVisible: true,
    },
    {
      columnName: 'Изображение профиля',
      columnDef: 'picture',
      cell: (data: IUser) => data.picture,
      isVisible: true,
    },
    {
      columnName: 'Возраст',
      columnDef: 'age',
      cell: (data: IUser) => data.age,
      isVisible: true,
    },
    {
      columnName: 'Полное имя',
      columnDef: 'name',
      cell: (data: IUser) => [data.name?.last, data.name?.first].join(' '),
      isVisible: true,
    },
    {
      columnName: 'Компания',
      columnDef: 'company',
      cell: (data: IUser) => data.company,
      isVisible: true,
    },
    {
      columnName: 'Email',
      columnDef: 'email',
      cell: (data: IUser) => data.email,
      isVisible: true,
    },
    {
      columnName: 'Адрес',
      columnDef: 'address',
      cell: (data: IUser) => data.address,
      isVisible: true,
    },
    {
      columnName: 'Теги',
      columnDef: 'tag',
      cell: (data: IUser) => data.tags[0],
      isVisible: true,
    },
    {
      columnName: 'Любимый фрукт',
      columnDef: 'favoriteFruit',
      cell: (data: IUser) => data.favoriteFruit,
      isVisible: true,
    },
  ];

  public getColumns() {
    return this.columns;
  }
}
