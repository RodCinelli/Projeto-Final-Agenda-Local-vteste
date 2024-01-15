import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { getStorage, ref, listAll, Storage, getDownloadURL } from '@angular/fire/storage';
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  produtos: any = [];

  constructor(private storage: Storage, private firestore: Firestore) {}

  ngOnInit() {
    this.listarBanco();
  }

  async listarBanco() {
    const querySnapshot = await getDocs(collection(this.firestore, "Produtos"));
    this.produtos = []; // Limpa a lista de produtos antes de adicionar os novos
    querySnapshot.forEach((doc) => {
      // Converte 'preco' para um número
      const precoNumerico = parseFloat(doc.data()['preco'].replace(/[^0-9.,]/g, '').replace(',', '.'));

      // Adiciona o produto ao array, já com o preço convertido
      this.produtos.push({
        nome: doc.data()['nome'],
        descricao: doc.data()['descricao'],
        preco: isNaN(precoNumerico) ? 0 : precoNumerico, // Se não for um número válido, usa 0 como fallback
        qtd: doc.data()['qtd'],
        image: doc.data()['image']
      });
    });
  }
}