import { Component, OnInit } from '@angular/core';
import { collection, doc, setDoc, Firestore } from '@angular/fire/firestore';
import { uploadBytes, ref, Storage, listAll, getDownloadURL } from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-cad-produtos',
  templateUrl: './cad-produtos.page.html',
  styleUrls: ['./cad-produtos.page.scss'],
})
export class CadProdutosPage implements OnInit {
  foto: any
  imageRef: any
  images: any = []
  imgSrc: any
  isImg: boolean = false
  preco1:string=''
  constructor(private storage: Storage, private firestore:Firestore) { }
  ngOnInit() {
    this.listarProdutos()
    console.log(uuidv4())
  }
  carregarFoto(e: any) {
    this.foto = e.target.files[0]
    const newName = uuidv4(this.foto.name)
    this.imageRef = ref(this.storage, `Produtos/${newName}`)
    uploadBytes(this.imageRef, this.foto)
    setTimeout(() => {
      this.images=[]
      this.listarProdutos()
     }, 2000);
  }

  valorFormat(preco: any) {
    const r=preco.value.replace('.',',')
    const a = Number(r)
    const b = a.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    console.log(b)
    this.preco1=b
  }

  selectImage(img: any, modal: any) {
    this.imgSrc = img
    this.isImg = true
    modal.dismiss()//fechar modal
  }

  listarProdutos() {
    const listRef = ref(this.storage, 'Produtos');
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((res) => {
            this.images.push(res)
          })
        });
      }).catch((error) => {
      });
  }

  cadastrarProduto(nomeProduto:any, descProduto:any, precoProduto:any, qtdProduto:any) {
    const produto = {
      nome:nomeProduto,
      descricao:descProduto,
      preco:precoProduto,
      qtd:qtdProduto,
      image:this.imgSrc
    }
    const document = doc(collection(this.firestore, 'Produtos'));
    return setDoc(document, produto);
  }
  hideShow(){
    document.getElementById('cadImg')?.click()
  }

}
