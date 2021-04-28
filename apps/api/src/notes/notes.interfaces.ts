import { ITag } from '../tags/tags.interface';

export interface INote {
  id: string;
  title: string;
  content: string;
  tags: ITag[];
}
