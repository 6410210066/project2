import "./owner.css";
import Ownernav from "./Ownernav";
export default function Product(){
    let page=6;
    return (
        <>
            <div  className="container-fluid" >
                <div className="row">
                    <div className="col-lg-2 nav" style={{padding:"0"}}>
                         <Ownernav page={page} />
                    </div>
                    <div className="col-lg-10 content" style={{padding:"0"}}>
                        <h1 className="header">จัดการรายการสินค้า</h1>
                    </div>
                </div>
            </div>
        </>
    )
}