export interface Picture {
  src: string;
  caption: string;
}

export interface Group {
  label: string;
  pictures: Picture[];
}