const request = require ('request');

const getCountries =(req, res)=>{
    request.get('https://restcountries.eu/rest/v2/all', (err, response, body)=>{
     if(err){
         return res.status(400).json(error)
     }
     const countries=JSON.parse(body)
     const countryNames=[]
     countries.map(country=>{
         countyNames.push(country.name);
         return res.status(200).json(countryNames)
     })

 })

}

 module.exports= getCountries ;