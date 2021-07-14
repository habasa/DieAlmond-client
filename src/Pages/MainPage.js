import React, { useEffect, useState } from 'react';
import Today from '../components/Aside/Today';
import BucketLists from '../components/Aside/BucketLists';
import CountDown from '../components/CountDownTimer/CountDown';
import ProgressBar from '../components/ProgressBar'
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import Almond from '../components/Almond/Almond'
import WiseSaying from '../components/Almond/WiseSaying'
import { connect } from 'react-redux';
import axios from 'axios';
import {actionCreators} from '../store';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px;
    padding: 10px;
    
    // border: 1px solid black;

    @media only screen and (max-width: 480px) {
        flex-direction: column;
`;

const Aside1 = styled.div`
    font-size: 20px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Nickname = styled.div`
        margin: 0 0 50px 0;
        font-size: 3rem;
        color: #1565c0;
        line-height: 3.2rem;
`;

const Aside2 = styled.div`
    font-size: 20px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
`;

const MainPage = ({ userInfo, addInfo }) => {

    const history = useHistory();

    // let userSrc = JSON.parse(localStorage.getItem("state"))

    // console.log(userSrc)

    // if (typeof(userInfo.nickname) !== 'string') {
    //     addInfo(userSrc)
    // }
    
    useEffect(() => {

        if(localStorage.getItem("isLogin") === 'login'){
            axios.get('http://localhost:80/main', {
            headers: {
                'sns':'google',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.google}`
            },
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data.userinfo)
                if(typeof(res.data.userinfo.nickname) === 'string') {
                    addInfo(res.data.userinfo);
                    console.log(res.data.userinfo, userInfo)
                    localStorage.setItem("info", JSON.stringify(res.data.userinfo))
                } else {
                    history.push('/mymy');
                }
            })
            .catch(e => e);
        } 
        
        if (localStorage.getItem("isLogin") === 'login' && localStorage.getItem("info")) {
            addInfo(JSON.parse(localStorage.getItem("info")))
        } else {
            addInfo(JSON.parse(localStorage.getItem("info")))
        }
    }, []) 
    

    // console.log(userInfo)
    

    const Gravestone = styled.img`
        width: 40px;
        position: fixed;
        top: 53.25%;
        right: 0%;
    `
    
    // 삼항 연산자 추가
    return (
        <div>
            <NaviBar />

            <Title>

                <Aside1>
                    <Today />
                </Aside1>

                <Header> 
                    <Nickname>'{userInfo.nickname}'님의 남은 인생은.. </Nickname>
                    <CountDown userInfo={userInfo}></CountDown>
                </Header>

                <Aside2>
                    My Bucket List..
                <BucketLists userInfo={userInfo}/>
                </Aside2>

            </Title>

            <Section>
                <WiseSaying />
            <Almond userInfo={userInfo}/>
            <ProgressBar userInfo={userInfo}/>
            </Section>

            <Footer />
        </div>
    );
};

function mapStateToProps(state) {
    return {userInfo: state}
}

function mapDispatchToProps(dispatch) {
    return {addInfo: (info) => dispatch(actionCreators.addInfo(info))}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);