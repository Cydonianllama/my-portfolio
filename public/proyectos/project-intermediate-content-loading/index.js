const ConfigApp = {
    CONTAINER_ID: 'container',
    PAGINATION_CONTAINER_ID: 'container-cards',
    PAGINATOR_COMPONENT_ID: 'loading-component'
}

// this is a component for prove my logic , but the logic in is irrelevant
class CardCompoment {

    constructor(){
        this.container=null
        this.currentComponent=null
    }

    listeners(){

    }

    getTemplate(){
        let div = document.createElement('div')
        div.classList.add('card-component')

        let template = `
            <span>  card ${this.data}</span>
        `
        div.innerHTML = template 
        this.currentComponent = div
        return  div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
        this.container = container
    }

    setData(data){
        this.data = data
    }

    update(component){
        this.container.append(component)
    }

    setLast(){
        this.currentComponent.remove()
        let component = this.getTemplate()
        component.classList.add('last-component')
        this.update(component)
    }

}

class PaginationComponent {

    constructor(){
        this.observers=[]
        this.state = {
            pageSelected : 1,
            limitShowingItems : 15
        }
    }

    listeners(){
        const paginatorItems = document.querySelectorAll('.paginator-item')
        paginatorItems.forEach( item => {
            item.addEventListener('click',()=>{
                this.state.pageSelected = item.dataset.pageNumber;
                this.notify()
            })
        })
    }

    // container
    attach(observer){
        this.observers.push(observer)
    }
    
    // container
    dettach(observer){
        let newObservers = this.observers.filter(o => o !== observer)
    }

    // notify container
    notify(){
        this.observers.forEach(observer => {
            observer.update(this)
        })
    }

    getTemplate(){

        const getQuantityPaginatorItems = (quantityData,limit) => {
            return Math.floor(quantityData/limit)
        }

        let div = document.createElement('div')

        const {quantityData , limit , currentPage} = this.config
        let quaintyItems = getQuantityPaginatorItems(quantityData, limit)
        let items = ''
        for (let i = 0 ; i < quaintyItems ; i++){
            let paginatorItem = `<button class = "paginator-item" data-page-number = ${i+1} >${i+1}</button>`
            items = items + paginatorItem
        }
        let template = `
            <div class = "paginator-component">
                ${items}
            </div>`
        div.innerHTML = template
        return div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

    setConfiguration(config){
        this.config = config
        console.log('configuration in pagination component : ',config);
    }

}

class ContainerCardPagination {

    constructor(CardCompoment) {
        this.currentContainer=null
        this.componentClass = CardCompoment
        this.state = {page : 1}
    }

    update(object){
        this.state.page = parseInt(object.state.pageSelected)
        this.render(this.currentContainer)
    }

    render(container) {
        
        container.innerHTML = ''

        let getData = (pag) => {
            let items = []
            let limit = 15
            for (let i = limit * (pag - 1) ; i < limit*pag ; i++){
                items.push(i+1)
            }
            return items
        }

        getData(this.state.page).forEach(data => {
            let component = new this.componentClass()
            component.setData(data)
            component.render(container)
        })

        if(!this.currentContainer) this.currentContainer=container

        // scroll on top
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: document.getElementById('root')
        })

    }

}

// containerCard -> methods (update,render)
class ContainerCardDynamic {

    constructor(CardComponent) {
        this.currentContainer = null
        this.componentClass = CardComponent
        this.state = {
            quantityCallies : 0,
            currentPageLoaded : 1,
            data : []
        }
        this.dataLoaded=[]
    }

    setConfiguration(conf){
        this.configuration = conf
        let quantityData = this.configuration.quantityData;
        let quantityCallies = Math.ceil(quantityData / this.configuration.limit)
        this.state.quantityCallies = quantityCallies
    }

    loadMoreData(){
        this.state.currentPageLoaded++
        let forLoad = this.state.currentPageLoaded
        if (this.state.quantityCallies === forLoad) return
        let newData = this.getData(forLoad)
        this.state.data = [...this.state.data,...newData]
        this.dataLoaded = newData;
        this.renderPhase2(this.currentContainer)
    }

    getData(pag){
        let items = []
        let limit = this.configuration.limit
        for (let i = limit * (pag - 1); i < limit * pag; i++) {
            items.push(i + 1)
        }
        return items
    }

    renderComponents(data, last,container) {
        console.log('length data : ',data.length);
        data.forEach((data, index) => {

            let component = new this.componentClass()
            component.setData(data)
            console.log('last:',last);
            if (index + 1 === last) {
                console.log('last founded');
                console.log(component.getTemplate());
                component.render(container)
                component.setLast()
            } else {
                component.render(container)
            }

        })
    }

    renderPhase2(container){

        const instanceIntersectionObserver = () => {

            const options = {
                rootMargin: '10px 0px',
                threshold: 1.0
            }

            let callback_intersection = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lastComponent = document.querySelector('.last-component')
                        observer.unobserve(lastComponent)
                        lastComponent.classList.remove('last-component')
                        this.loadMoreData()
                        console.log('loading data');
                    }
                })
            }

            let observer = new IntersectionObserver(callback_intersection, options);

            return observer
        }

        let lengthData = 15
        let last = lengthData 

        this.renderComponents(this.dataLoaded,last,container)

        let observer = instanceIntersectionObserver()
        const lastComponent = document.querySelector('.last-component')
        observer.observe(lastComponent)
    
    }

    render(container) {

        this.state.data = this.getData(this.state.currentPageLoaded)
        this.dataLoaded = this.state.data

        this.renderPhase2(container)

        this.currentContainer = container

    }

}

class DynamicLoadingStrategy {
    
    constructor(){
        
    }

    initConfig(container,config){
        this.container  = container
        this.config = config
    }

    run(){
        const container = document.getElementById(ConfigApp.PAGINATION_CONTAINER_ID)
        this.container.setConfiguration(this.config)
        this.container.render(container)
    }
}

class PaginationStrategy {
    
    constructor(paginationComponent){
        this.paginationComponent = paginationComponent
    }

    initConfig(container,config){
        this.container = container
        this.config = config
    }
    
    instancePaginatorComponent(){
        const containerPagination = document.getElementById(ConfigApp.PAGINATOR_COMPONENT_ID)
        this.paginationComponent.setConfiguration(this.config)
        this.paginationComponent.render(containerPagination)
    }

    bindingPaginatorAndContainer(container){
        this.paginationComponent.attach(container)
    }
    
    run(){
        const containerCards = document.getElementById(ConfigApp.PAGINATION_CONTAINER_ID)
        this.container.render(containerCards)
        this.instancePaginatorComponent()
        this.bindingPaginatorAndContainer(this.container)
    }
    
}

class ContentLoading {

    constructor(strategy,container){
        this.strategy = strategy
        this.container = container
    }

    listeners(){

    }

    setConfiguration(configuration){
        this.configuration = configuration
    }

    getTemplate(){
        let div = document.createElement('div')
        let template = 
        `
            <div id = "container-cards"></div>
            <div id = "loading-component"></div>
        `
        div.innerHTML = template
        return div
    }

    render(container){

        const clearContainer = (container) => {
            container.innerHTML = ''
        }
        
        let component = this.getTemplate()
        clearContainer(container)
        container.append(component)
        this.listeners() 
        this.strategy.initConfig(this.container, this.configuration)
        this.strategy.run()

    }
}

/* content loading with pagination */
const paginationStrategy = new PaginationStrategy(new PaginationComponent())
const containerCardStrategy_Pagination = new ContainerCardPagination(CardCompoment)
const configurationPagination = {
    quantityData: 150,
    limit: 15,
    currentPage: 1
}
const paginationPage = new ContentLoading(paginationStrategy, containerCardStrategy_Pagination)
paginationPage.setConfiguration(configurationPagination)

/* content loading dynamically */
const configurationDynamic = {
    quantityData: 150,
    limit: 15,
}
const dynamicContentLoadingStrategy = new DynamicLoadingStrategy()
const containerCardStrategy_Dynamic = new ContainerCardDynamic(CardCompoment)
const dynamicLoadingPage = new ContentLoading(dynamicContentLoadingStrategy, containerCardStrategy_Dynamic)
dynamicLoadingPage.setConfiguration(configurationDynamic)

class HomePage {
    
    constructor(){

    }

    listeners(){

        const container = document.getElementById('container')

        const btnPaginationLoading = document.getElementById('btn-pagination-loading')
        btnPaginationLoading.addEventListener('click',(e)=>{
            paginationPage.render(container)
        })

        const btnDynamicLoading = document.getElementById('btn-dynamic-loading')
        btnDynamicLoading.addEventListener('click',(e)=>{
            dynamicLoadingPage.render(container)
        })

    }
    
    getTemplate(){
        let div = document.createElement('div')
        let template = `

            <div class = "options-loading">
                <button id = "btn-pagination-loading" >pagination</button>
                <button id = "btn-dynamic-loading"> dynamic loading </button>
            </div>

            <div id = "container" >

            </div>
        
        `
        div.innerHTML = template;
        return div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

}

const principal = new HomePage()

function app(){
    const container = document.getElementById('root')
    principal.render(container)
}

app()