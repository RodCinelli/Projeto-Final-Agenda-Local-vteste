import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { getStorage, ref, listAll, Storage, getDownloadURL } from '@angular/fire/storage';
@Component({
  selector: 'app-edit-produtos',
  templateUrl: './edit-produtos.page.html',
  styleUrls: ['./edit-produtos.page.scss'],
})
export class EditProdutosPage implements OnInit {
  isToastOpen = false;
  produtos: any = []
  isModalOpen = false;
  produto={
    id:'',
    nome:'',
    descricao:'',
    preco:'',
    qtd:'',
    image:''
  }
  constructor(private storage: Storage, private firestore: Firestore) { }
  ngOnInit() {
    this.listarBanco()
  }
  async listarBanco() {
    const querySnapshot = await getDocs(collection(this.firestore, "Produtos"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()['nome']}`);
      this.produtos = [...this.produtos, { id: doc.id, nome: doc.data()['nome'], descricao: doc.data()['descricao'], preco: doc.data()['preco'], qtd: doc.data()['qtd'], image: doc.data()['image'] }]
    });
  }

  mensagem(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async EditarItem(isOpen: boolean, id: string) {
    await deleteDoc(doc(this.firestore, "Produtos", id));
    this.mensagem(isOpen)
    setTimeout(() => {
      this.produtos = []
      this.listarBanco()
    }, 2000);
  }

  CarregaProdutos(isOpen: boolean,id: any, nome: any, descricao: any, preco: any, qtd: any, image:any){
    this.isModalOpen = isOpen;
    this.produto.nome=nome
    this.produto.descricao=descricao
    this.produto.preco=preco
    this.produto.qtd=qtd
    this.produto.image=image   
  }

  EditarProduto(nomeProduto:any, descProduto:any, precoProduto:any, qtdProduto:any) {
    console.log('produto Editado')
  }

}








