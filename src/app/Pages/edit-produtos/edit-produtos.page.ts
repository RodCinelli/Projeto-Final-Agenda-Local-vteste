import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { ref, Storage, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-produtos',
  templateUrl: './edit-produtos.page.html',
  styleUrls: ['./edit-produtos.page.scss'],
})
export class EditProdutosPage implements OnInit {
  productName: string;
  productDescript: string;
  preco: number;
  Qtd: number;
  image: File; // Adiciona a propriedade 'image'
  produto: any = {}; // Adiciona a propriedade 'produto'

  constructor(private storage: Storage, private firestore: Firestore) { }

  ngOnInit() {
    this.listarBanco();
  }

  handleFileInput(files: FileList) {
    this.image = files.item(0);
  }

  async listarBanco() {
    const querySnapshot = await getDocs(collection(this.firestore, "Produtos"));
    this.produtos = [];
    querySnapshot.forEach((doc) => {
      this.produtos.push({
        id: doc.id,
        nome: doc.data()['nome'],
        descricao: doc.data()['descricao'],
        preco: doc.data()['preco'],
        qtd: doc.data()['qtd'],
        image: doc.data()['image']
      });
    });
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  CarregaProdutos(isOpen: boolean, id: any, nome: any, descricao: any, preco: any, qtd: any, image: any) {
    this.isModalOpen = isOpen;
    this.produto.nome = nome
    this.produto.descricao = descricao
    this.produto.preco = preco
    this.produto.qtd = qtd
    this.produto.image = image
  }

  async EditarProduto(id: string, nomeProduto: string, descProduto: string, precoProduto: number, qtdProduto: string, image: File) {
    try {
      // Faz o upload da imagem para o Firebase Storage
      const storageRef = ref(this.storage, 'produtos/' + image.name);
      const uploadTask = await this.storage.upload(storageRef, image);
      const imageUrl = await getDownloadURL(uploadTask.ref);
  
      // Salva a URL da imagem no documento do produto
      const produtoRef = doc(this.firestore, "Produtos", id);
      await setDoc(produtoRef, {
        nome: nomeProduto,
        descricao: descProduto,
        preco: precoProduto,
        qtd: qtdProduto,
        image: imageUrl // Agora usa a URL da imagem do Firebase Storage
      });
  
      this.mensagem = 'Produto editado com sucesso!';
      this.setOpen(true);

      // Recarrega a lista de produtos
      setTimeout(() => {
        this.produtos = [];
        this.listarBanco();
      }, 2000);
    } catch (error) {
      console.error('Erro ao editar produto:', error);
      this.mensagem = 'Erro ao editar produto. Tente novamente.';
      this.setOpen(true);
    }
  }
}
