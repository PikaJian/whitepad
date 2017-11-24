import grapes from './classification';
export interface SchemaMap {
    id: string,
    label: string,
    sample: any,
    show?: boolean,
    type?: string,
    options?: string[],
    align?: string
}

export const schema : SchemaMap[] = [
  {
    id: 'primary_key',
    label: 'PrimaryKey',
    type: 'key',
    sample: 6678,
  },
  {
    id: 'name',
    label: 'Name',
    show: true,
    sample: '$2 chunk',
    align: 'left',
  },
  {
    id: 'year',
    label: 'Year',
    type: 'year',
    show: true,
    sample: 2015,
  },
  {
    id: 'grape',
    label: 'Grape',
    type: 'suggest',
    options: grapes,
    show: true,
    sample: 'Merlot',
  },
  {
    id: 'rating',
    label: 'Rating',
    type: 'rating',
    show: true,
    sample: 3,
  },
  {
    id: 'comments',
    label: 'Comments',
    type: 'text',
    sample: 'Nice for the price',
  },
]