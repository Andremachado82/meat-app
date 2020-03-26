class Order {
  constructor(
    public address: string,
    public number: Number,
    public optionalAddress: string,
    public paymentOption: string,
    public orderItems: OrderItem[] = [],
    public id?: string

  ) { }
}

class OrderItem {
  constructor(public quantity: number, public menuId: string) { }
}

export { Order, OrderItem }
