import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import LoadingBox from '../components/LoadingBox';

export default function ProductScreen(props) {
  const [date, setDate] = useState([]);
  const [nav, setNav] = useState([]);
  const [fundName, setFundName] = useState([]);
  const [loading, setLoading] = useState(true);
  const productId = props.match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://api.mfapi.in/mf/${productId}`);
      let datesData = [];
      let navData = [];
      for (let i = 0; i < 50; i++) {
        datesData.push(res.data.data[i]["date"]);
        navData.push(res.data.data[i]["nav"]);
      }
      setDate(datesData);
      setNav(navData);
      setFundName(res.data.meta);
      setLoading(false);
      // console.log(datesData);
      // console.log(navData);
      // console.log(Object.keys(res.data.data));
    }
    fetchData();
  }, [productId]);

  return (
    <div>
      {loading ? (<LoadingBox></LoadingBox>) :
        <>
          <div>
            <Link to="/">Back to home</Link>
            <div>
              <Line
                data={{
                  labels: date,
                  datasets: [
                    {
                      label: 'Nav(in INR)',
                      backgroundColor: 'rgba(13, 206, 35, 1)',
                      borderColor: 'rgba(0,0,0,1)',
                      borderWidth: 2,
                      data: nav
                    }
                  ]
                }}
                options={{
                  title: {
                    display: true,
                    text: 'Average Rainfall per month',
                    fontSize: 20
                  },
                  legend: {
                    display: true,
                    position: 'right'
                  }
                }}
              />

            </div>

          </div>
          <hr />
          <h4> {fundName["scheme_name"]} Details </h4>
          <div className="fundDetails">

            <div className="lhsDetails">
              <ul className="collection">
                <li className="collection-item"> <div>Risk</div> <div>Moderately High</div> </li>
                <li className="collection-item"> <div>Min SIP Amount</div> <div>₹500</div> </li>
              </ul>
            </div>
            <div className="rhsDetails">
              <ul className="collection">
                <li className="collection-item"> <div>NAV</div> <div>{nav[0]} ({date[0]})</div> </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="prosCons">
            <div className="lhsDetails">
              <h4>Pros</h4>
              <ol className="collection">
                <li className="collection-item"><span>Lower expense ratio</span></li>
                <li className="collection-item"><span>1Y Returns are higher than the category average returns</span></li>
                <li className="collection-item"><span>3Y Returns are higher than the category average returns</span></li>
                <li className="collection-item"><span>5Y Returns are higher than the category average returns</span></li>
              </ol>
            </div>
            <hr />
            <div className="lhsDetails">
              <h4>Cons</h4>
              <ol className="collection">
                <li className="collection-item"> <span>Risk-adjusted returns are lower compared to the category</span> </li>
              </ol>
            </div>
          </div>
          <hr />
          <div className="aboutPolicy">
            <h4>{fundName["scheme_name"]}</h4>

            <p> {fundName["scheme_name"]} is a {fundName["scheme_type"]} launched by {fundName["fund_house"]}. The Latest NAV as of {date[0]} is {nav[0]}. </p>

            <p> The {fundName["scheme_name"]} is rated Moderately High risk. Minimum SIP Investment is set to 500. Minimum Lumpsum Investment is 5000. For units in excess of 10% of the investment,1% will be charged for redemption within 12 months </p>

            {/* <p> As the name suggests, Axis blue-chip fund-growth invests in blue-chip stocks, or stocks of predominantly large companies, which are financially sound, and well established. The stocks are less volatile than mid-cap and small-cap stocks, traded frequently, and have adequate liquidity as a result. The stocks that the Axis Blue Chip fund intends to invest in have the potential to perform long-term due to their proven track record. </p> */}

            <h5> Investment Objective </h5>

            <p> To achieve long term capital appreciation by investing in a diversified portfolio predominantly consisting of equity and equity related securities including derivatives. Howerver, there can be no assurance that the investment objective of the scheme will be achieved. </p>

            <p> {fundName["scheme_name"]} ( Growth), being an equity fund, is suitable for investors aiming for long term capital appreciation,ideally with an investment horizon of more than five years. There is no lock-in period in this fund, however. </p>
            <hr />
            <h5> Tax Implications </h5>

            <p> Returns are taxed at 15%, if you redeem before one year. After 1 year, you are required to pay LTCG tax of 10% on returns of Rs 1 lakh+ in a financial year. </p>

            <p> If the investment in the {fundName["scheme_name"]} plan is redeemed before one year, it will be taxed as per STCG, which is currently at 15%. There will be no tax liability as long as the fund units are held. There is no surcharge included in this rate. </p>

          </div>
        </>
      }
    </div>
  );
}
