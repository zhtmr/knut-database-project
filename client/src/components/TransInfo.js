import React, { Component } from 'react';
import axios from 'axios';
import { createLogger } from 'redux-logger';
import TransItem from './TransItem'
import {Table} from 'react-bootstrap'
import { callbackify } from 'util';
import Error from './Error';
class TransInfo extends Component {


    state ={
        data: [],
    }

    componentDidMount(){
        const url = 'http://swopenAPI.seoul.go.kr/api/subway/6a7644634e6b67683739434e557a61/xml/realtimeStationArrival'
        let location = "의왕";
        const subway_id='1';
        const stain_id = '52';
        const attribute_length = 22;
        let row_length = null;
        location = encodeURIComponent(location); //인코딩한 값 넣어주기

        // ,{responseType : 'xml'}
        axios.get(`${url}/${subway_id}/${stain_id}/${location}`)
        .then(res =>{
            
            var parser = new DOMParser(),
            xmlDoc = parser.parseFromString(res.data,'text/xml');
            row_length = xmlDoc.getElementsByTagName('row').length;
            console.log(row_length)
            const parsing_data = new Array();
            for(var i=0; i< row_length; i++){
                var sub = new Array();
                for(var j=0; j<attribute_length; j++){
                     sub.push(xmlDoc.getElementsByTagName('row')[i]
                    .childNodes[j].childNodes[0])
                }
                parsing_data.push(sub);
            console.log("여기잠시대기")
            }
            for(let i=0; i< parsing_data.length; i++){
                for(let j=0; j <parsing_data[i].length; j++){            
                    console.log(parsing_data[i][j]);
                }
                console.log("어떻게찍히는지")
            }

            this.setState({
                data : parsing_data
            })
            console.log("test =>",this.state.data);

            //todo firstChild -> 해당 태그를 가져온다.
            //todo
            })
            .catch( err =>{
                
                
                console.log(err);
        
            })
    }    


    render() {
        const {data} = this.state;
        let return_page = null;
        const list_page =       
            data.map((data, i) => {
          console.log("key=>",data[0]);
          console.log("key=>",data[1]);
          console.log("key=>",data[2]);
          console.log("key=>",data[3]);
          return (
              <TransItem 
              board_id={data[1].data}
              board_title={data[2].data} 
              board_contents={data[3].data} 
              board_user_name ={data[4].data} 
              board_date ={data[5].data}
              key={i}/>);
          })
          
          const error_page =<Error></Error>
          if(data.length !== 0){
            return_page = list_page;
          }else{
            return_page = error_page;
          }
          console.log("data.lengh => ",data.length)
          
      
        
        const ErrorPage = <Error></Error>
        return (
            <div>
            <link to='board'></link>
            <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>제목</th>
                <th>내용</th>
                <th>이름</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
            
                
            {return_page}
              
         
            </tbody>
          </Table>
            
            </div>
        );
    }
}

export default TransInfo;