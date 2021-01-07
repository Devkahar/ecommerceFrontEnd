import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getProductBySlug } from "../../../actions/actions";
import Card from '../../../components/UI/Card/Card';

import { publicUrl } from "../../../urlConfig";
const ProductStore = (props) => {
    const product = useSelector((state) => state.product);
    const priceRange = [5,10,15,20,25]
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(props);
        dispatch(getProductBySlug(props.match.params.slug));
    }, []);
    return (
        <>
            {Object.keys(product.productByPrice).map((key, index) => {
        return (
          <Card
            headerLeft={`${props.match.params.slug} Mobile Under ${priceRange[index]}k`}
            headerRight={<button>View All</button>}
            style={{
              width: 'calc(100%-20px)',
              margin: '40px'
            }}
          >
            
            <div style={{display:"flex"}}>
              {product.productByPrice[key].map((product) => (
                <Link to={`/${product.slug}/${product._id}/p`} style={{display: "block",textDecoration:"none"}} className="productContainer">
                  <div className="productImgContainer">
                    <img
                      src={publicUrl+'/'+product.productPictures[0].img}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div>{product.name}</div>
                    <div>
                      <span>4.3</span>
                      <span>(3353)</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
        </>
    )
}

export default ProductStore
