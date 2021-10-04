import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingBox from './LoadingBox';

export default function Hdfc() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://api.mfapi.in/mf/100121');
      setPosts(res.data.meta);
      setLoading(false);
    }
    fetchData();
  }, []);

  // const { product } = props;
  return (
    <>
      {loading ? (<LoadingBox></LoadingBox>) :
        <div key={posts["scheme_code"]} className="card">
          <Link to={`/product/${posts["scheme_code"]}`}>

            <img className="medium"
              src="https://www.teahub.io/photos/full/277-2778302_hdfcbanklogo-hdfc-bank.jpg"
              alt="hdfc_image" />
          </Link>
          <div className="card-body">
            <Link to={`/product/${posts["scheme_code"]}`}>
              <h1>Scheme Name: {posts["scheme_name"].substring(0, 28)}</h1>
            </Link>
            <h4>Fund House:- {posts["fund_house"]}</h4>
            <h4>Scheme Type:- {posts["scheme_type"]}</h4>
            <h4>Scheme Category:- {posts["scheme_category"]}</h4>
            <Link to={`/product/${posts["scheme_code"]}`}>
              <button className="primary btn">Know More</button>
            </Link>
          </div>
        </div>
      }
    </>
  )
}