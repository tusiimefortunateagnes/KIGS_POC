import { CartService, Salesperson } from '@/modules/Observer';
import ProductCatalog from '@/modules/ProductCatalog'
import ProductFactory from '@/modules/ProductFactory'
import type ProductInterface from '@/modules/modules';
import Vue from 'vue'
import Vuex from 'vuex'
let pdtCat =  ProductCatalog.getInstance();
Vue.use(Vuex)
export default new Vuex.Store({
  state:  {
      showDetails:false,
      firstTime: localStorage.getItem("first_time") === null,
      activeMenu: 'pos',
      loadingSampleData: false,
      moneys: [500,1000,2000, 5000, 10000, 20000, 50000,100000],
      products: [...pdtCat.getProducts()] as ProductInterface[],
      keyword: "",
      message:'',
      cart: [] as ProductInterface[],
      cash: 0,
      change: 0,
      total:0,
      isShowModalReceipt: false,
      receiptNo: '',
      details:{} as ProductInterface,
      gateway:{},
      qty:1,
      viewPayment:false,
      player: new Audio(),
      reports:[...pdtCat.getReports()] as ProductInterface[],
      receiptDate: ''
  },
  getters: {
    products: state => state.products,
    receiptNo: state => state.receiptNo,
    receiptDate:state => state.receiptDate,
    keyword: state => state.keyword,
    cart: state => state.cart,
    cash: state => state.cash,
    moneys: state => state.moneys,
    change: state => state.change,
    player : state => state.player,
    details: state => state.details,
    message:state => state.message,
    showModelReceipt: state => state.isShowModalReceipt,
    showDetails:state => state.showDetails,
    showPayment: state => state.viewPayment,
    fetchGateway: state => state.gateway,
    qty:state => state.qty,
    reports:state => state.reports,
    total:state => state.total,
  },
  mutations: {
    // client side
    saveProduct(state,payload:ProductInterface){
      // instantiate a factory class
      let product = new ProductFactory();
      // we use the factory method to create a product
     let pdt = product.createProduct(payload);
     // saving product using the singleton pattern
      pdtCat.saveProduct(pdt);
      state.products = pdtCat.getProducts();
    },
    addingToCart(state, payload:ProductInterface){
      let old = state.cart.filter(c => c.productName === payload.productName);
      if(old.length === 0){
        console.log(`Added => ${payload}`);
        // adding new product to cart
        state.cart = [...state.cart,payload];
        let service = new CartService();
        // sales person
        let sales = new Salesperson(payload);
        // registering sales person to be notified of new products added to cart
        service.registerObserver(sales);
       state.message = service.notifyObservers();
      } else{
        state.message = "Product is already added to cart"
      }
    },
    // remove product from cart
    setQty(state,payload:number){
      state.qty = payload;
    },
    setReceipt(state, payload:string){
      state.receiptNo = payload;
    },
    setReceiptDate(state, payload:string){
      state.receiptDate = payload;
    },
    // model for receipt
    setShowModel(state, payload:boolean) {
      state.isShowModalReceipt = payload;
    },
    setCash(state, payload){
      state.cash = payload;
    },
    setChange(state, payload){
      state.change = payload;
    },
    setDetails(state, payload){
      state.details = payload;
    },
    setShowDetails(state, payload){
      state.showDetails = payload;
    },
    setViewPayment(state, payload){
      state.viewPayment = payload;
    },
    // setting payment gateway
    setPaymentGateway(state, payload){
        state.gateway = payload;
    },
    captureReports(state, payload){
      pdtCat.saveReports(payload);
      state.reports = pdtCat.getReports();
    },
    setTotalPrice(state, payload:number){
      state.total = payload;
    },
  },
  actions: {
    
  },
  modules: {
  }
})

