import { useEffect, useState } from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {API_GET,API_POST} from '../../api';
import { useNavigate } from 'react-router-dom';

export default function ProductForm(){

    let params = useParams();
    let navigate = useNavigate();

    const [product_id,setProductid] =useState(0);
    const [product_name,setProductname] = useState("");
    const [product_price,setProductprice] = useState(0.0);
    const [product_size,setProductsize] = useState("");
    const [product_weight,setProductweight] =useState(0.0);
    const [product_img,setProductimg] =useState("");
    const [product_type_id,setProducttypeid] =useState(0);
    const [validated,setValidate] =useState(false);

    useEffect(()=>{
        
        async function fetchData(product_id){
            let json = await API_GET("product/"+product_id);
            var data = json.data[0];
            setProductid(data.product_id);
            setProductname(data.product_name);
            setProductprice(data.product_price);
            setProductsize(data.product_size);
            setProductweight(data.product_weight);
            setProductimg(data.product_img);
            setProducttypeid(data.product_type_id);
        }
        if(params.product_id!="add"){
            fetchData([params.product_id]);
        }
    },[params.product_id]);


    const onsave = async (event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        if(form.checkValidity()===false){
            event.stopPropagation();
        }else{
            if(params.product_id === "add"){
                doCreateProduct();
            }else{
                doUpdateProduct();
            }
        }
    }

    const doCreateProduct = async()=>{     
        console.log(product_price);
        const json = await API_POST("product/add",{
            product_name : product_name,
            product_price : product_price,
            product_size :product_size,
            product_weight :product_weight,
            product_img :product_img,
            product_type_id:product_type_id
        });
        if(json.result){
            console.log("เพิ่มสำเร็จ");
            navigate("/owner/product",{replace:true});
        }
    }

    const doUpdateProduct =async()=>{
       
        const json = await API_POST("product/update",{
            product_id : product_id,
            product_name : product_name,
            product_price : product_price,
            product_size :product_size,
            product_weight :product_weight,
            product_img :product_img,
            product_type_id:product_type_id
        });
        if(json.result){
            console.log("อัปเดทสำเร็จ")
            navigate("/owner/product",{replace:true});
        }
    }

    return(
        <>
            <Form className='container' noValidate validated={validated} onSubmit={onsave}>
                <Form.Group controlId='validateProductName'>
                    <Form.Label>ชื่อสินค้า</Form.Label>
                    <Form.Control 
                        type='text'
                        value={product_name}
                        placeholder="ชื่อสินค้า"
                        required
                        onChange={(e)=>setProductname(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" >
                            กรุณากรอกชื่อสินค้า
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='validateProductPrice'>
                    <Form.Label>ราคาสินค้า</Form.Label>
                    <Form.Control 
                        type='text'
                        value={product_price}
                        placeholder="ราคาสินค้า"
                        required
                        onChange={(e)=>setProductprice(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" >
                            กรุณากรอกราคาสินค้า
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='validateProductsize'>
                    <Form.Label>ขนาดสินค้า</Form.Label>
                    <Form.Control 
                        type='text'
                        value={product_size}
                        placeholder="ขนาดสินค้าสินค้า"
                        required
                        onChange={(e)=>setProductsize(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" >
                            กรุณากรอกขนาดสินค้า
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='validateProductwight'>
                    <Form.Label>น้ำหนัก</Form.Label>
                    <Form.Control 
                        type='text'
                        value={product_weight}
                        placeholder="น้ำหนัก"
                        required
                        onChange={(e)=>setProductweight(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" >
                            กรุณากรอกน้ำหนักสินค้า
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='validateProductimg'>
                    <Form.Label>รูปภาพสินค้า</Form.Label>
                    <Form.Control 
                        type='text'
                        value={product_img}
                        placeholder="รูปภาพ"
                        required
                        onChange={(e)=>setProductimg(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" >
                            กรุณากรอกรูปภาพ
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='validateProducttypeid'>
                    <Form.Label>ประเภทสินค้า</Form.Label>
                    <Form.Control 
                        type='text'
                        value={product_type_id}
                        placeholder="ประเภทสินค้า"
                        required
                        onChange={(e)=>setProducttypeid(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" >
                            กรุณากรอกประเภทสินค้า
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="success" as="input" type="submit"  value="บันทึก" />
            </Form>
        </>
    )
}