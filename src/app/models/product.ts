export class Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  constructor(data: Product) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.imageUrl = data.imageUrl;
  }
}
