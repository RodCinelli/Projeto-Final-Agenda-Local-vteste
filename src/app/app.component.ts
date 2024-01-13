import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'home' },
    { title: 'Produtos', url: '/produtos', icon: 'bag-handle' },
    { title: 'Promoções', url: '/folder/promocoes', icon: 'pricetags' },
    { title: 'Lojas', url: '/folder/lojas', icon: 'storefront' },
    { title: 'Perfil', url: '/folder/perfil', icon: 'person-circle' },
    { title: 'Contato', url: '/folder/contato', icon: 'call' },
  ];

  public adminPages = [
    { title: 'Cadastrar Produtos', url: '/cad-produtos', icon: 'bag-add' },
    { title: 'Editar Produtos', url: '/edit-produtos', icon: 'create' },
    { title: 'Deletar Produtos', url: '/delete-produtos', icon: 'trash' },
  ];
  constructor() {}
}
