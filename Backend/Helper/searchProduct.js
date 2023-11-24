module.exports = (query) => {
    let Search = {
        title: "",
        regex: ""
      }
    
      if(query.title) {
        Search.title = query.title;
    
        const regex = new RegExp(`.*${Search.title}.*`,  "i");
        
        Search.regex = regex;
      }
    
      return Search;
}



  