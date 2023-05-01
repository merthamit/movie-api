import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleMoviePage from './pages/SingleMoviePage';


class PageRouter extends Component {
    render() {
        return (
            <Routes>
                <Route exact='true' path='/' element={<Home />}/>
                <Route exact='true' path='/movie/:film' element={<SingleMoviePage />}/>
            </Routes>
        )
    }
}


export default PageRouter