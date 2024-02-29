import { BooksEntity } from '../entities/books.entity';

export class ListBookModel {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  title: string;
  description: string;
  isbn: string;
  page_count: number;
  price: number;
  author_name: any;
  publisher_name: any;
  categories: string[];

  constructor(entity: BooksEntity) {
    this.id = entity.secure_id;
    this.title = entity.title;
    this.description = entity.description;
    this.isbn = entity.isbn;
    this.page_count = entity.pageCount;
    this.price = entity.price;
    this.author_name = entity.author.name;
    this.publisher_name = entity.publisher.name;
    this.categories = entity.categories
      ? entity.categories.map((category) => category.name)
      : [];
    this.created_at = entity.created_at;
    this.updated_at = entity.updated_at;
    this.deleted_at = entity.deleted_at;
  }
}
