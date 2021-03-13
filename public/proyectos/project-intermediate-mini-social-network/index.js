var postListViewedUser = [
    {
        idPost: 'idpost-1',
        isOccult : false
    }
]

var postData = [
    {
        id : 'idpost-1',
        idUser : 'idUser-1',
        title  : 'hola soy un post muy suculento',
        content : 'es una alegria haber hecho esto ...',
        likes : [] ,
        comments : [
            {
            idUser : 'idi',
            comment : 'no te creo'
            },
            {
                idUser: 'idi',
                comment: 'yo te creo'
            }
        ]
    },
    {
        id: 'idpost-2',
        idUser: 'idUser-1',
        title: 'este post te hara gritar',
        content: 'this is a comment',
        likes: [],
        comments: []
    },
    {
        id: 'idpost-3',
        idUser: 'idUser-1',
        title: 'quiero ser desarrollador fron end aiuda',
        content: 'porfa aiudenme',
        likes: [],
        comments: []
    }
] 

// components
var post = []

class PostRepository {
    
    constructor(data){
        this.data = data
    }
    
    find(id){
        if (id) {
            let response = this.data.filter(data => data.id === id)
            return response
        }else {
            let report = this.data.slice(0,15)
            return report
        }

    }

    update(object){
        let newData = this.data.map(data => {
            if (data.id === object.id){
                return object
            }else{
                return data
            }
        })
        this.data =  newData
    }

    delete(id){
        if (!id) return false
        let newData = this.data.filter(data => data.id !== id)
        this.data = newData
    }

    create(object){
        this.data.push(object)  
    }

}

const postRepository = new PostRepository(postData)

class PostService {

    constructor(){

    }

    ocult(idpost){
        let newArray = postListViewedUser.map(data => {
            if (idpost === data.idPost){
                data.isOccult = true
                return data
            }else{
                return data
            }
        })
        postListViewedUser = newArray
        console.log(postListViewedUser)
    }

    like(idPost,idUser){
        let report = postRepository.find(idPost)
        let post = report[0]
        const {
            likes,
        } = post

        let index = likes.indexOf(idUser)

        if (index === -1){
            likes.push(idUser)
            postRepository.update(post)
            console.log('like added');
            return idPost
        }else{
            let newlikes = likes.filter((data,i) => i !== index  )
            post.likes = newlikes
            postRepository.update(post)
            console.log('like removed');
            return null
        }

    }

    comment(data){

        const {idPost , idUser , comment } = data
        
        let report = postRepository.find(idPost)
        let post = report[0]
        post.comments.push({idUser , comment})
        postRepository.update(post)

        console.log(report);

    }

    share(idPost){

        var text = encodeURIComponent("this is a post made by");
        var url = "https://twitter.com/142017erick";
        var user_id = "142017erick";
        var hash_tags = "JS,JavaScript,Programming";


        var params = "menubar=no,toolbar=no,status=no,width=570,height=570"; // for window

        function ShareToTwitter() {
            let Shareurl = `https://twitter.com/intent/tweet?url=${url}&text=${text}&via=${user_id}&hashtags=${hash_tags}`;
            window.open(Shareurl, "NewWindow", params);
        }

        // var url_ = "https://twitter.com/142017erick";
        // function ShareToFaceBook() {
        //     let shareUrl = `http://www.facebook.com/sharer/sharer.phpu=${url_}`;
        //     window.open(shareUrl, "NewWindow", params);
        // }

        ShareToTwitter()
    }

}

const postService = new PostService()

class PostCard {

    constructor() {
        this.currentComponent = null
        this.observers = []
    }

    setData(data){
        this.data = data
    }

    attach(observer){
        console.log('attached :',observer);
        this.observers.push(observer)
    }

    detach(observer){
        this.observers.splice(observer)
    }

    notify(){
        this.observers.forEach( observer => {
            observer.update(this)
        } )
    }

    listeners(){
        
        const component = this.currentComponent

        //actions
        const btnOccult = component.querySelector('.btn-post-card-ocult')
        const btnComment = component.querySelector('.btn-post-card-comment')
        const btnLike = component.querySelector('.btn-post-card-like')
        const btnShare = component.querySelector('.btn-post-card-share')

        const { id } = this.data
        
        btnShare.addEventListener('click',function(e){
            postService.share(id)
            e.preventDefault()
        })

        btnLike.addEventListener('click',function(e){
            postService.like(id,'an user id')
            this.classList.toggle('like-active')
            e.preventDefault()
        })

        btnComment.addEventListener('click',(e) => {
            this.notify()
            e.preventDefault()
        })

        btnOccult.addEventListener('click',function(e){
            console.log('occult post of id :',id);
            postService.ocult(id)
            component.remove()
            e.preventDefault()
        })

    }

    render(container){
        let component = this.getTemplate()
        container.prepend(component)
        this.listeners()
    }

    getTemplate(){
        let {id, content,title} = this.data
        let div = document.createElement('div')
        div.classList.add('post-card')
        let template = `
            <div class="post-card-header" data-id-post = ${id}>
                <span>${title}</span>
                <button class="btn btn-post-card-ocult">ocult</button>
            </div>
            
            <div class="post-card-content">
                <p class="post-card-content-p">${content}</p>
            </div>
            
            <div class="post-card-footer">
                <button class="btn btn-post-card-share"> share </button>
                <button class="btn btn-post-card-comment"> comment</button>
                <button class="btn btn-post-card-like">like</button>
            </div>
        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }

}

const POST_CARD = 'POST_CARD'

const PresenterPostFactory = (type) => {
    switch(type){
        case POST_CARD:
            return new PostCard()
    }
}

class CommentItem {

    constructor(){

    }

    setData(data){
        console.log(data);
        this.data = data
    }

    render(container){
        let div = this.getTemplate()
        container.append(div)
        this.listeners()
    }

    listeners(){

    }

    getTemplate(){
        
        const {idUser , comment} = this.data
        let div = document.createElement('div')
        let template = `
            <div class="post-comment">
            
                <div class="post-comment-content">
                    <p>${comment}</p>
                </div>
                <div class="post-comment-footer">
                    <small>by user  : ${idUser}</small>
                </div>
            
            </div>

        `
        div.innerHTML = template
        return div

    }

}

class PostComplete {

    constructor(CommentItem) {
        this.currentComponent = null
        this.CommentItem = CommentItem
    }

    setData(data) {
        this.data = data
    }

    update(subject) {
        console.log('ive been notified');
        this.data = subject.data
        this.render()
    }

    getTemplate() {

        const { id } = this.data

        let div = document.createElement('div')
        div.classList.add('form-comment-post-wrapper')

        let template = `
            <div class = "form-comment-post" data-id-complete-post = ${id}>
                <input class="form-input-text input-comment-post" type="text" placeholder="comenta algo" />
                <button type="button" class="form-button btn-primary btn-add-comment-post">comentar</button>
            </div>
            <div id="container-post-comments">
            
            </div>
        `

        div.innerHTML = template

        this.currentComponent = div

        return div
    }
    render() {

        const container = document.getElementById('container-post-selected')
        container.innerHTML = ''
        let div = this.getTemplate()
        container.append(div)
        let containerComments = this.currentComponent.querySelector('#container-post-comments')
        let {comments} = this.data
        
        let Component = this.CommentItem

        comments.forEach((data)=>{
            let component = new Component()
            component.setData(data)
            component.render(containerComments)
        })

        this.listeners()
    }
    listeners() {

        let component = this.currentComponent
        let data = this.data
        
        let containerComments = this.currentComponent.querySelector('#container-post-comments')
        function createComponentComment(container,data){
            let commentComponent = new CommentItem()
            commentComponent.setData(data)
            commentComponent.render(container)
        }
        
        let inputComment = component.querySelector('.input-comment-post')
        inputComment.addEventListener('keypress',function(e){
            var char = e.which || e.keyCode;
            let comment = e.target.value
            // user press enter
            if (char === 13) {
                let commentData = { comment: comment, idUser: 'current user logged' }
                postService.comment({idPost : data.id , ...commentData})
                createComponentComment(containerComments,commentData)
                inputComment.value = ''
            }
        })

        let buttonComment = component.querySelector('.btn-add-comment-post')
        buttonComment.addEventListener('click',function(e){
            let commentData = { comment: inputComment.value, idUser: 'current user logged' }
            postService.comment({ idPost: data.id, ...commentData})
            inputComment.value = ''
            createComponentComment(containerComments, commentData)
        })

    }
    
}

const postComplete = new PostComplete(CommentItem)

function app(PostFactory,postComplete){
    
    const factoryPost = PostFactory
    const containerPostsCards = document.getElementById('container-posts-cards') 
    const btnCreatePost = document.getElementById('btn-create-post')

    function createPost(container){

        function generateId () {
            let idPart1 = 'idpost-'
            let idTotal = idPart1 + Math.floor(Math.random() * 100000).toString()
            return idTotal;
        }

        function validateForm({title,content}){
            console.log(title , content);
            let titleValidation = title  || false
            let contentValidation = content || false
            if (titleValidation && contentValidation){
                console.log('form is valid');
                return true
            }else{
                console.log('form is invalid');
                return false
            }
        }

        let producCard = factoryPost(POST_CARD)

        let formData = document.forms["form-post"]

        let validationForm = validateForm({
            title : formData['post-title'].value,
            content : formData['post-content'].value
        })

        if (!validationForm ) return

        let data = {
            id : generateId(),
            idUser : 'idUser-1',
            title : formData['post-title'].value,
            content : formData['post-content'].value,
            likes : [],
            comments : []
        }

        producCard.setData(data)
        producCard.render(container)
        producCard.attach(postComplete)
        postRepository.create(data)

        // the store of the component container
        postCardsInContainer.push(producCard)

        formData.reset()
        formData['post-title'].focus()
    }

    var postCardsInContainer = []

    // repo call
    let report = postRepository.find()
    postCardsInContainer = report
    console.log(postCardsInContainer)

    //validations 

    //render
    postCardsInContainer.forEach(data => {
        let producCard = factoryPost(POST_CARD)
        producCard.setData(data)
        producCard.render(containerPostsCards)
        producCard.attach(postComplete)
    })

    //listeners
    btnCreatePost.addEventListener('click',function(e){
        createPost(containerPostsCards)
        e.preventDefault()
    })
}

app(PresenterPostFactory,postComplete)