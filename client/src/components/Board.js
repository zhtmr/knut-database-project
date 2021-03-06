import React, { Fragment,Component } from 'react';
import BoardItem from './BoardItem';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import { loginUser } from '../actions/authentication';
import { updateCurrPage, updateStartEndPage} from "../actions/pagenation"
import { connect } from 'react-redux';
import '../css/Board.css';



class Board extends Component {
    id = 1
    state = {
        boards: [
            {
                _id: 0,
                board_title: '',
                board_contents: '',
                board_author : '',
                board_date: formatDate(new Date())
            }
        ],
        currentPage: 1,
        boardsPerPage: 10
    
    }
    handleClick = (event) =>{
        this.setState({
          currentPage: Number(event.target.id)
        });
      }


    async_list(){
        this.lookupInterval = setInterval(() => axios.get('user/board_list')
        .then(res=> {
            this.setState({
                boards : res.data
            });
        })
        ,1000);
    }
    componentDidMount = () => {        
        this.async_list();
    }
    
    componentWillUnmount(){
         clearInterval(this.lookupInterval)
    }

    handleClickChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // 새로고침
    handlePrint = (e) => {
        e.preventDefault();
        axios.get('user/board_list')
        .then(res=> {
            this.setState({
                boards : res.data
            });
        });
    }
    // 글쓰기 컴포넌트 변경
    handleChange = (e) => {
        this.props.history.push('/BoardForm');
    }
    

    render() {
        // <Route render={props => <BoardForm onCreate={this.handleCreate}/>}></Route>
        const {boards} = this.state; 
        const {auth} = this.props;


        // ##### 페이지네이션 사용하기
        const { currentPage, boardsPerPage } = this.state;
         // Logic for displaying current todos
        const indexOfLastBoards = currentPage * boardsPerPage;
        const indexOfFirstBoards = indexOfLastBoards - boardsPerPage;
        const currentBoards = boards.slice(indexOfFirstBoards, indexOfLastBoards);

        const {id} = this;
        let renderBoards = null;
        if(id >= 0){
        
        renderBoards = <tbody>{currentBoards.map((board, i) => {
            return(
            <BoardItem
            board_id={board.board_id}
            board_title={board.board_title} 
            board_contents={board.board_contents} 
            board_author ={board.board_author} 
            board_date ={formatDate(board.board_date)}
            onRemove={this.handleRemove}
            onRead={this.handleRead}
            key={i}/>
            );
        }).sort()}
        </tbody>};
           // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(boards.length / boardsPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                
                <li className="page-item" style={{float:'left'}}>
                    <p className="page-link" key={number} id={number} onClick={this.handleClick}>{number}</p>
                </li>
            
            );
          });
       
        if(auth.isAuthenticated) {
            return (
                <Fragment>
                <div className="listStyle">
                    <div className="title">
                        <h3>자유게시판</h3>
                        <span>한국교통대학교 의왕캠퍼스 학생들의 자유로운 이야기 공간입니다.</span>
                    </div>
                    
                <link to='board'></link>
                    <Table responsive >
                        <thead>
                        <tr>
                            <th id="th-style">no.</th>
                            <th id="th-style">제목</th>
                            <th id="th-style">이름</th>
                            <th id="th-style">날짜</th>

                        </tr>
                        </thead>
            
                    {renderBoards}
                </Table>

                <div className="btnClass">
               <ul className="pagination text-center" style={{display:'table',marginRight:'auto',marginLeft:'auto'}} >
                    {renderPageNumbers}
                </ul>
                <button onClick={this.handleChange} className="btn btn-primary" id="btnSubmit" style={{float:"right"}}>글쓰기</button>
                </div>
                </div>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                <div className="listStyle">
                    <div className="title">
                        <h3>자유게시판</h3>
                        <span>한국교통대학교 의왕캠퍼스 학생들의 자유로운 이야기 공간입니다.</span>
                    </div>
                    
                <link to='board'></link>
                    <Table responsive >
                        <thead>
                        <tr>
                            <th id="th-style">no.</th>
                            <th id="th-style">제목</th>
                            <th id="th-style">이름</th>
                            <th id="th-style">날짜</th>

                        </tr>
                        </thead>
            
                    {renderBoards}
                </Table>

                <div className="btnClass">

               <ul className="pagination text-center" style={{display:'table',marginRight:'auto',marginLeft:'auto'}} >
                    {renderPageNumbers}
                </ul>

                </div>
                </div>
                </Fragment>
            );
        }
    }
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    pagenation : state.pagenation,
})

export default connect(mapStateToProps, { loginUser,updateCurrPage, updateStartEndPage })(Board)
