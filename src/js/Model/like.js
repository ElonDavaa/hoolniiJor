export default class Likes {
    constructor(){
        this.readDataFromLocalStorage();

       if(!this.like) this.like =[];   
    }

    addLike(id, title, author, img) {
        const like = {id, title, author, img};
        this.like.push(like);
        // storage руу хадгална
        this.saveDataToLocalStorage();
        return like;
    }

    deleteLike(id) {
        // id гэдэг ID -тэй like индексийг массиваас хайж олно
        const index = this.like.findIndex(el => el.id === id);
        // уг индекс дээрх элементийг массиваас устгана
        this.like.splice(index, 1);
           // storage -с устгана
           this.saveDataToLocalStorage();
    }
    // likelсан id г хайж олох функц
    isLiked(id) {
        // if( this.likes.findIndex(el => el.id === id) === -1) return false;
        // else return true;

        return this.like.findIndex(el => el.id === id) !== -1;
    }
    // хичнээн likelсан id байгааг олох функц
    getNumberOfLikes() {
        return this.like.length;
    }
    saveDataToLocalStorage() {
        localStorage.setItem("likes", JSON.stringify(this.like));
    }
    readDataFromLocalStorage() {
      this.like = JSON.parse( localStorage.getItem("likes"));
    }
};