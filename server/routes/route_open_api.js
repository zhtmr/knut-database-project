const express = require('express');
const router = express.Router();
const axios = require("axios");

async function data_call(){
    await axios.get("https://api.github.com/")
    .then(res => {
        //  console.log(res.data);
        // console.log(res);
        // var knut_parser = new DOMParser(),
        // xmlDoc = knut_parser.parseFromString(res.data, 'text/xml');
        // console.log(xmlDoc);
        // knut_msgBody_data = xmlDoc.getElementsByTagName('busArrivalList').length;
        // console.log(knut_msgBody_data);
        
        // for(let i=0; i<knut_msgBody_data; i++){
        //     let sub2 = new Array();
        //     for(let j=0; j<bus_attribute_length; j++){
        //         sub2.push(xmlDoc.getElementsByTagName('busArrivalList')[i]
        //         .childNodes[j].childNodes[0])
        //     } 
        //     parsing_data2.push(sub2);

        // }
        // for(let i=0; i<parsing_data2.length; i++){
        //     for(let j=0; j<parsing_data2[i].length; j++){
        //         console.log("parsing_data => " ,parsing_data2[i][j]);
                
        //     }
        //     console.log("check2");
        // }

        // git_data = res.data;
        // console.log(git_data)
        // console.log(res)
        // this.git_data = res.data;
        return res.data;

    }).catch( err => {
        console.log(err);
    });
    
 
}

router.get('/open_data', function (req, res) {
    const data = data_call();
    console.log("data => ",data);
    console.log("=================================");
    // #1 static Variable
        const serviceKey ='a5mSPyGouPCZhF2pi%2F%2Fciz%2FAokup9JJaIsQYgLHPEYE6Wct2ANSuspDzQTxakihNLNyfD%2FKxDxDunVk2lnY5jQ%3D%3D'  // Service Key
        const bus_url = 'http://openapi.gbis.go.kr/ws/rest/busarrivalservice/station?';      //bus Url
        const knut_stationId = '226000103'          // 한국교통대학교
        const bus_attribute_length =14;
        // serviceKey =encodeURIComponent(serviceKey); //인코딩한 값 넣어주기
        // # 2위치 - 교통대
        let knut_msgBody_data = null;

        const parsing_data2 = new Array();
        // axios(`${bus_url}serviceKey=${serviceKey}&stationId=${knut_stationId}`)
       console.log("잘해보자 -> ", data);
       res.send(data)
});
module.exports = router; 