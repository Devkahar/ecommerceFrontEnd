export default (query)=>{
    if(query){
        const querystring = query.split("?")[1];
        if(querystring.length>0){
            const params = querystring.split("&");
            const paramsObj ={};

            params.forEach(param =>{
                const keyValue = param.split("=");
                paramsObj[keyValue[0]] = keyValue[1];
            });
            return paramsObj;
        }
    }
    return {};
}