export interface TodosType {
  id: number;
  title: string;
  description: string;
  budget: string;
  tags: Tag[];
  deadline: string;
  status?: string;
}

export interface Tag {
  color: string;
  label: string;
}
