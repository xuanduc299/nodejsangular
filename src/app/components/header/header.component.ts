import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ["./header.component.scss"],
})

export class HeaderComponent implements OnInit {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  isAuthenticated = false;
  @Input()
  get cart(): Cart {
    return this._cart;
  }

  constructor(private cartService: CartService, private localStorageService: LocalStorageService,
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Kiểm tra nếu có dữ liệu giỏ hàng trong localStorage, nạp nó vào biến this._cart.
    const storedCart = this.localStorageService.get('cart');
    if (storedCart) {
      this.cart = storedCart;
    }

    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    });
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }


  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
    this.localStorageService.remove('cart');
  }

  logout(): void {
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["login"]);
  }
}
