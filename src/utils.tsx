export interface ICart {
  id: string
  items: int
}

export class Cart implements ICart {
  constructor() {
    this.items = 0
  }
}
