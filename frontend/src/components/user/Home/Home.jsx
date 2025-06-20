import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Category from './Category';
import CarouselDefault from './Slider';
import LatestOffers from './LatestOffers';
import Navbar from '../Navbar';
import NearbyStores from './NearbyStores';


const Home = () => (
  <div  style={{ maxWidth: '100%', overflowX: 'hidden' }}>
    <div className='mb-20'>
    <Header />
    <SearchBar />
    <Category />
    <CarouselDefault/>
    <LatestOffers/>
    <NearbyStores/>
    </div>
    <Navbar/>
  </div>
);

export default Home;
