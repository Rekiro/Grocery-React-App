import { Link } from "react-router-dom";

const ProductCard = (props) => {
    const { productName, image, unit, price, mrp , _id} = props.data;
    
    return (
        <div className="col-sm-3">
            <div className="card">
                <img src={'http://rjtmobile.com/grocery/images/' + image} alt="" className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{productName}</h5>

                    <p className="card-text">{unit}</p>
                    <h2>
                        <span>&#8377;</span>
                        {price}
                        <span style={{
                            fontSize: '22px',
                            color: '#888',
                            marginLeft: '10px'
                        }}>
                            <del><span>&#8377;</span>{mrp}</del>
                        </span>
                    </h2>
                    <Link to={"/product/details/" +_id} className="btn btn-primary btn-block">Show Detail</Link>
                </div>
            </div>
        </div>
    )
}
export default ProductCard;