// products
const productTypes = ['polo','pantalon','zapato']

function getTypeMeassurement(type){
    switch(type){
        case 0: return TSHIRT_MEASSUREMENT
        case 1: return PANTS_MEASSUREMENT
    }
}

let generateIdBucket = (function(){
    let id1 = 'bucket-'
    return () => {
        let id2 = Math.floor(Math.random() * 10000)
        let id = id1 + id2.toString()
        return id
    }
})()

class BucketRepo {

    find(id){

        if (id){
            let report = this.data.find(object => object.id === id)
            return report
        }else{
            let report = this.data.slice(0,15)
            return report
        }
        
    }

    update(object){
        if (!object) return
        let newData = this.data.map(data => {
            if (data.id === object.id){
                return object
            }else{
                return data
            }
        })
        this.data = newData
    }

    create(object){
        if(!object) return
        let report = this.data.find(data => data.id === object.id)
        if (!report){
            this.data.push(object)
        }else{
            return
        }
    }

    delete(id){
        if (!id) return
        let newArray = this.data.filter( data => data.id !== id )
        this.data = newArray
    }

    constructor(data){
        this.data = data
    }
}
const bucketRepo = new BucketRepo(bucket)

class ProductsRepo {

    find(id) {

        if (id) {
            let report = this.data.find(object => object.id === id)
            return report
        } else {
            let report = this.data.slice(0, 15)
            return report
        }

    }

    update(object) {
        if (!object) return
        let newData = this.data.map(data => {
            if (data.id === object.id) {
                return object
            } else {
                return data
            }
        })
        this.data = newData
    }

    create(object) {
        if (!object) return
        let report = this.data.find(data => data.id === object.id)
        if (!report) {
            this.data.push(object)
        } else {
            return
        }
    }

    delete(id) {
        if (!id) return
        let newArray = this.data.filter(data => data.id !== id)
        this.data = newArray
    }

    constructor(data) {
        this.data = data
    }
}

const productRepo = new ProductsRepo(products)

class BucketService {

    constructor() {

    }
    
    getProducts(){
        return bucketRepo.find()
    }

    changeSize(object){
        bucketRepo.update(object)
    }

    sumQuantity(object){
        bucketRepo.update(object)
    }

    subtractQuantity(object){
        bucketRepo.update(object)
    } 

    addProduct(product){
        console.log('creating item in bucket . ',product.id);
        bucketRepo.create(product)
    }

    removeProduct(id){
        bucketRepo.delete(id)
    }
}

const bucketService = new BucketService()


// STATES

var productShowcaseState = {
    id : '',
    idProduct : '',
    quantity : 0,
    meassurement: {
        size: ''
    },
    shipping : {}
}

var bucketState = {
    products : []
}

var hintState = {
    msgs : []
}

var userState = {
    user : {}
}

const PRODUCT_CONTEXT = 'PRODUCT_CONTEXT'
const BUCKET_CONTEXT = 'BUCKET_CONTEXT'
const HINT_CONTEXT = 'HINT_CONTEXT'
const USER_CONTEXT = 'USER_CONTEXT'

const contextState = (context) => {
    switch (context){
        case PRODUCT_CONTEXT :
            return {
                showcaseData: productShowcaseState,
            }
        case BUCKET_CONTEXT:
            return {
                bucket : bucketState
            }
        case HINT_CONTEXT:
            return {
                hint : hintState
            }
        case USER_CONTEXT:
            return {
                user : userState
            }
    }
}

class HintItem {

    constructor(){
        this.currentComponent=null
    }

    listeners(){

        let context = contextState(HINT_CONTEXT).hint
        const {msg} = this.data

        let btnRemove = this.currentComponent.querySelector('.btn-remove-hint-item')
        btnRemove.addEventListener('click',(e)=>{
            context.msgs = context.msgs.filter(data => data.msg !== msg)
            console.log('hint removed : ',context.msgs)
            this.currentComponent.remove()
            e.preventDefault()
        })

    }

    getTemplate(){
        let div = document.createElement('div')
        div.classList.add('hint-item-component')
        const {status,msg} = this.data

        switch(status){
            case 'success':
                div.classList.add('hint-item-component-success')
                break
            case 'error':
                div.classList.add('hint-item-component-error')
                break
        }

        let template = `
            <div>
                <span>${status}</span>
                <span>${msg}</span>
            </div>
            <button class = "btn-remove-hint-item">remove</button>
        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

    setData(data){
        this.data = data
    }

    setCallback(callback){
        this.callback=callback
    }

}

class Hint{

    constructor(){
        this.currentComponent=null
        this.container=null
    }

    removemsg(){

    }

    update(object){
        const {problems} = object
        let context = contextState(HINT_CONTEXT).hint
        context.msgs = problems
        this.render(this.container)
    }

    listeners(){

    }

    getTemplate(){
        let div = document.createElement('div')
        div.classList.add('hint-component')
        let template = `
            <div id = "hint-container" ></div>
        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }

    render(container){
        let context = contextState(HINT_CONTEXT).hint
        let component = this.getTemplate()
        container.innerHTML = ''
        container.append(component)
        this.listeners()
        const hintContainer = document.getElementById('hint-container')
        
        let msgs = context.msgs

        msgs.forEach(data => {
            let component = new HintItem()
            component.setData(data)
            component.render(hintContainer)
        })

        console.log('in render hint : ',context);
        this.container=container
    }

    setData(data){
        this.data = data
    }
}

class ShippingMethodItem {

    constructor(){
        this.currentComponent=null
    }

    listeners(){
        let btnElect = this.currentComponent.querySelector('.btn-shipping-method-item')
        let context = contextState(PRODUCT_CONTEXT).showcaseData
        btnElect.addEventListener('click',()=>{
            context.shipping = {...this.data}
        })
    }

    getTemplate(){
        let div = document.createElement('div')
        div.classList.add('shipping-method-item')
        const {type,price} = this.data
        let template = `
            <button class = "btn-shipping-method-item">${type}</button>
            <span class = "shipping-method-price">${price}</span>
        `
        div.innerHTML = template
        this.currentComponent=div
        return div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

    setData(data){
        this.data = data
    }

}
class ShippigMethodsContainer {

    constructor(){

    }

    listeners(){

    }

    getTemplate(){
        let div = document.createElement('div')
        div.classList.add('shipping-methods-component')
        let template = `
            <div id = "shipping-methods-container" >
            
            </div>
        `
        div.innerHTML = template
        return div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
        const shippingMethodsContainer = document.getElementById('shipping-methods-container')
        const { methods } = this.data
        methods.forEach(data => {
            let component = new ShippingMethodItem()
            component.setData(data)
            component.render(shippingMethodsContainer)
        })
    }

    setData(data){
        this.data = data
    }
}

class ProductSuggentionItem {

    constructor() {
        this.currentComponent = null
        this.observers=[]
    }

    attach(observer) {
        this.observers.push(observer)
    }

    detach(observer) {
        let newObservers = this.observers.filter(o => o === observer)
        this.observers = newObservers
    }

    notify() {

        let context = contextState(PRODUCT_CONTEXT).showcaseData
        console.log('before verification : ',context.id);

         // business model changed
        // if (context.quantity === 0) {
        //     console.log('product removed');
        //     bucketService.removeProduct(context.id)
        // }else{
        //     console.log('added product in bucket');
        //     bucketService.addProduct(context)
        // }

        context.quantity = 0
        context.meassurement = { size : ''}
        context.shipping = { size : ''}

        this.observers.forEach(observer => {
            observer.update(this)
        })
        
    }

    listeners() {

        let hintContext = contextState(HINT_CONTEXT).hint
        let btnWatch = this.currentComponent.querySelector('.btn-watch-product-suggestion-item')
        btnWatch.addEventListener('click', (e) => {
            hintContext.msgs = []
            this.notify()
        })

        let btnRemove = this.currentComponent.querySelector('.btn-remove-product-suggestion-item')
        btnRemove.addEventListener('click', (e) => {
            this.currentComponent.remove()
            e.preventDefault()
        })

    }

    render(container) {
        let component = this.getTemplate()
        container.prepend(component)
        this.listeners()
    }

    getTemplate() {
        let div = document.createElement('div')
        div.classList.add('product-suggestion-item-component')
        const { id , urlImages , name} = this.data
        let firstImageURL = urlImages[0]
        let template = `
            <div class = "product-suggestion-item-header">
                <h3 class = "product-suggestion-item-name">${name}</h3>
                <div class = "product-suggestion-item-images" >
                    <img alt="this is a thumbnail" src = ${firstImageURL} />
                </div>
            </div>
            <div class = "produdct-suggestion-item-footer">
                <button class = "btn-watch-product-suggestion-item">watch</button>
                <button class = "btn-remove-product-suggestion-item" >remove</button>
            <div>
            
        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }

    setData(data) {
        this.data = data
    }
}

class ProductSuggestionsContainer {

    constructor() {

    }

    listeners() {

    }

    getTemplate() {
        let div = document.createElement('div')
        let template = `
            <div id = "suggestion-container"></div>
        `
        div.innerHTML = template
        return div
    }

    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
        const suggestionContainer = document.getElementById('suggestion-container')
        let productSuggested = [...this.data]
        productSuggested.forEach(data => {
            let component = new ProductSuggentionItem()
            component.setData(data)
            component.render(suggestionContainer)
            component.attach(productShowcase)
        })
    }

    setData(data) {
        this.data = data
    }
}
class ProfileCard {

    constructor() {

    }

    listeners() {

    }

    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

    getTemplate() {
        
        // user repo doesnt exist
        let u = user[0]
        let userContext = contextState(USER_CONTEXT).user.user
        userContext = u
        const { fullname } = userContext

        let div = document.createElement('div')
        div.classList.add('profile-card-component')
        let template = `
            <div class = "profile-avatar">
            </div>
            <span>${fullname}</span>
        `
        div.innerHTML = template
        return div
    }

    setData(data) {
        this.data = data
    }
}

class BuketItem {
    
    constructor(){
        this.currentComponent=null
    }

    render(container){
        let component = this.getTemplate()
        container.prepend(component)
        this.listeners()
    }

    listeners(){
        const btnRemove = this.currentComponent.querySelector('.btn-remove-bucket-item')
        const {id} = this.data
        btnRemove.addEventListener('click',(e)=>{
            bucketService.removeProduct(id)
            this.currentComponent.remove()
            e.preventDefault()
        })
    }

    getTemplate(){

        let div = document.createElement('div')
        div.classList.add('bucket-item-component')
        
        const {idProduct,quantity} = this.data
        let report = productRepo.find(idProduct)
        const {name,urlImages} = report
        let firstImageURL = urlImages[0]

        let template = `
            <div class = "bucket-item-images">
                <img src = ${firstImageURL} alt = "this is a image" />
            </div>
            <div>
                ${name}
                <span class = "bucket-item-quantity" >${quantity}</span>
            </div>
            <button class = "btn-remove-bucket-item">remove</button>
        `
        div.innerHTML = template
        this.currentComponent=div
        return div
    }

    setData(data){
        this.data = data
    }

}
class RepresenterBucket {

    constructor() {
        this.problems=[]
        this.observers=[]
        this.container=null
    }

    update(object){
        
    }

    //for hint
    attach(observer){
        this.observers.push(observer)
    }

    // for hint 
    dettach(observer){
        this.observers = this.observers.filter(d => d !== observer)
    }

    // for hint
    notify(){
        this.observers.forEach(observer => {
            observer.update(this)
        })
    }

    listeners() {
        
        let btnProcess = document.getElementById('btn-proccess-bucket')
        
        btnProcess.addEventListener('click',()=>{

            // notify to hint 
            this.problems.push({
                status : 'error',
                msg : 'this isnt implemented, this is a prototype'
            })

            this.notify()
            console.log('notified process');
        })

    }

    getTemplate() {
        let div = document.createElement('div')
        div.classList.add('representer-bucket-component')
        let template = `
            <div class="representer-bucket-header">
                <h3 class="representer-bucket-title">My bucket</h3>
            </div>
            <div class="representer-bucket-content">
                <div id="products-in-bucket">
            
                </div>
            </div>
            <div class = "representer-bucket-footer">
                <button id = "btn-proccess-bucket">process</button>
            </div>
        `
        div.innerHTML = template
        return div
    }

    render(container) {

        let component = this.getTemplate()
        container.innerHTML = ''
        container.append(component)
        this.listeners()
        const productsInBucket_ = document.getElementById('products-in-bucket')

        // this is for context
        //let productsInBucket = [...this.data]

        let report = bucketService.getProducts()
        report.forEach(data => {
            let component = new BuketItem()
            component.setData(data)
            component.render(productsInBucket_)
        })

        this.container = container

    }

    setData(data) {
        this.data = data
    }
}


class PANTSMeasurement {

    constructor() {

    }

    listeners() {

        const m18 = document.getElementById('pants-m-18')
        const m25 = document.getElementById('pants-m-25')
        const m29 = document.getElementById('pants-m-29')

        const test = document.getElementById('test-tshirt-meassurement')

        let context = contextState(PRODUCT_CONTEXT).showcaseData

        m18.addEventListener('click', () => {
            test.innerHTML = '18'
            context.meassurement = {size : '18'}

        })

        m25.addEventListener('click', () => {
            test.innerHTML = '25'
            context.meassurement = { size: '25' }

        })

        m29.addEventListener('click', () => {
            test.innerHTML = '29'
            context.meassurement = { size: '29' }

        })

    }

    getTemplate() {
        let div = document.createElement('div')
        div.classList.add('t-shirt-measurament-component')
        let template = `
            <div class = "meassurement-election" >
                <button class = "meassurement-election-item" id = "pants-m-18" >18</button>
                <button class = "meassurement-election-item" id = "pants-m-25" >25</button>
                <button class = "meassurement-election-item" id = "pants-m-29" >29</button>
            </div>
            <div id = "test-tshirt-meassurement"></div>
        `
        div.innerHTML = template
        return div
    }

    render(container) {
        let component = this.getTemplate()
        container.innerHTML = ''
        container.append(component)
        this.listeners()
    }

    setData() {

    }

}

class TshirtMeasurement {
    
    constructor(){
    
    }

    listeners(){

        const small = document.getElementById('tshirt-s-small')
        const medium = document.getElementById('tshirt-s-medium')
        const large = document.getElementById('tshirt-s-large')

        const test = document.getElementById('test-tshirt-meassurement')

        let context = contextState(PRODUCT_CONTEXT).showcaseData

        small.addEventListener('click',()=>{
            test.innerHTML = 'small'
            context.meassurement = {size : 'small'}
        })

        medium.addEventListener('click',()=>{
            test.innerHTML = 'medium'
            context.meassurement = { size: 'medium' }
        })

        large.addEventListener('click',()=>{
            test.innerHTML = 'large'
            context.meassurement = { size: 'large' }
        })

    }

    getTemplate(){
        let div = document.createElement('div')
        div.classList.add('t-shirt-measurament-component')
        let template = `
            <div class = "meassurement-election" >
                <button class = "meassurement-election-item" id = "tshirt-s-small" >small</button>
                <button class = "meassurement-election-item" id = "tshirt-s-medium" >medium</button>
                <button class = "meassurement-election-item" id = "tshirt-s-large" >large</button>
            </div>
            <div id = "test-tshirt-meassurement"></div>
        `
        div.innerHTML = template
        return div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

    setData(){

    }

}

const TSHIRT_MEASSUREMENT = 'TSHIRT_MEASSUREMENT'
const PANTS_MEASSUREMENT = 'PANTS_MEASSUREMENT'

const FactoryMeasurementComponent = (type) => {
    switch(type){
        case TSHIRT_MEASSUREMENT :
            return new TshirtMeasurement()

        case PANTS_MEASSUREMENT :
            return new PANTSMeasurement()
    }
}
class ProductShowcase {

    constructor(FactoryMeasurementComponent) {
        this.FactoryMeasurementComponent = FactoryMeasurementComponent;
        this.currentComponent=null
        this.containerForRender=null
        this.observers=[]
        this.problems=[]
    }

    attach(observer){
        this.observers.push(observer)
    }

    detach(observer){
        let observers = this.observers.filter(ob => ob === observer)
        this.observers = observers
    }

    notify(){
        this.observers.forEach(observer => {
            observer.update(this)
        })
    }

    notifyBucket(bucket){
        const container = document.getElementById('bucket')
        console.log('notificando a bucket');
        bucket.render(container)
    }

    // observer suggestion item
    update(object){
        let report = productRepo.find(object.data.id)
        this.setData(report)
        this.render(this.containerForRender)
    }

    listeners() {

        const quantityProduct = document.getElementById('quantity-product')
        
        let context = contextState(PRODUCT_CONTEXT).showcaseData
        let contextBucket = contextState(BUCKET_CONTEXT).bucket
        
        quantityProduct.innerText = context.quantity.toString()

        const btnSum = document.getElementById('sum-quantity-product')
        btnSum.addEventListener('click',()=>{
            bucketService.sumQuantity(context)
            context.quantity++
            quantityProduct.innerText = context.quantity.toString()
        })

        const btnSubstract = document.getElementById('subtract-quantity-product')
        btnSubstract.addEventListener('click',()=>{
            if (context.quantity === 0) return
            bucketService.subtractQuantity(context)
            context.quantity--
            quantityProduct.innerText = context.quantity.toString()
        })

        function validateEspec(){
            var problems = []
            if (context.meassurement.size===''){
                problems.push({
                    status : 'error',
                    msg : 'add a meassurement'
                })
            }
            if (context.quantity === 0){
                problems.push({
                    status : 'error',
                    msg : 'add a quantity'
                })
            }
            if (!context.shipping.type){
                problems.push({
                    status : 'error',
                    msg : 'put a shipping method'
                })
            }
            return problems
        }

        const btnAdd = document.getElementById('btn-add-product-showcase')
        btnAdd.addEventListener('click',()=>{

            let problems = validateEspec()

            if (problems.length > 0){
                console.table(problems);
                this.problems = problems
                this.notify()
                return
            }else{

                this.problems.push({
                    status : 'success',
                    msg : 'product added correctly'
                })

                bucketRepo.create({...context})
                contextBucket.products.push({ ...context })
                console.log('success updated and added');

                this.notifyBucket(representerBucket)
                this.notify()
            }
            
        })
    }

    render(container) {
        
        const context = contextState(PRODUCT_CONTEXT).showcaseData
        context.idProduct = this.data.id
        context.id = generateIdBucket()
        
        this.containerForRender = container
        let component = this.getTemplate()

        const {type,shipping} = this.data
        let TypeMeassurement = getTypeMeassurement(type)

        container.innerHTML = ''
        container.append(component)
        this.listeners()
        const meassurementProductContainer = document.getElementById('meassurement-product-container')

        let meassurement
        switch(TypeMeassurement){
            case TSHIRT_MEASSUREMENT:
                meassurement = this.FactoryMeasurementComponent(TSHIRT_MEASSUREMENT)
                break
            case PANTS_MEASSUREMENT:
                meassurement = this.FactoryMeasurementComponent(PANTS_MEASSUREMENT)
        }
        meassurement.render(meassurementProductContainer)

        const shippingMethods_ = document.getElementById('shipping-methods')
        let shippementComponent = new ShippigMethodsContainer()
        shippementComponent.setData(shipping)
        shippementComponent.render(shippingMethods_)

        // business model changed
        // initial added in bucket repo - if there are any interaction , will remove the product in - notify()
        //bucketService.addProduct(context)

    }

    getTemplate() {
        
        let div = document.createElement('div')
        div.classList.add('product-showcase-component')
        const {name,description,urlImages} = this.data
        let firstImageURL = urlImages[0]
        let template = `

            <div class="product-showcase-header">
                <h3 class="product-showcase-name-product">${name}</h3>

                <div class="product-showcase-images">
                    <img src=${firstImageURL} alt="image of the product" />
                </div>

            </div>
            
            <div class="product-showcase-content">
            
                <div id="meassurement-product-container">
            
                </div>
            
                <div id="shipping-methods">
            
            
                </div>
            
                <div class="product-showcase-sum-subtract-quantity-wrapper">
                    <div class="product-showcase-sum-subtract-quantity">
                        <button id="sum-quantity-product">+</button>
                        <span id="quantity-product"></span>
                        <button id="subtract-quantity-product">-</button>
                    </div>
                </div>
            
            </div>
            
            <div class = "product-showcase-final">
                <div class="product-showcase-espec">
                    <h3>description</h3>
                    <p>${description}</p>
                
                </div>
                
                <div class="product-showcase-footer">
                
                    <button id="btn-add-product-showcase">add</button>
                
                </div>
            </div>

        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }

    setData(data) {
        this.data = data
    }

}

const representerBucket = new RepresenterBucket()
const productShowcase = new ProductShowcase(FactoryMeasurementComponent)
const productSuggestionContnainer = new ProductSuggestionsContainer()
const profileCard = new ProfileCard()
const hint = new Hint()
class ProductPage {
    
    constructor(){

    }

    listeners(){

    }

    getTemplate(){

        let div = document.createElement('div')
        let template = `

            <header class="page-showcase-product-header">
            
                <div id="profile-card">
            
                </div>
            
            </header>
            
            
            <section class="page-showcase-product-main-section">

                <div class = "hint-section" ></div>
            
                <div class="main-section-first-section">
            
                    <div id="product-showcase">
            
                    </div>
            
                    <div id="bucket">
            
                    </div>
            
                </div>
            
                <div id="product-suggestions">
            
                </div>
            
            </section>
            
            <footer class="page-showcase-product-footer">
            
            
            </footer>
        
        `

        div.innerHTML = template

        return div
    }

    render(container){

        // update the state of my bucket
        let context = contextState(BUCKET_CONTEXT).bucket
        context.products = bucketRepo.find()
        console.log(context);

        let component = this.getTemplate()
        container.append(component)

        const profileCard_ = document.getElementById('profile-card')
        const productShowCase_ = document.getElementById('product-showcase')
        const productSuggestionsContainer_ = document.getElementById('product-suggestions')
        const bucket_ = document.getElementById('bucket')
        const hintSection_ = document.querySelector('.hint-section')

        representerBucket.setData(bucketService.getProducts())
        productShowcase.setData(productRepo.find('product-1'))
        productSuggestionContnainer.setData(productRepo.find())

        productShowcase.attach(hint)
        representerBucket.attach(hint)

        hint.render(hintSection_)
        representerBucket.render(bucket_)
        productShowcase.render(productShowCase_)
        productSuggestionContnainer.render(productSuggestionsContainer_)
        profileCard.render(profileCard_)
    }

    setData({product , user}){
        this.productData = product
        this.userData = user
    }

}

function app() {
    const container = document.getElementById('root')
    let pageProduct = new ProductPage()
    pageProduct.render(container)
}

app()