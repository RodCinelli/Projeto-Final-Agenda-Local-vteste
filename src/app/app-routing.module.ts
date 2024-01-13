import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },  {
    path: 'produtos',
    loadChildren: () => import('./Pages/produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'cad-produtos',
    loadChildren: () => import('./Pages/cad-produtos/cad-produtos.module').then( m => m.CadProdutosPageModule)
  },
  {
    path: 'edit-produtos',
    loadChildren: () => import('./Pages/edit-produtos/edit-produtos.module').then( m => m.EditProdutosPageModule)
  },
  {
    path: 'delete-produtos',
    loadChildren: () => import('./Pages/delete-produtos/delete-produtos.module').then( m => m.DeleteProdutosPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
