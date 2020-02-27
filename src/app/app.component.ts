import { Component, SimpleChanges, OnChanges, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'Point of Sales';
  @ViewChild('quantity', {static: false}) quantityInput; 
  public products: Item[] = [{name: "Reebok", price: 640},
                              {name: "Nike", price: 875},
                              {name: "Specter", price: 640},
                              {name: "Jordan", price: 875},
                              {name: "Adidas", price: 640},
                              {name: "Puma", price: 875},
                              {name: "Maxxa", price: 640},
                              {name: "Durabs", price: 875},
                              {name: "Perfomx", price: 640},
                              {name: "Flight", price: 875}];

  public filteredItems: Item[] = this.products;
  public sales: Sale[] = [/* {id:1, quantity: 24, item: {name: "Apples",price: 12 }},
  {id:2, quantity: 18, item: {name: "Oranges",price: 16 }} */];

  public total;

  constructor(){
    this.calculateTotal();
   }

   calculateTotal(){
     if(this.sales.length == 0){
      this.total = 0;
     }else{
      let prices = this.sales.map(s => s.quantity * s.item.price);
      let accumulatePrices = (a,b) =>  a + b;
      this.total = prices.reduce(accumulatePrices);
     }
   }

   filterProducts(){
     let matchByName = (p) => this.sales.find(s => s.item.name == p.name) == undefined;
    this.filteredItems = this.products.filter(matchByName);
  }

   ngOnChanges(changes: SimpleChanges){
     
   }

   add(productId, quantity){
     console.log(productId + " " + quantity);
    this.sales.push({id: (this.sales.length + 1),quantity, item: this.filteredItems[productId]});
    this.calculateTotal();
    this.filterProducts();
    this.quantityInput.value = '';
   }

   onItemRemoved(productId){
    let index = this.sales.findIndex(s => {
      return s.id == productId;
    });
     this.sales.splice(index, 1);
     this.calculateTotal();
     this.filterProducts();
   }

   onQuantityUpdate(event){
     console.log("Event hath emitted");
    console.log(event)
      let index = this.sales.findIndex(s => {
        return s.id == event.id
      });
      this.sales[index].quantity = event.quantity;
      this.calculateTotal();
   }

   cash(){
     alert("Please pay "+ this.total);
   }
}

interface Sale{
  quantity: number;
  item: Item;
  id: number;
}

interface Item{
  name: string;
  price: number;
}
