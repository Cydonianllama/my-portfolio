class User{
    auth(){
        
    }
}

class Posts {
    templatePost({}){
    return `
    <div class = "post-container p-md flex-row">
        <div class = "post-vote-container mr-1">
            <div class ="flex-column gap-1">
                <button class ="btn">up</button>
                <span>15k</span>
                <button class ="btn">down</button>
            </div>
        </div>
        <div class = "post-main-content">
            <header class="pots-header flex-row align-items-center mb-1">
                <div class ="flex-row align-items-center  mr-2">
                    <a href="#" class="posts-avatar-subcommunity mr-1">
            
                    </a>
                    <span>namecomunity</span>
                </div>
                <p>posted by <span>name poster</span> <span>5 minut ago</span></p>
                <div class ="post-awards-container">
                </div>
            </header>
            <h3 class="post-title mb-1">title of the post</h3>
            <div class ="post-media-content mb-1">
                <img class ="post-media-content-image"src="./resources/ref.jpeg" alt="alt of my conent" />
            </div>
            <div class = "post-actions">
                <a href="#">comments</a>
                <button class = "btn">give award</button>
                <button class ="btn">share</button>
                <button class = "btn">save</button>
                <button class ="btn">...</button>
            </div>
        </div>
    </div>
    `
    }
    giveAward(idPost){

    }
    votePost(idPost,typeVote){

    }
    hidePost(idPost){

    }
    savePost(idPost){

    }
    hide(idPost){

    }
    report(idPost){

    }
    renderPosts(){

    }
}

function app(){
    
    const posts = new Posts();
    post.renderPosts()       

}