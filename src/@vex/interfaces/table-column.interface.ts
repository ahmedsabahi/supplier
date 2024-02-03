export interface TableColumn<T> {
  label: string;
  property: string;
  type:
    | 'text'
    | 'image'
    | 'badge'
    | 'progress'
    | 'checkbox'
    | 'button'
    | 'number'
    | 'date';

  visible?: boolean;
  cssClasses?: string[];
}
