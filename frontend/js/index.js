const headers = {
    headers: { 'Authorization': "Bearer " + localStorage.getItem("api-token") }
};

const getMessages = () => axios.get("http://localhost:3008/api/messages", headers).then((data) => {
    listMessages(data.data); //appel de la fonction d'affichage des messages
}, (err) => {
    window.location.href = 'login.html'
});

moment.locale('fr')

//declaration de la fonction d'affichage des messages
const listMessages = (messages) => {
    for (let i in messages) {

        let nbLikes = messages[i].Likes.length;

		
		//section au conteneur principal HTML
		let listPost = document.getElementById("post-list");
		

	
    	//On crée les élements de la structure principale
		let postBlock = document.createElement("article");
		postBlock.setAttribute("class", "post-contenant__index bgc");
		listPost.appendChild(postBlock);

		// post header
		let postPoster = document.createElement("div"); 
		postPoster.setAttribute("class", "poster");
		postBlock.appendChild(postPoster);
		// user
		let postUserName = document.createElement("span");
		postUserName.setAttribute("class", "user-name");
		postUserName.innerHTML = messages[i].User.firstName + ' ' + messages[i].User.lastName + '<span class="post-date"> - ' + moment(messages[i].createdAt).format('LLL')+ ' à poster : </span>';
		postPoster.appendChild(postUserName);

		// images
        if (messages[i].attachment) {
			let postBlockImage = document.createElement("div");
			postBlockImage.settAttribute("class", "block-image");
			postBlock.appendChild(postBlockImage);
			let postLinkSinglPost = document.createElement("a");
			postLinkSinglPost.settAttribute("class", "focus");
			postLinkSinglPost.settAttribute("href", "single-post.html?id=" + messages[i].id);
			postBlockImage.appendChild(postLinkSinglPost);
			let postImage = document.createElement("img");  
			postImage.setAttribute("src", '/images/' + messages[i].attachment);
			postImage.setAttribute("alt", "image du post"); 
			postImage.setAttribute("class", "post-image");  
			postLinkSinglPost.appendChild(postImage);
		}

		// titre
		if (messages[i].title) {
    		let posTitle = document.createElement("h2");
			let postLinkTitle = document.createElement("a");
			postLinkTitle.setAttribute("class", "focus a__title");
			postLinkTitle.setAttribute("href", "single-post.html?id=" + messages[i].id);
			postBlock.appendChild(posTitle);
			posTitle.appendChild(postLinkTitle);
			postLinkTitle.textContent = messages[i].title;
		}
		
		// message
		if (messages[i].content) {
			let postBody = document.createElement("p");
			postBody.setAttribute("class", "body-post");
			postBlock.appendChild(postBody);
			postBody.innerHTML = messages[i].content; 
		}

		// post footer

		let postAction = document.createElement("div");  
		postAction.setAttribute("class", "action");
		postBlock.appendChild(postAction);

		// effacer
        if (messages[i].modifiable) {

			const postDeleteBtn = document.createElement('i');
        	postDeleteBtn.className = 'fas fa-trash-alt'
        	postAction.appendChild(postDeleteBtn)

            postDeleteBtn.addEventListener('click', () => {
                axios.delete(`http://localhost:3008/api/messages/delete/${messages[i].id}`, headers)
                    .then((resp) => {
						postBlock.remove();
                    })
            })
        }
		
		// modifier
        if (messages[i].modifiable) {
			const PostModifiableLink = document.createElement('a')
			PostModifiableLink.className = 'a__title'
            PostModifiableLink.href = `singl-post.html?id=${messages[i].id}`
            postAction.appendChild(PostModifiableLink)
            const postModifyBtn = document.createElement('i')
			postModifyBtn.className = 'fas fa-pencil-alt'
            PostModifiableLink.appendChild(postModifyBtn);
        }

		// like
        const postLike = document.createElement('i');
        postLike.className = 'far fa-heart';
        postAction.appendChild(postLike);

        // nombres likes
		const postNbLikes = document.createElement('span');
        postNbLikes.id = 'love';
        postLike.appendChild(postNbLikes);
        postNbLikes.innerHTML = nbLikes;

        let like = messages[i].liked

        let likeOrDislike = messages[i].liked ? 'dislike' : 'like'

		const btnLikes = document.querySelector('.fa-heart')
        btnLikes.addEventListener('click', () => {
            axios.post(`http://localhost:3008/api/messages/${messages[i].id}/action/${likeOrDislike}`, {}, headers).then((resp) => {
				nbLikes = resp.data.Likes.length
				postNbLikes.innerHTML = nbLikes
            })
        })

	}

};
getMessages()
